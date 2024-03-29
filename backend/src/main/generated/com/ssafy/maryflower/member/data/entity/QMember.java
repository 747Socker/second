package com.ssafy.maryflower.member.data.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 631074404L;

    public static final QMember member = new QMember("member1");

    public final com.ssafy.maryflower.global.QBaseEntity _super = new com.ssafy.maryflower.global.QBaseEntity(this);

    public final ListPath<com.ssafy.maryflower.bouquet.data.entity.ApiLog, com.ssafy.maryflower.bouquet.data.entity.QApiLog> apiLogs = this.<com.ssafy.maryflower.bouquet.data.entity.ApiLog, com.ssafy.maryflower.bouquet.data.entity.QApiLog>createList("apiLogs", com.ssafy.maryflower.bouquet.data.entity.ApiLog.class, com.ssafy.maryflower.bouquet.data.entity.QApiLog.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDateTime = _super.createDateTime;

    public final StringPath kakaoId = createString("kakaoId");

    public final ListPath<com.ssafy.maryflower.bouquet.data.entity.MemberBouquet, com.ssafy.maryflower.bouquet.data.entity.QMemberBouquet> MemberBouquets = this.<com.ssafy.maryflower.bouquet.data.entity.MemberBouquet, com.ssafy.maryflower.bouquet.data.entity.QMemberBouquet>createList("MemberBouquets", com.ssafy.maryflower.bouquet.data.entity.MemberBouquet.class, com.ssafy.maryflower.bouquet.data.entity.QMemberBouquet.class, PathInits.DIRECT2);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath password = createString("password");

    public final StringPath profileImage = createString("profileImage");

    public final EnumPath<com.ssafy.maryflower.global.auth.data.UserRole> role = createEnum("role", com.ssafy.maryflower.global.auth.data.UserRole.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateDateTime = _super.updateDateTime;

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

