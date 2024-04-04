package com.ssafy.maryflower.bouquet.data.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFlowerBouquet is a Querydsl query type for FlowerBouquet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFlowerBouquet extends EntityPathBase<FlowerBouquet> {

    private static final long serialVersionUID = -973777739L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFlowerBouquet flowerBouquet = new QFlowerBouquet("flowerBouquet");

    public final QBouquet bouquet;

    public final QFlower flower;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QFlowerBouquet(String variable) {
        this(FlowerBouquet.class, forVariable(variable), INITS);
    }

    public QFlowerBouquet(Path<? extends FlowerBouquet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFlowerBouquet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFlowerBouquet(PathMetadata metadata, PathInits inits) {
        this(FlowerBouquet.class, metadata, inits);
    }

    public QFlowerBouquet(Class<? extends FlowerBouquet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bouquet = inits.isInitialized("bouquet") ? new QBouquet(forProperty("bouquet"), inits.get("bouquet")) : null;
        this.flower = inits.isInitialized("flower") ? new QFlower(forProperty("flower")) : null;
    }

}

