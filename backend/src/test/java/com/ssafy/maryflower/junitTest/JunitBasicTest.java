package com.ssafy.maryflower.junitTest;


import com.ssafy.maryflower.bouquet.data.FlowerData;
import com.ssafy.maryflower.bouquet.data.entity.Bouquet;
import com.ssafy.maryflower.bouquet.data.entity.Flower;
import com.ssafy.maryflower.bouquet.data.repository.BouquetRepository;
import com.ssafy.maryflower.bouquet.data.repository.FlowerRepository;
import com.ssafy.maryflower.bouquet.service.BouquetService;
import com.ssafy.maryflower.member.data.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.yml")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class JunitBasicTest {

    @Autowired
    BouquetRepository bouquetRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    FlowerRepository flowerRepository;

    @Autowired
    BouquetService bouquetService;

    @Test
    @Rollback(value = false)
    void Test(){
        // given

        // when
//        memberRepository.save(
//                Member.builder()
//                        .kakaoId("123")
//                        .build()
//        );
//
//        Member member1 = memberRepository.findByKakaoId("123").get();

        String[] whoms = {"친구", "연인", "가족", "여자친구", "남자친구"};
        String[] situations = {"졸업", "생일", "결혼", "시험", "기념일"};
        String[] message = {"고생했어", "사랑해", "영원한 사랑", "귀여움", "소중함"};


        for (int i = 0; i < 10000; i++) {
            bouquetService.saveBucketData(whoms[(int) (Math.random() * whoms.length)],
                    situations[(int) (Math.random() * situations.length)],
                    message[(int) (Math.random() * message.length)],
                    "testUrl", 1L, pickThreeNumbers());
        }

        // then
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
