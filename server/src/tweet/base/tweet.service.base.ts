/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Tweet } from "@prisma/client";

export class TweetServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TweetCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.TweetCountArgs>
  ): Promise<number> {
    return this.prisma.tweet.count(args);
  }

  async findMany<T extends Prisma.TweetFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TweetFindManyArgs>
  ): Promise<Tweet[]> {
    return this.prisma.tweet.findMany(args);
  }
  async findOne<T extends Prisma.TweetFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TweetFindUniqueArgs>
  ): Promise<Tweet | null> {
    return this.prisma.tweet.findUnique(args);
  }
  async create<T extends Prisma.TweetCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TweetCreateArgs>
  ): Promise<Tweet> {
    return this.prisma.tweet.create<T>(args);
  }
  async update<T extends Prisma.TweetUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TweetUpdateArgs>
  ): Promise<Tweet> {
    return this.prisma.tweet.update<T>(args);
  }
  async delete<T extends Prisma.TweetDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TweetDeleteArgs>
  ): Promise<Tweet> {
    return this.prisma.tweet.delete(args);
  }
}
