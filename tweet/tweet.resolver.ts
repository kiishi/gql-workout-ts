import { Resolver, Query, Arg, FieldResolver, Root, Mutation } from "type-graphql";
import { Inject } from "typedi";
import { Tweet } from "./type/tweet.model";
import { UserService } from "../user/user.service";
import { TweetService } from "./tweet.service";
import { User } from "../user/type/user.model";

@Resolver(of => Tweet)
export class TweetResolver {
    @Inject()
    userService: UserService;

    @Inject()
    tweetService: TweetService;

    @Query(returns=> [Tweet])
    async tweet(@Arg("user") userId: string): Promise<Tweet[]> {
        const tweets = await this.userService.getTweetsForUser(userId);
        console.log(tweets)
        return tweets;
    }


    @FieldResolver(returns =>[String])
    async replies(@Root() field: Tweet): Promise<String[]> {
        return ["hey" , "bitch"];
    }


}
