package com.ssafy.maryflower.bouquet.data.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.maryflower.bouquet.data.dto.request.BouquetListRequestDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetFlowerDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetFlowerResponseDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetSliceResponse;
import com.ssafy.maryflower.bouquet.data.dto.transfer.BouquetSearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.ssafy.maryflower.bouquet.data.entity.QBouquet.bouquet;
import static com.ssafy.maryflower.bouquet.data.entity.QFlower.flower;
import static com.ssafy.maryflower.bouquet.data.entity.QFlowerBouquet.flowerBouquet;
import static com.ssafy.maryflower.bouquet.data.entity.QMemberBouquet.memberBouquet;

@RequiredArgsConstructor
@Repository
@Slf4j
public class BouquetRepositoryCustomImpl implements BouquetRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private static final long MAX_FLOWER_COUNT = 3L;

    @Override
    public BouquetSliceResponse searchRelevantBouquet(BouquetListRequestDto req, Pageable pageable) {

        JPAQuery<BouquetFlowerDto> query = jpaQueryFactory
                .select(Projections.constructor(
                        BouquetFlowerDto.class,
                        bouquet.member.memberId,
                        bouquet.bouquetId,
                        bouquet.whom,
                        bouquet.situation,
                        bouquet.message,
                        bouquet.imageUrl,
                        bouquet.createDateTime,
                        flowerBouquet.flower.flowerId))
                .from(bouquet)
                .leftJoin(bouquet.flowerBouquets, flowerBouquet)
                .leftJoin(bouquet.memberBouquets, memberBouquet).distinct()
                .where(eqKeyword(req));

        if (req.getOrderBy() == null) query.orderBy(bouquet.createDateTime.desc());
        else {
            switch (req.getOrderBy()) {
                case LIKE:
                    query.groupBy(bouquet.bouquetId, flowerBouquet.flower.flowerId) // flowerId도 PK임으로 groupBy 조건에 넣어줘야함
                            .orderBy(memberBouquet.bouquet.count().desc(), bouquet.createDateTime.desc());
                    break;
                case RECENT:
                    query.orderBy(bouquet.createDateTime.desc());
                    break;
                default:
                    query.orderBy(bouquet.createDateTime.desc());
            }
        }

        int pageSize = pageable.getPageSize();
        List<BouquetFlowerDto> content =
                query.offset(req.getLastIndex())
                        .limit( pageSize * MAX_FLOWER_COUNT + 1)
                        .fetch();

        return makeResponse(content, req, pageable);
    }

    private BouquetSliceResponse makeResponse(List<BouquetFlowerDto> content, BouquetListRequestDto req, Pageable pageable) {
        List<BouquetSearchDto> list = new ArrayList<>();

        int count = 0;
        for (BouquetFlowerDto dto : content) {
            if (!makeBouquet(dto, pageable.getPageSize(), list)) break;
            count++;
        }

        boolean hasNext = content.size() > count;
        int lastindex = req.getLastIndex() + count;

        log.info("count : {}", count);
        log.info("content.size() : {}", content.size());
        log.info("hasNext : {}", hasNext);

        return new BouquetSliceResponse(new SliceImpl<>(list, pageable, hasNext), lastindex);
    }


    // Response에 담을 BouquetDto를 만든다
    public boolean makeBouquet(BouquetFlowerDto dto, int pageSize, List<BouquetSearchDto> list) {
        // 새로운 bouquet Id면 페이지 사이즈보다 크지는 않은지 확인하고
        // 이미 존재하는 bouquet Id면 flowerIds list에 꽃 id만 추가만 해준다
        BouquetSearchDto innerBouquet = null;
        for (BouquetSearchDto bouquet : list) {
            if (Objects.equals(bouquet.getBouquetId(), dto.getBouquetId())) {
                innerBouquet = bouquet;
                break;
            }
        }

        if (innerBouquet == null) {
            if (list.size() >= pageSize) return false;
            list.add(new BouquetSearchDto(dto));
        } else {
            innerBouquet.addFlowerId(dto);
        }
        return true;

    }

    private BooleanExpression eqKeyword(BouquetListRequestDto req) {
        if (req.getType() == null) return null;
        return switch (req.getType()) {
            case NAME -> bouquet.bouquetId.in(JPAExpressions
                    .select(bouquet.bouquetId).distinct()
                    .from(bouquet)
                    .leftJoin(bouquet.flowerBouquets, flowerBouquet)
                    .where(flowerBouquet.flower.flowerId.in(
                            JPAExpressions
                                    .select(flower.flowerId)
                                    .from(flower)
                                    .where(flower.koreanName.contains(req.getSearchKeyword())))));
            case MEANING -> bouquet.bouquetId.in(JPAExpressions
                    .select(bouquet.bouquetId).distinct()
                    .from(bouquet)
                    .leftJoin(bouquet.flowerBouquets, flowerBouquet)
                    .where(flowerBouquet.flower.flowerId.in(
                            JPAExpressions
                                    .select(flower.flowerId)
                                    .from(flower)
                                    .where(flower.meaning.contains(req.getSearchKeyword())))));
            case TEXT -> bouquet.whom.contains(req.getSearchKeyword())
                    .or(bouquet.situation.contains(req.getSearchKeyword()))
                    .or(bouquet.message.contains(req.getSearchKeyword()));
        };
    }



    @Override
    public Slice<BouquetFlowerResponseDto> searchRelevantBouquetLegacy(BouquetListRequestDto req, Pageable pageable) {
        JPAQuery<BouquetFlowerResponseDto> query = jpaQueryFactory
                .select(Projections.constructor(
                        BouquetFlowerResponseDto.class,
                        bouquet.member.memberId,
                        bouquet.bouquetId,
                        bouquet.imageUrl,
                        bouquet.createDateTime,
                        bouquet))
                .from(bouquet)
                .leftJoin(bouquet.flowerBouquets, flowerBouquet)
                .leftJoin(flowerBouquet.flower, flower)
                .leftJoin(memberBouquet)
                .on(bouquet.bouquetId.eq(memberBouquet.bouquet.bouquetId)).distinct()
                .where(
                        eqKeywordLegacy(req)
                );


        switch (req.getOrderBy()) {
            case LIKE:
                query.groupBy(bouquet.bouquetId)
                        .orderBy(memberBouquet.bouquet.count().desc(), bouquet.createDateTime.desc());
                break;
            case RECENT:
                query.orderBy(bouquet.createDateTime.desc());
                break;
            default:
                query.orderBy(bouquet.createDateTime.desc());
        }

        int pageSize = pageable.getPageSize();
        List<BouquetFlowerResponseDto> content =
                query.offset(pageable.getOffset())
                        .limit(pageSize + 1)
                        .fetch();

        boolean hasNext = false;
        if (content.size() > pageSize) {
            content.remove(pageSize);
            hasNext = true;
        }

        return new SliceImpl<>(content, pageable, hasNext);
    }

    private BooleanExpression eqKeywordLegacy(BouquetListRequestDto req) {
        if (req.getType() == null) return null;
        return switch (req.getType()) {
            case NAME -> flower.koreanName.contains(req.getSearchKeyword());
            case MEANING -> flower.meaning.contains(req.getSearchKeyword());
            case TEXT -> bouquet.whom.contains(req.getSearchKeyword())
                    .or(bouquet.situation.contains(req.getSearchKeyword()))
                    .or(bouquet.message.contains(req.getSearchKeyword()));
        };
    }

}
