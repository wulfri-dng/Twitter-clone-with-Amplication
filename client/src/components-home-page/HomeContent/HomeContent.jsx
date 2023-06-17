import styled from 'styled-components';
import { MainHeader } from '../MainHeader/MainHeader';
import { CreateTweetTop } from '../CreateTweetTop/CreateTweetTop';
import { TweetFeed } from '../../components-tweet-feed/TweetFeed/TweetFeed';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/mainContext';

const Container = styled.div`
    .header {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .create-tweet-top {
        border-bottom: 1px solid #333;
    }

    .new-tweets-info {
        border-bottom: 1px solid #333;
        padding: 20px;
        text-align: center;
        color: var(--theme-color);
        display: block;
        width: 100%;
        font-size: 16px;

        &:hover {
            background: #111;
        }
    }
`;

export const HomeContent = ({ tweetList, fetchAllTweets }) => {
    const user = useContext(MainContext);
    const [headerTitle, setHeaderTitle] = useState('Explore');

    useEffect(() => {
        if (!user.loggedUser) {
            setHeaderTitle('Explore');
        } else {
            setHeaderTitle('Home');
        }
    }, [user.loggedUser]);

    return (
        <Container>
            <div className="header">
                <MainHeader title={headerTitle} />
            </div>
            {user.loggedUser && (
                <div className="create-tweet-top">
                    <CreateTweetTop fetchAllTweets={fetchAllTweets} />
                </div>
            )}
            <TweetFeed tweetList={tweetList} fetchAllTweets={fetchAllTweets} />
        </Container>
    );
};
