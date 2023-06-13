import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TweetServiceBase } from "./base/tweet.service.base";
import { TweetModel, UpdatedTweetModel } from "./types";

@Injectable()
export class TweetService extends TweetServiceBase {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma);
    }

    async getAllTweets() {
        const tweetList = await this.prisma.tweet.findMany();
        const userList = await this.prisma.user.findMany();

        const updatedTweetList: UpdatedTweetModel[] = [];

        for (const tweet of tweetList) {
            const updatedTweet = {
                ...tweet,
                userName: "",
                name: "",
            };

            for (const user of userList) {
                if (updatedTweet.userId === user.id.toString()) {
                    updatedTweet.userName = user.username;
                    updatedTweet.name = user.name;
                    break;
                }
            }

            updatedTweetList.push(updatedTweet);
        }

        return updatedTweetList;
    }

    async publishTweet(data: {
        userId: string;
        dateTime: Date;
        content: string;
    }) {
        return data;
    }

    async likeTweet(data: { userId: string; dateTime: Date; content: string }) {
        return data;
    }

    async dislikeTweet(data: { dislikedUserId: string; tweetId: string }) {
        return data;
    }
}
