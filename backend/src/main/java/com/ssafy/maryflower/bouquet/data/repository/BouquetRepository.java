package com.ssafy.maryflower.bouquet.data.repository;

import com.ssafy.maryflower.bouquet.data.entity.Bouquet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BouquetRepository extends JpaRepository<Bouquet,Long> {

}
