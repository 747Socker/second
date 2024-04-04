package com.ssafy.maryflower.bouquet.controller;

import com.ssafy.maryflower.bouquet.data.dto.request.BouquetListRequestDto;
import com.ssafy.maryflower.bouquet.data.dto.request.DeleteRequestDto;
import com.ssafy.maryflower.bouquet.data.dto.request.DownloadRequestDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetFlowerResponseDto;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetListResponse;
import com.ssafy.maryflower.bouquet.data.dto.response.BouquetSliceResponse;
import com.ssafy.maryflower.bouquet.data.dto.transfer.BouquetSearchDto;
import com.ssafy.maryflower.bouquet.data.repository.BouquetJpaRepository;
import com.ssafy.maryflower.bouquet.service.ListService;
import com.ssafy.maryflower.global.util.MemberUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bouquet/list")
@RequiredArgsConstructor
@Slf4j
public class ListController {

  private final ListService listService;

  @GetMapping("")
  public ResponseEntity<BouquetSliceResponse> search(BouquetListRequestDto req, @PageableDefault(size = 4) Pageable pageable) {
    BouquetSliceResponse res = listService.search(req, pageable);
    return ResponseEntity.ok(res);
  }

  @GetMapping("legacy")
  public ResponseEntity<Slice<BouquetFlowerResponseDto>> searchLegacy(BouquetListRequestDto req, @PageableDefault(size = 4) Pageable pageable) {
      Slice<BouquetFlowerResponseDto> res = listService.searchLegacy(req, pageable);
      return ResponseEntity.ok(res);
  }

    // 부케 다운로드 요청
  @PostMapping("/download")
  public ResponseEntity<Void> downloadBouquet(@RequestBody DownloadRequestDto req) {
    String kakaoId = MemberUtil.getKakaoId();
    listService.downloadBouquetImage(req, kakaoId);
    return ResponseEntity.ok().build();
  }

  // 부케 삭제 요청
  @DeleteMapping("/delete")
  public ResponseEntity<Void> deleteBouquet(@RequestBody DeleteRequestDto req) {
    String kakaoId = MemberUtil.getKakaoId();
    listService.deleteBouquet(req, kakaoId);
    return ResponseEntity.ok().build();
  }

}
