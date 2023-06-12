import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TweetServiceBase } from "./base/tweet.service.base";

@Injectable()
export class TweetService extends TweetServiceBase {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma);
    }

    async getAllTweets() {
        return "All tweets";
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
