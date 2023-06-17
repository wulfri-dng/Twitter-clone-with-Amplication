import { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../../context/mainContext';

const Container = styled.div`
    width: 100%;
    height: 70px;
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    background: rgb(29, 155, 240);

    p {
        font-size: 16px;
        color: white;
    }

    h2 {
        font-size: 26px;
        font-weight: 700;
        color: white;
        margin: 6px 0 -3px 0;
    }

    .emptyContainer {
        width: 285px;
    }

    .textContainer {
        width: 600px;
    }

    .buttonContainer {
        display: flex;
        justify-content: flex-end;
        width: 385px;
    }

    .btn {
        width: 80px;
        height: 34px;
        margin: 20px 12px 0 0;
        border-radius: 30px;
        color: black;
        background: white;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
    }

    .login-btn {
        color: white;
        border: 1px solid rgb(255, 255, 255, 0.45);
        margin-bottom: 40px;
        background: rgb(29, 155, 240);
    }
`;

export const GuestLoginSignUpBar = () => {
    const contextData = useContext(MainContext);

    return (
        <Container>
            <div className="emptyContainer"></div>
            <div className="textContainer">
                <h2>Don’t miss what’s happening</h2>
                <p>People on Twitter are the first to know.</p>
            </div>
            <div className="buttonContainer">
                <button
                    onClick={() => {
                        contextData.setLoginPopupVisible(true);
                    }}
                    className="btn login-btn"
                >
                    Log in
                </button>
                <button onClick={() => {contextData.setRegisterPopupVisible(true);}} className="btn">
                    Sign up
                </button>
            </div>
        </Container>
    );
};
