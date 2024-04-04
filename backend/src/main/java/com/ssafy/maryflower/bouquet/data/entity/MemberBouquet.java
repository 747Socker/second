package com.ssafy.maryflower.bouquet.data.entity;

import com.ssafy.maryflower.member.data.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;

@Entity
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberBouquet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name= "member_id")
    @NonNull
    private Member member;

    @ManyToOne
    @JoinColumn(name= "bouquet_id")
    @NonNull
    private Bouquet bouquet;


}
