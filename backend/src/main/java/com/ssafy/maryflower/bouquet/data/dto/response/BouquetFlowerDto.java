package com.ssafy.maryflower.bouquet.data.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class BouquetFlowerDto {
    private Long memberId; //nickname: memberId로 구분하기로 함.
    private Long bouquetId;
    private String whom;
    private String situation;
    private String message;
    private String imageUrl;
    private LocalDateTime createDateTime;
    private Long flowerId;

    @QueryProjection
    public BouquetFlowerDto(Long memberId, Long bouquetId, String whom, String situation, String message, String imageUrl, LocalDateTime createDateTime, Long flowerId) {
        this.memberId = memberId;
        this.bouquetId = bouquetId;
        this.whom = whom;
        this.situation = situation;
        this.message = message;
        this.imageUrl = imageUrl;
        this.createDateTime = createDateTime;
        this.flowerId = flowerId;
    }
}
