import { useState } from 'react';
import Search from '../../shared/Icons/Search';

export const RightSideUserPreview = () => {
    const [searchText, setSearchText] = useState('');

    const trends = [
        {
            title: '#RockstarGame',
            tweetsCount: '1,098',
            category: 'Gaming',
        },
        {
            title: '#JioCinema',
            tweetsCount: '6,317',
            category: 'Entertainment',
        },
        {
            title: '#BlackMirror',
            tweetsCount: '9,880',
            category: 'Entertainment',
        },
        {
            title: 'Lilian Muli',
            tweetsCount: '2,899',
            category: 'Family & relationships ',
        },
        {
            title: '#FukraInsaan',
            tweetsCount: '11.1K ',
            category: 'Entertainment',
        },
    ];

    return (
        <>
            <div className="search-container">
                <form className="search-form">
                    <div className="search-icon">
                        <Search color="rgba(85,85,85,1)" />
                    </div>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        placeholder="Search Streamer"
                    />
                    <button
                        className={`submit-btn ${
                            !Boolean(searchText) ? 'hide' : ''
                        }`}
                        type="button"
                        onClick={() => setSearchText('')}
                    >
                        X
                    </button>
                </form>
            </div>

            <div className="trends">
                <h2>Trends for you</h2>
                <div className="trends-list">
                    {trends.map((trend, i) => {
                        return (
                            <div className="trend" key={trend.title + '-' + i}>
                                <div className="trend__details">
                                    <div className="trend__details__category">
                                        {trend.category}
                                        <span className="trend__details__category--label">
                                            Trending
                                        </span>
                                    </div>
                                    <span className="trend__details__title">
                                        {trend.title}
                                    </span>
                                    <span className="trend__details__tweets-count">
                                        {trend.tweetsCount} Tweets
                                    </span>
                                </div>
                                <button className="more-btn">
                                    {/* <More color="white" /> */}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="follows">
                <h2>Who to follow</h2>
                {/* TODO: Add hardcoded users here */}
                <div className="follows-list"></div>
                <span className="show-more-text">Show more</span>
            </div>
        </>
    );
};
