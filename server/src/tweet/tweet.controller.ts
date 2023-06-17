import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { TweetService } from "./tweet.service";
import { TweetControllerBase } from "./base/tweet.controller.base";
import { Get, Post, Query, Body } from "@nestjs/common";

@swagger.ApiTags("tweet")
@common.Controller("tweet")
export class TweetController extends TweetControllerBase {
    constructor(protected readonly tweetService: TweetService) {
        super(tweetService);
    }

    @Get("getAll")
    async getAllTweets() {
        return await this.tweetService.getAllTweets();
    }

    @Post("publish")
    async publishTweet(
        @Body() data: { userId: string; dateTime: Date; content: string },
    ) {
        return await this.tweetService.publishTweet(data);
    }

    @Post("like")
    async likeTweet(
        @Body()
        data: {
            tweetId: string;
            userId: string;
        },
    ) {
        return await this.tweetService.likeTweet(data);
    }

    @Post("dislike")
    async dislikeTweet(@Body() data: { tweetId: string; userId: string }) {
        return await this.tweetService.dislikeTweet(data);
    }
}
