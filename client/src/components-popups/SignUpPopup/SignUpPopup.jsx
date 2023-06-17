import axios from 'axios';
import styled from 'styled-components';
import { useContext } from 'react';
import { useState } from 'react';
import { MainContext } from '../../context/mainContext';

const Container = styled.div`
    width: 420px;
    margin: 15px auto 35px auto;
    height: 695px;

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
        margin: 20px 0;
    }

    form input:nth-child(3) {
        margin-bottom: 20px;
    }

    form input:focus {
        outline: none !important;
        border: 2px solid rgb(29, 155, 240);
    }

    .dateSection {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    form select {
        height: 55px;
        background-color: black;
        border: 1px solid rgb(255, 255, 255, 0.2);
        border-radius: 3px;
        color: white;
        padding: 0 8px;
    }

    form select:hover {
        cursor: pointer;
    }

    form select:focus {
        outline: none !important;
        border: 2px solid rgb(29, 155, 240);
    }

    form select:nth-child(1) {
        flex-grow: 5;
        margin-right: 13px;
    }

    form select:nth-child(2) {
        flex-grow: 2;
        margin-right: 13px;
    }

    form select:nth-child(3) {
        flex-grow: 3;
    }

    .helper-title {
        margin-top: 20px;
        font-size: 16px;
        display: flex;
        color: white;
        font-weight: 500;
    }

    .helper-text {
        margin-top: 5px;
        margin-bottom: 20px;
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

export const SignUpPopup = () => {
    const contextData = useContext(MainContext);
    const [dateOptionList, setDateOptionList] = useState([]);

    const handleMonthSelect = (event) => {
        const dateOptionListTemp = [];

        const selectedMonth = Number(event.target.value);
        const monthNumbsWithMaxDates = [1, 3, 4, 5, 8, 10, 12];

        if (selectedMonth === 4) {
            for (let i = 0; i < 28; i++) {
                dateOptionListTemp.push(i + 1);
            }
        } else if (monthNumbsWithMaxDates.includes(selectedMonth)) {
            for (let i = 0; i < 31; i++) {
                dateOptionListTemp.push(i + 1);
            }
        } else {
            for (let i = 0; i < 30; i++) {
                dateOptionListTemp.push(i + 1);
            }
        }

        setDateOptionList(dateOptionListTemp);
    };

    const renderYears = () => {
        const yearList = [];

        for (let i = 2023; i >= 1903; i--) {
            yearList.push(i);
        }

        return yearList.map((year) => {
            return <option value={year}>{year}</option>;
        });
    };

    const renderBirthdayDates = () => {
        return (
            <div className="dateSection">
                <select name="month" id="month" onChange={handleMonthSelect}>
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select name="date" id="date">
                    <option value="">Date</option>
                    {dateOptionList.length > 0 &&
                        dateOptionList.map((date) => {
                            return <option value={date}>{date}</option>;
                        })}
                </select>
                <select name="year" id="year">
                    <option value="">Year</option>
                    {renderYears()}
                </select>
            </div>
        );
    };

    const handleNextClick = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const month = event.target.month.value;
        const date = event.target.date.value;
        const year = event.target.year.value;

        if (name && username && email && password && month && date && year) {
            try {
                axios
                    .post('/api/user/register', {
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                        month: month,
                        date: date,
                        year: year,
                    })
                    .then((response) => {
                        if (response.data.err) {
                            console.log(response.data.errMsg);
                        } else {
                            contextData.setLoggedUser(response.data);
                            contextData.setRegisterPopupVisible(false);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('Please fill all the fields');
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
                <h2>Create your account</h2>
            </div>
            <form onSubmit={handleNextClick}>
                <input type="text" id="name" placeholder="Name" />
                <input type="text" id="username" placeholder="Username" />
                <input type="text" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <div>
                    <p className="helper-title">Date of birth</p>
                    <p className="helper-text">
                        This will not be shown publicly. Confirm your own age,
                        even if this account is for a business, a pet, or
                        something else.
                    </p>
                    {renderBirthdayDates()}
                </div>
                <button className="btn next-btn">Next</button>
            </form>
            <button onClick={() => {}} className="btn forgot-password-btn">
                Forgot password?
            </button>
        </Container>
    );
};
