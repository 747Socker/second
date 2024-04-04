package com.ssafy.maryflower.member.service;

import com.ssafy.maryflower.member.data.entity.Member;
import com.ssafy.maryflower.member.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    public Optional<Long> getMemberIdByKakaoId(String kakaoId){
        return memberRepository.findByKakaoId(kakaoId).map(Member::getMemberId);
    }

}
