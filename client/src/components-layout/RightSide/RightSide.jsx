import { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../../context/mainContext';
import { RightSideUserPreview } from '../RightSideUserPreview/RightSideUserPreview';
import { RightSideGuestPreview } from '../RightSideGuestPreview/RightSideGuestPreview';

const Container = styled.div`
    padding: 0 15px 15px;

    .search-container {
        z-index: 1;
        position: sticky;
        background-color: black;
        width: var(--right);
        padding-right: 30px;
        top: 0;
        padding-top: 15px;
        padding-bottom: 10px;

        .search-form {
            width: 100%;
            position: relative;

            .search-icon {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto 0;
                left: 15px;
                width: 18px;
                height: 18px;
            }

            input {
                width: 100%;
                background: none;
                border: none;
                background-color: #222;
                font-size: 15px;
                padding: 15px 50px;
                border-radius: 30px;
                color: white;

                &:focus {
                    outline: none;
                    border: 1px solid var(--theme-color);
                    background-color: black;
                }
            }

            .submit-btn {
                &.hide {
                    display: none;
                }

                position: absolute;
                right: 15px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                background-color: var(--theme-color);
                color: black;
                border-radius: 50%;
                height: 25px;
                width: 25px;
                font-weight: bold;
            }
        }
    }

    .trends,
    .userLogin,
    .follows {
        background-color: #222;
        border-radius: 20px;
        padding: 15px;

        h2 {
            font-size: 20px;
            color: white;
        }
    }

    .trends,
    .userLogin {
        margin-top: 10px;
        &-list {
            margin-top: 30px;
        }

        .trend {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;

            &__details {
                &__category {
                    font-size: 13px;
                    display: flex;
                    color: #aaa;

                    &--label {
                        margin-left: 20px;
                        position: relative;

                        &::after {
                            content: '';
                            width: 2px;
                            height: 2px;
                            background-color: #aaa;
                            border-radius: 50%;
                            left: -10px;
                            top: 0;
                            bottom: 0;
                            margin: auto 0;
                            position: absolute;
                        }
                    }
                }

                &__title {
                    font-weight: bold;
                    color: white;
                    font-size: 16px;
                    margin: 2px 0;
                    display: block;
                }

                &__tweets-count {
                    color: #aaa;
                    font-size: 12px;
                }
            }

            .more-btn {
                opacity: 0.5;
            }
        }

        .sticky {
            z-index: 1;
            position: sticky;
        }
    }

    .follows {
        margin-top: 20px;
        &-list {
            margin-top: 30px;
        }

        .user {
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;

            &__details {
                display: flex;
                text-decoration: none;
            }

            &__img {
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 50%;
                margin-right: 10px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            &__name {
                font-weight: bold;
                font-size: 16px;
                color: white;
            }

            &__id {
                color: #aaa;
                font-size: 14px;
                margin-top: 2px;
            }
        }

        .show-more-text {
            font-size: 14px;
            color: var(--theme-color);
        }
    }

    .create-account-btn {
        background-color: white;
        width: 100%;
        margin-top: 20px;
        border-radius: 30px;
        color: black;
        text-align: center;
        padding: 15px 0;
        font-size: 16px;
        font-weight: 700;
    }
`;

export const RightSide = () => {
    const user = useContext(MainContext);

    return (
        <Container>
            {user.loggedUser && <RightSideUserPreview />}
            {!user.loggedUser && <RightSideGuestPreview />}
        </Container>
    );
};
