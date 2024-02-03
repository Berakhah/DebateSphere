import React, { useState, useEffect } from 'react';
import VoteComponent from './VoteComponent';
import { listArgumentsForDebate } from '../../api/api'; 
import './ArgumentList.css'; 


const ArgumentItem = ({ argument }) => (
    <li className="argument-item">
        <p>{argument.content}</p>
        <div className="vote-section">
            <VoteComponent argumentId={argument.argumentId} />
        </div>
    </li>
);

const ArgumentList = ({ debateId }) => {
    const [argumentList, setArgumentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArguments = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const _arguments = await listArgumentsForDebate(debateId);
                setArgumentList(_arguments);
            } catch (error) {
                setError('Failed to load arguments.');
                console.error('Error fetching arguments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArguments();
    }, [debateId]);

    if (isLoading) return <div>Loading arguments...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="argument-list-container">
            <h2>Arguments</h2>
            {argumentList.length > 0 ? (
                <ul>
                    {argumentList.map((argument) => (
                        <ArgumentItem key={argument.argumentId} argument={argument} />
                    ))}
                </ul>
            ) : (
                <p>No arguments have been submitted yet.</p>
            )}
        </section>
    );
};

export default ArgumentList;
