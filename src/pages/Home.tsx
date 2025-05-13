import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import InfoContainerComponent from '../components/InfoContainer';

const HomeContainer = styled.div<{ nightMode: boolean }>`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 25%;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const NameDescriptionContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    gap: 1rem;
`;

const Text = styled.p`
    font-weight: 500;
    font-size: 1rem;
`;

const ProfileImage = styled.img<{nightMode: boolean}>`
    width: 90%;
    aspect-ratio: 1/1;
    object-fit: cover;
    padding: 0.2rem;
    border-radius: 15px;
    border: 1px solid ${props => props.nightMode ? colors.background.light : colors.background.dark};
    box-shadow: 0 4px 8px rgba(94, 91, 91, 0.1);
`;

const NameContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    svg {
        width: 1rem;
        height: 1rem;
    }
`;

const IconText = styled.p`
    font-size: 1 rem;
    color: ${colors.text.gray};
    font-weight: 700;
`;

const Icon = ({icon, text, link = ""}: {icon: React.ReactNode, text: string, link?: string}) => {
    return (
        <IconWrapper>
            {icon}
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <IconText>{text}</IconText>
                </a>
            ) : (
                <IconText>{text}</IconText>
            )}
        </IconWrapper>
    )
}

interface HomeProps {
    nightMode: boolean;
}

const Home = ({ nightMode }: HomeProps) => {
    return (
        <HomeContainer nightMode={nightMode}>
            {/* <InfoContainerComponent nightMode={nightMode} /> */}
        </HomeContainer>
    );
};

export default Home; 