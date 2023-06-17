import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Bell from '../../shared/Icons/Bell';
import Group from '../../shared/Icons/Group';
import Home from '../../shared/Icons/Home';
import Hashtag from '../../shared/Icons/Hashtag';
import Mail from '../../shared/Icons/Mail';
import Bookmark from '../../shared/Icons/Bookmark';
import User from '../../shared/Icons/User';
import More from '../../shared/Icons/More';
import Twitter from '../../shared/Icons/Twitter';
import { MainContext } from '../../context/mainContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    height: 100%;

    .header {
        padding: 15px;
    }

    .buttons {
        margin-top: 5px;
        max-width: 200px;

        a,
        button {
            display: block;
            margin-bottom: 12px;
            color: white;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            border-radius: 30px;
            font-size: 18px;
            padding-right: 25px;
            text-decoration: none;
            --icon-size: 25px;

            .btn--icon {
                margin-right: 15px;
                height: var(--icon-size);
                width: var(--icon-size);

                position: relative;
                .notifications-count {
                    position: absolute;
                    font-size: 11px;
                    /* min-width: 14px; */
                    background-color: var(--theme-color);
                    top: -5px;
                    padding: 1px 5px;
                    border-radius: 10px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    width: max-content;
                }
            }

            &.active {
                font-weight: bold;

                img {
                    --size: 27px;
                }
            }

            &:hover {
                background-color: #333;
            }

            &.btn--home {
                position: relative;
                &.new-tweets::after {
                    content: '';
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    left: 35px;
                    top: 7px;
                    border-radius: 50%;
                    background-color: var(--theme-color);
                }
            }

            &.btn--more {
                svg {
                    border: 1px solid #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }

    .tweet-btn {
        background-color: var(--theme-color);
        margin-top: 10px;
        border-radius: 30px;
        color: white;
        text-align: center;
        padding: 15px 0;
        font-size: 16px;
    }

    .profile-section {
        margin-top: auto;
        margin-bottom: 20px;
        padding: 10px;
        display: flex;
        text-align: left;
        align-items: center;
        justify-content: space-between;
        border-radius: 30px;

        &:hover {
            background-color: #333;
        }

        .details {
            display: flex;
            align-items: center;
            &__img {
                margin-right: 10px;
                width: 40px;
                border-radius: 50%;
                height: 40px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            &__text {
                span {
                    display: block;
                }

                &__name {
                    color: white;
                    font-size: 16px;
                    font-weight: bold;
                }

                &__id {
                    font-size: 14px;
                    margin-top: 2px;
                    color: #aaa;
                }
            }
        }
    }
`;

export const LeftSide = ({ onClickTweet }) => {
    const location = useLocation();
    const user = useContext(MainContext);
    const [newNotifications, setNewNotifications] = useState(0);

    const menus = [
        {
            id: 'home',
            label: 'Home',
            link: '/home',
            visible: user.loggedUser ? true : false,
            Icon: Home,
        },
        {
            id: 'explore',
            label: 'Explore',
            visible: true,
            Icon: Hashtag,
        },
        {
            id: 'communities',
            label: 'Communities',
            visible: user.loggedUser ? true : false,
            Icon: Group,
        },
        {
            id: 'notifications',
            label: 'Notifications',
            Icon: Bell,
            link: '/notifications',
            value: newNotifications,
            visible: user.loggedUser ? true : false,
            onClick: () => setNewNotifications(0),
        },
        {
            id: 'messages',
            label: 'Messages',
            visible: user.loggedUser ? true : false,
            Icon: Mail,
        },
        {
            id: 'bookmarks',
            label: 'Bookmarks',
            visible: user.loggedUser ? true : false,
            Icon: Bookmark,
        },
        {
            id: 'profile',
            label: 'Profile',
            visible: user.loggedUser ? true : false,
            Icon: User,
        },
    ];

    return (
        <Container>
            <Link to="/" className="header">
                <Twitter color="white" size={25} />
            </Link>
            <div className="buttons">
                {menus.map((menu, index) => {
                    const isActiveLink =
                        location.pathname === `/${menu.id}` ||
                        menu.id === 'profile';

                    return (
                        <React.Fragment key={index}>
                            {menu.visible && (
                                <Link
                                    to={menu.link ?? '#'}
                                    className={`btn--${menu.id} new-tweets ${
                                        isActiveLink ? 'active' : ''
                                    }`}
                                    key={menu.id}
                                    onClick={menu.onClick}
                                >
                                    <div className="btn--icon">
                                        {newNotifications &&
                                        menu.id === 'notifications' ? (
                                            <span className="notifications-count">
                                                {newNotifications}
                                            </span>
                                        ) : null}
                                        <menu.Icon
                                            fill={isActiveLink}
                                            color="white"
                                            size={25}
                                        />
                                    </div>
                                    <span>{menu.label}</span>
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
                <button className="btn--more">
                    <div className="btn--icon">
                        <More color="white" size={20} />
                    </div>
                    <span>More</span>
                </button>
            </div>
            {user.loggedUser && (
                <>
                    <button onClick={onClickTweet} className="tweet-btn">
                        Tweet
                    </button>
                    <button className="profile-section">
                        <div className="details">
                            <div className="details__img"></div>
                            <div className="details__text"></div>
                        </div>
                        <div>
                            <More color="white" />
                        </div>
                    </button>
                </>
            )}
        </Container>
    );
};
