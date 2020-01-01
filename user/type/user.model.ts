import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Tweet } from "../../tweet/type/tweet.model";
import { Field, ObjectType } from "type-graphql";
import { v1 } from "uuid";

@ObjectType()
@Entity("user")
export class User {
    @Field()
    @PrimaryColumn({ default: v1() })
    id: string;

    @Field()
    @Column()
    profile_pic: string;

    @Field()
    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(
        type => Tweet,
        tweet => tweet.owner
    )
    tweets: Tweet[];
}
