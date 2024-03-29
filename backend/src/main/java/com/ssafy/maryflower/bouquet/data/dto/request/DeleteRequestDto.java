package com.ssafy.maryflower.bouquet.data.dto.request;

import lombok.Getter;

@Getter
public class DeleteRequestDto {
  private Long memberId;
  private Long bouquetId;
}
