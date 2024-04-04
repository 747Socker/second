package com.ssafy.maryflower.bouquet.data.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FlowerBouquet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flower_id")
    private Flower flower;

    @ManyToOne
    @JoinColumn(name = "bouquet_id")
    private Bouquet bouquet;

    @Builder
    public FlowerBouquet(Flower flower, Bouquet bouquet) {
        this.flower = flower;
        this.bouquet = bouquet;
    }
}
