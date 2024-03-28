package com.ssafy.maryflower.bouquet.service;

import com.ssafy.maryflower.bouquet.data.dto.response.firstGenerateDto;
import com.ssafy.maryflower.bouquet.data.dto.response.reGenerateDto;
import com.ssafy.maryflower.bouquet.data.dto.transfer.BouquetUrlTransferDto;
import com.ssafy.maryflower.bouquet.sse.SseEmitters;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DataSubscribeService {

    private final SseEmitters sseEmitters;
    private final CacheService cacheService;
    public void subscribeBouquetDataFromAIServer(BouquetUrlTransferDto bouquetUrlTransferDto){

        // Test
        System.out.println("AI로부터 subscribe");
        if(!bouquetUrlTransferDto.isFinish()){
            System.out.println("middle image = " + bouquetUrlTransferDto.getBouquetUrl());
            sseEmitters.sendImageUrlToClient(bouquetUrlTransferDto.getRequestId(),bouquetUrlTransferDto.getBouquetUrl());
        }
        else if(cacheService.cachereGenerateDto(bouquetUrlTransferDto.getRequestId())!=null){
            reGenerateDto regeneratedto= cacheService.cachereGenerateDto(bouquetUrlTransferDto.getRequestId());
            regeneratedto.setBouquetUrl(bouquetUrlTransferDto.getBouquetUrl());
            sseEmitters.sendGenerateDtoToClient(bouquetUrlTransferDto.getRequestId(),regeneratedto);
        } else {
            firstGenerateDto firstgeneratedto = cacheService.cachefirstGenerateDto(bouquetUrlTransferDto.getRequestId());
            firstgeneratedto.setBouquetUrl(bouquetUrlTransferDto.getBouquetUrl());
            sseEmitters.sendGenerateDtoToClient(bouquetUrlTransferDto.getRequestId(),firstgeneratedto);
        }
    }



}
