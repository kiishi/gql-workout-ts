import {buildSchema} from 'type-graphql'
import {Container} from 'typedi'
import { TweetResolver } from '../tweet/tweet.resolver'
import { UserResolver } from '../user/user.resolver'

export const getSchemas = async() =>{
    const bundledSchema = await buildSchema({
        resolvers: [TweetResolver , UserResolver],
        container: Container
    })
    return bundledSchema
}

