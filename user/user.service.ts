import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { User } from "./type/user.model";
import { Tweet } from "../tweet/type/tweet.model";

@Service()
export class UserService {
    userRepository: Repository<User>;
    tweetRepository: Repository<Tweet>;

    constructor() {
        this.userRepository = getRepository<User>(User);
        this.tweetRepository = getRepository<Tweet>(Tweet);
    }

    public async getTweetsForUser(user_id: string): Promise<Tweet[]> {
        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            }
        });
        const tweets = await this.tweetRepository.find({
            where: {
                owner: user
            }
        });
        return tweets;
    }
    public async newUser(): Promise<User> {
        const user = new User();
        user.profile_pic = "http://google.com";
        user.username = "deolu";
        user.password = "password";
        await this.userRepository.save(user);
        return user;
    }

    public async allUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    public async addTweet(user_id: string, text: string): Promise<Tweet> {
        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            }
        });
        if (user) {
            const tweet = new Tweet();
            (tweet.isReply = false), (tweet.owner = user);
            tweet.text = text;
            tweet.owner = user
            await this.tweetRepository.save(tweet);
            return tweet
        } else {
            throw new Error("Cannot do somethins");
        }
    }
}
