import { Service } from "typedi";
import { Tweet } from "./type/tweet.model";
import { getRepository, Repository, FindManyOptions } from "typeorm";
import { v1 } from "uuid";
import { User } from "../user/type/user.model";

@Service()
export class TweetService {
    tweetRepository: Repository<Tweet>;
    userRepostory: Repository<User>;
    constructor() {
        this.tweetRepository = getRepository(Tweet);
        this.userRepostory = getRepository(User);
    }
    public async getRepliesForTweet(tweet_id: string): Promise<Tweet[]> {
        const options: FindManyOptions<Tweet> = {
            where: { id: tweet_id },
            relations: ["user"]
        };
        return this.tweetRepository.find(options);
    }

    public async addTweet(
        object: any,
        isReply: boolean = false
    ): Promise<Tweet> {
        const user = await this.userRepostory.findOne({
            where: object.user_id
        });
        const newTweet = new Tweet();
        newTweet.id = v1();
        newTweet.isReply = isReply;
        newTweet.text = object.text;
        newTweet.owner = user;
        newTweet.parent_tweet_id = object.parent_tweet_id;
        await this.tweetRepository.save(newTweet);
        return newTweet;
    }
    
}
