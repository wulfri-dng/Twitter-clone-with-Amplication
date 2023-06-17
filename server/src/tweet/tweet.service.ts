import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TweetServiceBase } from "./base/tweet.service.base";
import { UpdatedTweetModel } from "./types";

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
        try {
            const tweet = {
                userId: data.userId,
                dateTime: data.dateTime,
                content: data.content,
                likeCount: 0,
                viewCount: 0,
                comments: [],
            };

            const user = await this.prisma.user.findUnique({
                where: {
                    id: data.userId,
                },
            });

            const publishedTweet = await this.prisma.tweet.create({
                data: tweet,
            });

            if (user) {
                const updatedUser = await this.prisma.user.update({
                    where: {
                        id: data.userId,
                    },
                    data: {
                        tweets: {
                            push: publishedTweet.id,
                        },
                    },
                });

                return {
                    publishedTweetResult: publishedTweet,
                    updatedUserResult: updatedUser,
                };
            } else {
                return {
                    error: "User not found; Tweet published",
                    publishedTweetResult: publishedTweet,
                };
            }
        } catch (error) {
            return error;
        }
    }

    async likeTweet(data: { userId: string; dateTime: Date; content: string }) {
        return data;
    }

    async dislikeTweet(data: { dislikedUserId: string; tweetId: string }) {
        return data;
    }
}
