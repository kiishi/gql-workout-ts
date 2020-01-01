import {
    Column,
    Entity,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "../../user/type/user.model";
import {v4} from 'uuid'

@ObjectType()
@Entity("tweet")
export class Tweet {
    @Field()
    @PrimaryColumn({
        unique: true,
        default: v4()
    })
    id: string;

    @Field()
    @Column({
        default: false
    })
    isReply: boolean;

    @Field({nullable:true})
    @Column({nullable: true})
    parent_tweet_id: string;

    @Field()
    @Column()
    text: string;

    @ManyToOne(
        type => User,
        user => user.tweets
    )
    @JoinColumn()
    owner: User;

    @Field()
    @Column({
        default:0
    })
    likes: number;

}
