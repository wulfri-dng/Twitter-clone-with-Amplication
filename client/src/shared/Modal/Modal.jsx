import styled from 'styled-components';
import Close from '../Icons/Close';

const Container = styled.div`
    position: fixed;
    z-index: 6;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 30px 0;
    left: 0;
    top: 0;

    .modal {
        position: relative;
        background-color: black;
        border-radius: 20px;
        margin-top: 20px;
        padding: 15px;
        width: 600px;
        height: max-content;
        z-index: 10;

        .close-btn {
            position: relative;
            left: -10px;
        }
    }
`;

const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.2);
`;

export const Modal = ({ children, onClickOutside }) => {
    return (
        <Container>
            <Backdrop onClick={() => onClickOutside()} />
            <div className={'modal'}>
                <button onClick={onClickOutside} className="close-btn">
                    <Close color="white" size={24} />
                </button>
                {children}
            </div>
        </Container>
    );
};
