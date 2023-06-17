import { useState } from 'react';
import Search from '../../shared/Icons/Search';

export const RightSideUserPreview = () => {
    const [searchText, setSearchText] = useState('');

    // TODO: Update trends
    const trends = [
        {
            title: 'iPhone 12',
            tweetsCount: '11.6k',
            category: 'Technology',
        },
        {
            title: 'LinkedIn',
            tweetsCount: '51.1K',
            category: 'Business & finance',
        },
        {
            title: 'John Cena',
            tweetsCount: '1,200',
            category: 'Sports',
        },
        {
            title: '#Microsoft',
            tweetsCount: '3,022',
            category: 'Business & finance',
        },
        {
            title: '#DataSciencve',
            tweetsCount: '18.6k',
            category: 'Technology',
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
