package com.ssafy.maryflower.bouquet.data.dto.response;

import com.ssafy.maryflower.bouquet.data.dto.transfer.BouquetSearchDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.SliceImpl;

@Getter
@AllArgsConstructor
public class BouquetSliceResponse {

    private SliceImpl<BouquetSearchDto> slice;
    private int lastIndex;


}
