package com.ssafy.maryflower.bouquet.data.repository;

import com.ssafy.maryflower.bouquet.data.entity.Bouquet;
import com.ssafy.maryflower.member.data.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BouquetRepository extends JpaRepository<Bouquet,Long>, BouquetRepositoryCustom {
  Optional<Bouquet> findById(Long bouquetId);
  Bouquet findByBouquetId(Long bouquetId);
  Bouquet findByBouquetIdAndMember(Long bouquetId, Member member);

}
