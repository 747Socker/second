package com.ssafy.maryflower.bouquet.data.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFlower is a Querydsl query type for Flower
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFlower extends EntityPathBase<Flower> {

    private static final long serialVersionUID = 1194281990L;

    public static final QFlower flower = new QFlower("flower");

    public final com.ssafy.maryflower.global.QBaseEntity _super = new com.ssafy.maryflower.global.QBaseEntity(this);

    public final StringPath color = createString("color");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDateTime = _super.createDateTime;

    public final StringPath englishName = createString("englishName");

    public final ListPath<FlowerBouquet, QFlowerBouquet> FlowerBouquets = this.<FlowerBouquet, QFlowerBouquet>createList("FlowerBouquets", FlowerBouquet.class, QFlowerBouquet.class, PathInits.DIRECT2);

    public final NumberPath<Long> flowerId = createNumber("flowerId", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final StringPath koreanName = createString("koreanName");

    public final StringPath meaning = createString("meaning");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateDateTime = _super.updateDateTime;

    public QFlower(String variable) {
        super(Flower.class, forVariable(variable));
    }

    public QFlower(Path<? extends Flower> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFlower(PathMetadata metadata) {
        super(Flower.class, metadata);
    }

}

