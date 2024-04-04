package com.ssafy.maryflower.bouquet.data.dto.transfer;

import com.ssafy.maryflower.bouquet.data.dto.response.BouquetFlowerDto;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BouquetSearchDto {
    private Long bouquetId;
    private String whom;
    private String situation;
    private String message;
    private String imageUrl;
    private Long memberId;
    private List<Long> flowerId = new ArrayList<>();

    public BouquetSearchDto(BouquetFlowerDto dto){
        this.bouquetId = dto.getBouquetId();
        this.whom = dto.getWhom();
        this.situation = dto.getSituation();
        this.message = dto.getMessage();
        this.imageUrl = dto.getImageUrl();
        this.memberId = dto.getMemberId();
        flowerId.add(dto.getFlowerId());
    }

    public void addFlowerId(BouquetFlowerDto dto){
        flowerId.add(dto.getFlowerId());
    }
}
