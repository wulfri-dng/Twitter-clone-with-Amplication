/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { TweetCreateInput } from "./TweetCreateInput";

@ArgsType()
class CreateTweetArgs {
  @Field(() => TweetCreateInput, { nullable: false })
  data!: TweetCreateInput;
}

export { CreateTweetArgs as CreateTweetArgs };