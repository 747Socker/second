package com.ssafy.maryflower.bouquet.data.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
public class BouquetListResponse {

    private List<InnerBouquet> bouquets;
    @Setter
    private int lastIndex;

    public BouquetListResponse() {
        bouquets = new ArrayList<>();
    }



    public boolean makeBouquet(BouquetFlowerDto dto, int pageSize){

        InnerBouquet innerBouquet = null; //찾기

        for (InnerBouquet bouquet : bouquets) {
            if (Objects.equals(bouquet.getBouquetId(), dto.getBouquetId())) {
                innerBouquet = bouquet;
                break;
            }
        }

        if (innerBouquet == null){
            if (bouquets.size() >= pageSize) return false;

            bouquets.add(new InnerBouquet(dto));
            return true;
        } else {
            innerBouquet.addFlowerId(dto);
        }
        return false;

    }

    @Getter
    public static class InnerBouquet{
        private Long bouquetId;
        private String whom;
        private String situation;
        private String message;
        private String imageUrl;
        private Long memberId;
        private List<Long> flowerId = new ArrayList<>();

        private InnerBouquet(BouquetFlowerDto dto){
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

}
