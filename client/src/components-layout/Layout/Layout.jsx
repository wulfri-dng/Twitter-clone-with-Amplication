import { useState } from 'react';
import { CreateTweetDialog } from '../../components-tweet-feed';
import { LeftSide } from '../LeftSide/LeftSide';
import { RightSide } from '../RightSide/RightSide';
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100vh;
    background: black;
    --left: 300px;
    --right: 400px;
    --middle: calc(100% - var(--left) - var(--right));

    .content {
        max-width: 1300px;
        margin: 0 auto;
        width: 100%;
        display: flex;
    }

    .left-side-bar {
        height: 100vh;
        width: var(--left);
        position: sticky;
        top: 0;
    }

    .main-content {
        position: relative;
        width: var(--middle);
        border-left: 1px solid #333;
        border-right: 1px solid #333;
        min-height: 100vh;
    }

    .right-side-bar {
        width: var(--right);
    }
`;

export const Layout = ({ fetchAllTweets, children }) => {
    const [createDialogOpened, setCreateDialogOpened] = useState(false);

    return (
        <>
            {createDialogOpened && (
                <CreateTweetDialog
                    fetchAllTweets={fetchAllTweets}
                    onClickOutside={() => setCreateDialogOpened(false)}
                />
            )}
            <Container>
                <div className="content">
                    <div className="left-side-bar">
                        <LeftSide
                            onClickTweet={() => setCreateDialogOpened(true)}
                        />
                    </div>
                    <main className="main-content">{children}</main>
                    <div className="right-side-bar">
                        <RightSide />
                    </div>
                    <div />
                </div>
            </Container>
        </>
    );
};
