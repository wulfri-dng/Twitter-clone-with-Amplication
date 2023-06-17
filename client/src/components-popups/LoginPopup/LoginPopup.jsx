import axios from 'axios';
import { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../../context/mainContext';

const Container = styled.div`
    width: 300px;
    margin: 15px auto 35px auto;
    height: 465px;

    h2 {
        font-size: 32px;
    }

    form input {
        width: 100%;
        height: 55px;
        border: 1px solid rgb(255, 255, 255, 0.2);
        border-radius: 3px;
        background-color: black;
        padding-left: 8px;
        color: white;
        font-size: 16px;
    }

    form input:nth-child(2) {
        margin-top: 15px;
    }

    form input:focus {
        outline: none !important;
        border: 2px solid rgb(29, 155, 240);
    }

    .bottom-text {
        font-size: 14px;
        display: flex;
        color: #aaa;
    }

    .sign-up-btn {
        color: rgb(29, 155, 240);
    }

    .btn {
        width: 100%;
        height: 40px;
        margin-top: 20px;
        border-radius: 30px;
        color: black;
        background: white;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
    }

    .forgot-password-btn {
        color: white;
        border: 1px solid rgb(255, 255, 255, 0.45);
        background: black;
        margin-bottom: 40px;
    }

    .svgWrapper {
        width: 100%;
        fill: white;
        width: 55px;
        margin: auto;
    }

    .textArea {
        margin: 15px 0 30px 0;
        color: white;
    }
`;

export const LoginPopup = () => {
    const contextData = useContext(MainContext);

    const handleNextClick = (event) => {
        event.preventDefault();
        const userName = event.target.username.value;
        const password = event.target.password.value;

        if (userName && password) {
            try {
                axios
                    .post('/api/user/login', {
                        username: userName,
                        password: password,
                    })
                    .then((response) => {
                        if (response.data.err) {
                            console.log(response.data.errMsg);
                        } else {
                            contextData.setLoggedUser(response.data);
                            contextData.setLoginPopupVisible(false);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <Container>
            <div className="svgWrapper">
                <svg viewBox="0 0 35 35">
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </svg>
            </div>
            <div className="textArea">
                <h2>Sign in to Twitter</h2>
            </div>
            <form onSubmit={handleNextClick}>
                <input type="text" id="username" placeholder="Username" />
                <input type="password" id="password" placeholder="Password" />
                <button className="btn next-btn">Next</button>
            </form>
            <button onClick={() => {}} className="btn forgot-password-btn">
                Forgot password?
            </button>
            <p className="bottom-text">
                Don't have an account?
                <button className="sign-up-btn">
                    <span>Sign up</span>
                </button>
            </p>
        </Container>
    );
};
