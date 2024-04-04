package com.ssafy.maryflower.bouquet.service;

import com.ssafy.maryflower.bouquet.data.FlowerData;
import com.ssafy.maryflower.bouquet.data.dto.response.FlowerDto;
import com.ssafy.maryflower.bouquet.data.entity.Flower;
import com.ssafy.maryflower.bouquet.data.repository.BouquetRepository;
import com.ssafy.maryflower.bouquet.data.repository.FlowerRepository;
import com.ssafy.maryflower.member.data.entity.Member;
import com.ssafy.maryflower.member.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.TimeZone;

@RequiredArgsConstructor
@Component
@Slf4j
public class FlowerDataLoader implements CommandLineRunner {

    private final CacheService cacheService;
    private final BouquetService bouquetService;
    private final MemberRepository memberRepository;
    private final FlowerRepository flowerRepository;
    private final BouquetRepository bouquetRepository;
    @Override
    public void run(String... args) throws Exception {
        log.info("RUN");
        loadFlowerData();
//        loadMemberData();
//        loadBouquetData();
//        cacheService.getAllFlowers();
//        initData();
    }
    private void loadFlowerData() {
        log.info("flower data load");

        if (flowerRepository.count() >= FlowerData.FLOWERS.size()) return;

        for (FlowerData.FlowerInfo info : FlowerData.FLOWERS) {
            Flower flower = Flower.builder()
                    .koreanName(info.getKoreanName())
                    .englishName(info.getEnglishName())
                    .color(info.getColor())
                    .meaning(info.getMeaning())
                    .imageUrl(info.getImageUrl())
                    .build();
            flowerRepository.save(flower);
        }
    }
    private void loadMemberData(){
        log.info("member data load");

        String kakaoId = "TestKakaoId";

        if (!memberRepository.existsByKakaoId(kakaoId)){
            Member member = new Member();
            member.setKakaoId(kakaoId);
            member.setProfileImage("TestPorfileImage");
            memberRepository.save(member);
        }
    }

    private void loadBouquetData(){
        log.info("bouquet data load");

        List<Long> testList;

        testList = new ArrayList<>();
        testList.add(2L);
        testList.add(4L);
        testList.add(7L);
        bouquetService.saveBucketData("여자친구", "기념일","축하","testUrl",1L,testList);

        testList = new ArrayList<>();
        testList.add(2L);
        testList.add(1L);
        testList.add(6L);
        bouquetService.saveBucketData("친구", "졸업","고생했어","testUrl",1L,testList);

        testList = new ArrayList<>();
        testList.add(9L);
        testList.add(10L);
        testList.add(13L);
        bouquetService.saveBucketData("동생", "생일","축하","testUrl",1L,testList);


    }

    private void initData() {

        if (!memberRepository.existsByKakaoId("123")){
            memberRepository.save(
                    Member.builder()
                            .nickname("닉네임")
                            .kakaoId("123")
                            .build());
        }

        Member member1 = memberRepository.findByKakaoId("123").get();
        Long memberId = member1.getMemberId();

        loadFlowerData();

        // 시간 설정
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        String[] whoms = {"친구", "연인", "가족", "여자친구", "남자친구"};
        String[] situations = {"졸업", "생일", "결혼", "시험", "기념일"};
        String[] message = {"고생했어", "사랑해", "영원한 사랑", "귀여움", "소중함"};


        for (int i = 0; i < 16; i++) {
            bouquetService.saveBucketData(whoms[(int) (Math.random() * whoms.length)],
                    situations[(int) (Math.random() * situations.length)],
                    message[(int) (Math.random() * message.length)],
                    "testUrl", memberId, pickThreeNumbers());
        }
        log.info("finished");
    }

    private static List<Long> pickThreeNumbers() {
        // 1L부터 13L까지의 숫자를 저장할 리스트 생성
        List<Long> numbers = new ArrayList<>();
        for (long i = 1L; i <= 13L; i++) {
            numbers.add(i);
        }
        // 리스트를 무작위로 섞음
        Collections.shuffle(numbers);
        // 섞인 리스트에서 상위 3개의 숫자를 선택
        return numbers.subList(0, 3);
    }
}
