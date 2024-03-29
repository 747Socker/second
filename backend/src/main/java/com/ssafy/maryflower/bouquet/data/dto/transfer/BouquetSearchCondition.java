package com.ssafy.maryflower.bouquet.data.dto.transfer;

import lombok.Data;

@Data
public class BouquetSearchCondition {
  private String koreanName;
  private String meaning;
  private String whom;
  private String situation;
  private String message;
}
