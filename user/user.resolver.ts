import {
    Resolver,
    Query,
    Arg,
    Mutation,
    InputType,
    Field,
    Root,
    FieldResolver,
    Args
} from "type-graphql";
import { User } from "./type/user.model";
import { Inject } from "typedi";
import { UserService } from "./user.service";
import { Tweet } from "../tweet/type/tweet.model";

@Resolver(of => User)
export class UserResolver {
    @Inject()
    userService: UserService;

    @Query(returns => [User])
    async allUsers(): Promise<User[]> {
        const users = await this.userService.allUsers();
        return users;
    }

    @FieldResolver(returns => String)
    async token(@Root() field: User): Promise<String>{
        return field.id + "---" + field.username;
    }

    @FieldResolver(returns => [Tweet])
    async tweets(@Root() field : User): Promise<Tweet[]>{
        return this.userService.getTweetsForUser(field.id)
    }

    @Mutation(returns => User)
    async newUser(): Promise<User> {
        return this.userService.newUser();
    }

    @Mutation(returns => Tweet)
    async Tweet(@Arg('user_id') user_id : string , @Arg("text") text : string): Promise<Tweet>{
        const tweet = await this.userService.addTweet(user_id , text)
        return tweet
    }

}
