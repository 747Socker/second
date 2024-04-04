package com.ssafy.maryflower.bouquet.data.dto.response;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.maryflower.bouquet.data.dto.response.QBouquetFlowerResponseDto is a Querydsl Projection type for BouquetFlowerResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBouquetFlowerResponseDto extends ConstructorExpression<BouquetFlowerResponseDto> {

    private static final long serialVersionUID = -696700890L;

    public QBouquetFlowerResponseDto(com.querydsl.core.types.Expression<Long> memberId, com.querydsl.core.types.Expression<Long> bouquetId, com.querydsl.core.types.Expression<String> imageUrl, com.querydsl.core.types.Expression<java.time.LocalDateTime> createDateTime, com.querydsl.core.types.Expression<? extends java.util.List<Long>> flowerIds) {
        super(BouquetFlowerResponseDto.class, new Class<?>[]{long.class, long.class, String.class, java.time.LocalDateTime.class, java.util.List.class}, memberId, bouquetId, imageUrl, createDateTime, flowerIds);
    }

}

