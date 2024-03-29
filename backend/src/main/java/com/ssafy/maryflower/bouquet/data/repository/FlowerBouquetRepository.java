package com.ssafy.maryflower.bouquet.data.repository;

import com.ssafy.maryflower.bouquet.data.entity.Bouquet;
import com.ssafy.maryflower.bouquet.data.entity.FlowerBouquet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlowerBouquetRepository extends JpaRepository<FlowerBouquet, Long> {
  List<FlowerBouquet> findAllByBouquet(Bouquet bouquet);
  void deleteByBouquet(Bouquet bouquet);
}
