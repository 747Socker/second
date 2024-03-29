package com.ssafy.maryflower.bouquet.data.repository;

import com.ssafy.maryflower.bouquet.data.entity.Bouquet;
import com.ssafy.maryflower.bouquet.data.entity.MemberBouquet;
import com.ssafy.maryflower.member.data.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberBouquetRepository extends JpaRepository<MemberBouquet, Long> {
  MemberBouquet findByMemberAndBouquet(Member member, Bouquet bouquet);
  MemberBouquet deleteAllByBouquet(Bouquet bouquet);
  List<MemberBouquet> findAllByBouquet(Bouquet bouquet);
}
