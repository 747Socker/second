package com.ssafy.maryflower.bouquet.data.repository;

import com.ssafy.maryflower.bouquet.data.dto.request.BouquetListRequestDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetFlowerResponseDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetListResponse;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetSliceResponse;
import com.ssafy.maryflower.bouquet.data.dto.transfer.BouquetSearchDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface BouquetRepositoryCustom {

  BouquetSliceResponse searchRelevantBouquet(BouquetListRequestDto req, Pageable pageable);
  Slice<BouquetFlowerResponseDto> searchRelevantBouquetLegacy(BouquetListRequestDto req, Pageable pageable);
}
