package com.ssafy.maryflower.bouquet.data.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberBouquet is a Querydsl query type for MemberBouquet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberBouquet extends EntityPathBase<MemberBouquet> {

    private static final long serialVersionUID = -505458794L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberBouquet memberBouquet = new QMemberBouquet("memberBouquet");

    public final QBouquet bouquet;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.maryflower.member.data.entity.QMember member;

    public QMemberBouquet(String variable) {
        this(MemberBouquet.class, forVariable(variable), INITS);
    }

    public QMemberBouquet(Path<? extends MemberBouquet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberBouquet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberBouquet(PathMetadata metadata, PathInits inits) {
        this(MemberBouquet.class, metadata, inits);
    }

    public QMemberBouquet(Class<? extends MemberBouquet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bouquet = inits.isInitialized("bouquet") ? new QBouquet(forProperty("bouquet"), inits.get("bouquet")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.maryflower.member.data.entity.QMember(forProperty("member")) : null;
    }

}

