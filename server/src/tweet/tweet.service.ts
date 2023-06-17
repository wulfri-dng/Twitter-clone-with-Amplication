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
        try {
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
        } catch (error) {
            return error;
        }
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

            if (user && Array.isArray(user.tweets)) {
                user.tweets.push(publishedTweet.id);

                const updatedUser = await this.prisma.user.update({
                    where: {
                        id: data.userId,
                    },
                    data: {
                        tweets: user.tweets,
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

    async likeTweet(data: { tweetId: string; userId: string }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: data.userId,
                },
            });

            if (
                user?.likedTweets &&
                Array.isArray(user.likedTweets) &&
                user.likedTweets.includes(data.tweetId)
            ) {
                return { error: "Error occurred" };
            } else {
                const updatedTweet = await this.prisma.tweet.update({
                    where: {
                        id: data.tweetId,
                    },
                    data: {
                        likeCount: {
                            increment: 1,
                        },
                    },
                });

                if (user && Array.isArray(user.likedTweets)) {
                    user.likedTweets.push(updatedTweet.id);

                    const updatedUser = await this.prisma.user.update({
                        where: {
                            id: data.userId,
                        },
                        data: {
                            likedTweets: user.likedTweets,
                        },
                    });

                    return {
                        updatedTweet: updatedTweet,
                        updatedUser: updatedUser,
                    };
                }

                return {
                    updatedTweet: updatedTweet,
                    updatedUser: "Error occurred",
                };
            }
        } catch (error) {
            return error;
        }
    }

    async dislikeTweet(data: { tweetId: string; userId: string }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: data.userId,
                },
            });

            if (
                user?.likedTweets &&
                Array.isArray(user.likedTweets) &&
                user.likedTweets.includes(data.tweetId)
            ) {
                const updatedTweet = await this.prisma.tweet.update({
                    where: {
                        id: data.tweetId,
                    },
                    data: {
                        likeCount: {
                            decrement: 1,
                        },
                    },
                });

                const likedTweetIndex = user.likedTweets.indexOf(data.tweetId);
                user.likedTweets.splice(likedTweetIndex, 1);

                const updatedUser = await this.prisma.user.update({
                    where: {
                        id: data.userId,
                    },
                    data: {
                        likedTweets: user.likedTweets,
                    },
                });

                return {
                    updatedTweet: updatedTweet,
                    updatedUser: updatedUser,
                };
            } else {
                return { error: "Error occurred" };
            }
        } catch (error) {
            return error;
        }
    }
}
