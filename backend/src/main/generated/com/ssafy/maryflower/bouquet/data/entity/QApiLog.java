package com.ssafy.maryflower.bouquet.data.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QApiLog is a Querydsl query type for ApiLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QApiLog extends EntityPathBase<ApiLog> {

    private static final long serialVersionUID = 1054610549L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QApiLog apiLog = new QApiLog("apiLog");

    public final com.ssafy.maryflower.global.QBaseEntity _super = new com.ssafy.maryflower.global.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDateTime = _super.createDateTime;

    public final NumberPath<Long> logId = createNumber("logId", Long.class);

    public final com.ssafy.maryflower.member.data.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateDateTime = _super.updateDateTime;

    public QApiLog(String variable) {
        this(ApiLog.class, forVariable(variable), INITS);
    }

    public QApiLog(Path<? extends ApiLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QApiLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QApiLog(PathMetadata metadata, PathInits inits) {
        this(ApiLog.class, metadata, inits);
    }

    public QApiLog(Class<? extends ApiLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.maryflower.member.data.entity.QMember(forProperty("member")) : null;
    }

}

