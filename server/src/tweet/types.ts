export interface TweetModel {
    comments: [];
    content: string | null;
    dateTime: Date;
    id: string;
    likeCount: number | null;
    userId: string;
    viewCount: number | null;
}

export interface UpdatedTweetModel extends TweetModel {
    userName: string;
    name: string;
}
