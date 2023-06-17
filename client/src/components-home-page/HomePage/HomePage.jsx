import { useContext, useState } from 'react';
import { Layout } from '../../components-layout';
import { HomeContent } from '../HomeContent/HomeContent.jsx';
import { MainContext } from '../../context/mainContext';
import { Modal } from '../../shared';
import { LoginPopup, SignUpPopup } from '../../components-popups';
import { GuestLoginSignUpBar } from '../GuestLoginSignUpBar/GuestLoginSignUpBar';
import axios from 'axios';

export const HomePage = () => {
    const contextData = useContext(MainContext);
    const [tweetList, setTweetList] = useState([]);

    const onClickOutside = () => {
        contextData.setLoginPopupVisible(false);
        contextData.setRegisterPopupVisible(false);
    };

    const fetchAllTweets = () => {
        try {
            axios.get('api/tweet/getAll').then((response) => {
                if (response?.data) {
                    setTweetList(response.data);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Layout fetchAllTweets={fetchAllTweets}>
                <HomeContent
                    tweetList={tweetList}
                    fetchAllTweets={fetchAllTweets}
                />
            </Layout>
            {contextData.loginPopupVisible && (
                <Modal onClickOutside={onClickOutside}>
                    <LoginPopup />
                </Modal>
            )}
            {contextData.registerPopupVisible && (
                <Modal onClickOutside={onClickOutside}>
                    <SignUpPopup />
                </Modal>
            )}
            {!contextData.loggedUser && <GuestLoginSignUpBar />}
        </>
    );
};
