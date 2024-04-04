package com.ssafy.maryflower.bouquet.data.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBouquet is a Querydsl query type for Bouquet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBouquet extends EntityPathBase<Bouquet> {

    private static final long serialVersionUID = -795746480L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBouquet bouquet = new QBouquet("bouquet");

    public final com.ssafy.maryflower.global.QBaseEntity _super = new com.ssafy.maryflower.global.QBaseEntity(this);

    public final NumberPath<Long> bouquetId = createNumber("bouquetId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDateTime = _super.createDateTime;

    public final ListPath<FlowerBouquet, QFlowerBouquet> flowerBouquets = this.<FlowerBouquet, QFlowerBouquet>createList("flowerBouquets", FlowerBouquet.class, QFlowerBouquet.class, PathInits.DIRECT2);

    public final StringPath imageUrl = createString("imageUrl");

    public final com.ssafy.maryflower.member.data.entity.QMember member;

    public final ListPath<MemberBouquet, QMemberBouquet> memberBouquets = this.<MemberBouquet, QMemberBouquet>createList("memberBouquets", MemberBouquet.class, QMemberBouquet.class, PathInits.DIRECT2);

    public final StringPath message = createString("message");

    public final StringPath situation = createString("situation");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateDateTime = _super.updateDateTime;

    public final StringPath whom = createString("whom");

    public QBouquet(String variable) {
        this(Bouquet.class, forVariable(variable), INITS);
    }

    public QBouquet(Path<? extends Bouquet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBouquet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBouquet(PathMetadata metadata, PathInits inits) {
        this(Bouquet.class, metadata, inits);
    }

    public QBouquet(Class<? extends Bouquet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.maryflower.member.data.entity.QMember(forProperty("member")) : null;
    }

}

