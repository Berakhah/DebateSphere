import React, { useState, useEffect } from 'react';
import VoteComponent from './VoteComponent';
import { listArgumentsForDebate } from '../../api/api'; 
import './ArgumentList.css';

const ArgumentItem = ({ argument }) => (
    <li className="argument-item">
        <div className="argument-content">{argument.content}</div>
        <VoteComponent argumentId={argument.id} />
    </li>
);

const ArgumentList = ({ debateId }) => {
    const [argumentList, setArgumentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArguments = async () => {
            setIsLoading(true);
            try {
                const fetchedArguments = await listArgumentsForDebate(debateId);
                setArgumentList(fetchedArguments);
            } catch (err) {
                setError('Failed to load arguments.');
                console.error('Error fetching arguments:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArguments();
    }, [debateId]);

    return (
        <section className="argument-list-container">
            <h2>Arguments</h2>
            {isLoading ? (
                <p>Loading arguments...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : argumentList.length > 0 ? (
                <ul>
                    {argumentList.map((argument) => (
                        <ArgumentItem key={argument.id} argument={argument} />
                    ))}
                </ul>
            ) : (
                <p>No arguments have been submitted yet.</p>
            )}
        </section>
    );
};

export default ArgumentList;
