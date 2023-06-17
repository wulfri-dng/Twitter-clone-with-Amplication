import { Tweet } from ".prisma/client";

export interface UpdatedTweetModel extends Tweet {
    userName: string;
    name: string;
}
