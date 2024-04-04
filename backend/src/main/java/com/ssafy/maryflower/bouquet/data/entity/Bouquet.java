package com.ssafy.maryflower.bouquet.data.entity;

import com.ssafy.maryflower.global.BaseEntity;
import com.ssafy.maryflower.member.data.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bouquet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Bouquet 엔티티의 기본키(PK)를 자동으로 생성.
    private Long bouquetId;
    private String whom;
    private String situation;
    private String message;
    private String imageUrl;


    @ManyToOne
    @JoinColumn(name="member_id")
    @NonNull
    private Member member;


    @OneToMany(mappedBy = "bouquet", cascade = CascadeType.REMOVE)
    private List<FlowerBouquet> flowerBouquets = new ArrayList<>();

    @OneToMany(mappedBy = "bouquet", cascade = CascadeType.REMOVE)
    private List<MemberBouquet> memberBouquets = new ArrayList<>();
    /*
    매핑되는 상대테이블의 List를 가지고 있는 이유
    - 한 엔티티에서 연관된 다른 엔티티로의 접근과 반대 방향으로의 접근 모두 가능하게 하기 위해.
    Bouquet 엔티티에서 연관된 Flower 엔티티를 조회 할 수 있으며, 반대로도 조회 가능.
    또 데이터의 일관성을 유지. flower
     */


    @Builder
    public Bouquet(Long bouquetId, String whom, String situation, String message, String imageUrl, @NonNull Member member) {
        this.bouquetId = bouquetId;
        this.whom = whom;
        this.situation = situation;
        this.message = message;
        this.imageUrl = imageUrl;
        this.member = member;
    }
}
