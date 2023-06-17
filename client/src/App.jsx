import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage } from './components-home-page';
import { MainContext } from './context/mainContext';
import { useState } from 'react';

export const App = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);
    const [registerPopupVisible, setRegisterPopupVisible] = useState(false);
    const [
        unauthorizedLikePopupVisibility,
        setUnauthorizedLikePopupVisibility,
    ] = useState({
        commentPopup: false,
        retweetPopup: false,
        likePopup: false,
    });

    return (
        <MainContext.Provider
            value={{
                loggedUser,
                loginPopupVisible,
                registerPopupVisible,
                unauthorizedLikePopupVisibility,
                setLoggedUser,
                setLoginPopupVisible,
                setRegisterPopupVisible,
                setUnauthorizedLikePopupVisibility,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                </Routes>
            </BrowserRouter>
        </MainContext.Provider>
    );
};
