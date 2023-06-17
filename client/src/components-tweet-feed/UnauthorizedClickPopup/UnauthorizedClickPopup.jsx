import { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../../context/mainContext';

const Container = styled.div`
    width: 400px;
    margin: auto;
    height: 400px;
    margin-top: 30px;

    h2 {
        font-size: 28px;
    }

    .popup {
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
        }
    }

    .btn {
        width: 100%;
        margin-top: 20px;
        border-radius: 30px;
        color: black;
        text-align: center;
        padding: 15px 0;
        font-size: 16px;
        font-weight: 700;
    }

    .login-btn {
        background: rgb(29, 155, 240);
        color: white;
    }

    .register-btn {
        color: rgb(29, 155, 240);
        border-color: red;
        border: 1px solid white;
    }

    .svgWrapper {
        width: 100%;
    }

    .bottom-icon {
        font-family: 'Roboto', sans-serif;
        fill: ${(props) => props.svgColor};
        width: 55px;
        margin: auto;
    }

    .textArea {
        margin: 35px 0;
    }
`;

const popupDataScheme = {
    commentData: {
        svgPath:
            'M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z',
        color: 'rgb(29, 155, 240)',
    },
    retweetData: {
        svgPath:
            'M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z',
        color: 'rgb(0, 186, 124)',
    },
    likeData: {
        svgPath:
            'M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z',
        color: 'rgb(249, 24, 128)',
    },
};

export const UnauthorizedClickPopup = ({ popupType }) => {
    const contextData = useContext(MainContext);

    let selectedDataSet = {};

    if (popupType === 'comment') {
        selectedDataSet = popupDataScheme.commentData;
    } else if (popupType === 'retweet') {
        selectedDataSet = popupDataScheme.retweetData;
    } else if (popupType === 'like') {
        selectedDataSet = popupDataScheme.likeData;
    }

    const resetPopups = () => {
        contextData.setUnauthorizedLikePopupVisibility((prev) => {
            return {
                ...prev,
                commentPopup: false,
                retweetPopup: false,
                likePopup: false,
            };
        });
    };

    return (
        <Container svgColor={selectedDataSet.color}>
            <div className="svgWrapper bottom-icon">
                <svg viewBox="0 0 24 24">
                    <path d={selectedDataSet.svgPath}></path>
                </svg>
            </div>
            <div className="textArea">
                <h2>Like a Tweet to share the love.</h2>
                <span className="popup__details__category">
                    Join Twitter now to let Daily Loud know you like their
                    Tweet.
                </span>
            </div>
            <button
                onClick={() => {
                    resetPopups();
                    contextData.setLoginPopupVisible(true);
                }}
                className="btn login-btn"
            >
                Log in
            </button>
            <button
                onClick={() => {
                    resetPopups();
                    contextData.setRegisterPopupVisible(true);
                }}
                className="btn register-btn"
            >
                Sign up
            </button>
        </Container>
    );
};
