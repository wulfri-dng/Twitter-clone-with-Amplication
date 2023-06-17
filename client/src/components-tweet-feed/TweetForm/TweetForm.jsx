import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import ProgressRing from '../../shared/Icons/ProgressRing';
import { actions } from './actionDataSchema';
import { Container, Form } from './styles';
import { MainContext } from '../../context/mainContext';

export const TweetForm = ({
    onSubmit,
    className,
    minHeight = 120,
    shouldFocus = false,
    fetchAllTweets,
}) => {
    const contextData = useContext(MainContext);
    const inputRef = useRef(null);
    const [text, setText] = useState('');

    useEffect(() => {
        if (shouldFocus && inputRef.current) inputRef.current.focus();
    }, []);

    const MAX_CHARS = 280;
    const isInputEmpty = !Boolean(text);
    const charsLeft = MAX_CHARS - text.length;
    const maxAlmostReached = charsLeft <= 20;
    const exceededMax = charsLeft < 0;

    const percentage =
        text.length >= MAX_CHARS ? 100 : (text.length / MAX_CHARS) * 100;

    const publishTweet = async () => {
        try {
            await axios
                .post('api/tweet/publish', {
                    userId: contextData.loggedUser.id,
                    dateTime: new Date(),
                    content: text,
                })
                .then((response) => {
                    console.log(response);
                    console.log(fetchAllTweets);

                    if (fetchAllTweets) {
                        fetchAllTweets();
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        if (exceededMax) {
            return alert('Tweet cannot exceed ' + MAX_CHARS + ' characters');
        }

        await publishTweet();

        if (onSubmit) {
            onSubmit(text);
        }

        setText('');
    };

    return (
        <Container>
            <Form
                minHeight={minHeight + 'px'}
                className={className}
                onSubmit={submit}
            >
                <div className="user">{/* TODO: Handle profile pic */}</div>
                <div className="input-section">
                    <textarea
                        ref={inputRef}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={'What is happening?!'}
                        value={text}
                    />
                    <div className="actions">
                        {actions.map((action) => {
                            return (
                                <button
                                    type="button"
                                    disabled={
                                        action.id === 'location' && 'disabled'
                                    }
                                    key={action.id}
                                >
                                    <action.Icon
                                        size={19}
                                        color="var(--theme-color)"
                                    />
                                </button>
                            );
                        })}
                        <div className="right">
                            {!isInputEmpty && (
                                <div className="tweet-length">
                                    <ProgressRing
                                        stroke={2.2}
                                        color={
                                            exceededMax
                                                ? 'red'
                                                : maxAlmostReached
                                                ? '#ffd400'
                                                : 'var(--theme-color)'
                                        }
                                        radius={maxAlmostReached ? 19 : 14}
                                        progress={percentage}
                                    />
                                    {maxAlmostReached && (
                                        <span
                                            className={`tweet-length__text ${
                                                exceededMax ? 'red' : ''
                                            }`}
                                        >
                                            {charsLeft}
                                        </span>
                                    )}
                                </div>
                            )}
                            {!isInputEmpty && <hr className="divider" />}
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isInputEmpty}
                            >
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </Container>
    );
};
