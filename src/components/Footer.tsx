import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';

const FooterContainer = styled.footer<{ nightMode: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0.4rem;
    text-align: center;
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
    font-size: 0.7rem;
    border-top: 1px solid ${props => props.nightMode ? colors.border.dark : colors.border.light};
`;

interface FooterProps {
    nightMode: boolean;
}

const Footer = ({ nightMode }: FooterProps) => {
    const currentYear = new Date().getFullYear();
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <FooterContainer nightMode={nightMode}>
            <p>© {currentYear} Xiling Zhao. All rights reserved.</p>
            <p>Last updated: {lastUpdated}</p>
        </FooterContainer>
    );
};

export default Footer; 