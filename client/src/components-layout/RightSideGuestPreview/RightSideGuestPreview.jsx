import { useContext } from 'react';
import { MainContext } from '../../context/mainContext';

export const RightSideGuestPreview = () => {
    const contextData = useContext(MainContext);

    return (
        <>
            <div className="userLogin">
                <h2>New to Twitter?</h2>
                <div className="trend__details__category">
                    Sign up now to get your own personalized timeline!
                </div>
                <button
                    onClick={() => {
                        contextData.setRegisterPopupVisible(true);
                    }}
                    className="create-account-btn"
                >
                    Create account
                </button>
            </div>
        </>
    );
};
