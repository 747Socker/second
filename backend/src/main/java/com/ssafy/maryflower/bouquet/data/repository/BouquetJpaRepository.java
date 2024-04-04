package com.ssafy.maryflower.bouquet.data.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetFlowerResponseDto;
import com.ssafy.maryflower.bouquet.data.dto.transfer.BouquetSearchCondition;
import com.ssafy.maryflower.bouquet.data.entity.Bouquet;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.ssafy.maryflower.bouquet.data.entity.QBouquet.bouquet;

@Repository
public class BouquetJpaRepository {

  private final EntityManager em;
  private final JPAQueryFactory queryFactory;

  public BouquetJpaRepository(EntityManager em) {
    this.em = em;
    this.queryFactory = new JPAQueryFactory(em);
  }

  public void save(Bouquet bouqet) {
    em.persist(bouqet);
  }

  public Optional<Bouquet> findById(Long id) {
    Bouquet findBouquet = em.find(Bouquet.class, id);
    return Optional.ofNullable(findBouquet);
  }

  public List<Bouquet> findAll() {
    return queryFactory
        .selectFrom(bouquet)
        .fetch();
  }

  public List<Bouquet> findByMessage(String message) {
    return queryFactory
        .selectFrom(bouquet)
        .where(bouquet.message.eq(message))
        .fetch();
  }

//  public List<BouquetFlowerResponseDto> searchByBuilder(BouquetSearchCondition condition) {
//    return queryFactory
//        .select(new QBouquetFlowerResponseDto(
//            bouquet.
//        ))
//        .from(bouquet)
//        .leftJoin()
//
//  }

}
