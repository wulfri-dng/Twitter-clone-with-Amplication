import { Module } from "@nestjs/common";
import { TweetModuleBase } from "./base/tweet.module.base";
import { TweetService } from "./tweet.service";
import { TweetController } from "./tweet.controller";

@Module({
  imports: [TweetModuleBase],
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
