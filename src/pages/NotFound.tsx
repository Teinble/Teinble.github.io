import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div<{ nightMode: boolean }>`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
`;

const ErrorCode = styled.h1`
    font-size: 8rem;
    font-weight: 700;
    margin: 0;
    color: ${colors.primary.main};
    line-height: 1;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin: 1rem 0;
`;

const Message = styled.p`
    font-size: 1.2rem;
    color: ${colors.text.gray};
    margin-bottom: 2rem;
    max-width: 600px;
`;

const HomeButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: ${colors.primary.main};
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.primary.dark};
        transform: translateY(-2px);
    }
`;

interface NotFoundProps {
    nightMode: boolean;
}

const NotFound = ({ nightMode }: NotFoundProps) => {
    return (
        <NotFoundContainer nightMode={nightMode}>
            <ErrorCode>404</ErrorCode>
            <Title>Page Not Found</Title>
            <Message>
                Oops! The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
            </Message>
            <HomeButton to="/">
                ← Back to Home
            </HomeButton>
        </NotFoundContainer>
    );
};

export default NotFound; 