package com.ssafy.maryflower.test;

import com.ssafy.maryflower.bouquet.data.FlowerData;
import com.ssafy.maryflower.bouquet.data.entity.Flower;
import com.ssafy.maryflower.bouquet.data.repository.BouquetRepository;
import com.ssafy.maryflower.bouquet.data.repository.FlowerRepository;
import com.ssafy.maryflower.bouquet.service.BouquetService;
import com.ssafy.maryflower.member.data.entity.Member;
import com.ssafy.maryflower.member.data.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.TimeZone;

@Component
@Transactional
@RequiredArgsConstructor
@Slf4j
public class InitData {

    private final BouquetRepository bouquetRepository;
    private final MemberRepository memberRepository;
    private final FlowerRepository flowerRepository;
    private final BouquetService bouquetService;


//    @PostConstruct
    public void initData() {

        memberRepository.save(
        Member.builder()
                .kakaoId("123")
                .build()
        );

        Member member1 = memberRepository.findByKakaoId("123").get();
        Long memberId = member1.getMemberId();

        loadFlowerData();

        // 시간 설정
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        String[] whoms = {"친구", "연인", "가족", "여자친구", "남자친구"};
        String[] situations = {"졸업", "생일", "결혼", "시험", "기념일"};
        String[] message = {"고생했어", "사랑해", "영원한 사랑", "귀여움", "소중함"};


        for (int i = 0; i < 1000; i++) {
            bouquetService.saveBucketData(whoms[(int) (Math.random() * whoms.length)],
                    situations[(int) (Math.random() * situations.length)],
                    message[(int) (Math.random() * message.length)],
                    "testUrl", memberId, pickThreeNumbers());
        }
        log.info("finished");
    }


    private void loadFlowerData() {
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
