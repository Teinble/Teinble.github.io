import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../theme';
import {FaSchool, FaGithub, FaInstagram, FaLinkedin, FaHome, FaUser, FaEnvelope, FaChevronLeft, FaChevronRight, } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 1rem;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        width: 100%;
        position: relative;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
`;

const ProfileImage = styled.img<{nightMode: boolean}>`
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    padding: 0.2rem;
    border-radius: 15px;
    border: 1px solid ${props => props.nightMode ? colors.background.light : colors.background.dark};
    box-shadow: 0 4px 8px rgba(94, 91, 91, 0.1);
    transition: opacity 0.3s ease;

    @media (max-width: 768px) {
        border-radius: 50%;
        border: 1px solid ${props => props.nightMode ? colors.background.light : colors.background.dark};
        box-shadow: 0 4px 8px rgba(94, 91, 91, 0.1);
        transition: opacity 0.3s ease;
    }
`;

const NavButton = styled.button<{ position: 'left' | 'right', nightMode: boolean }>`
    position: absolute;
    top: 50%;
    ${props => props.position}: 0;
    transform: translateY(-50%);
    background: 'rgba(255, 255, 255, 0.5)';
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${colors.text.light};
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.nightMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
    }

    svg {
        width: 15px;
        height: 15px;
    }
`;

const NameDescriptionContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    gap: 1rem;

    @media (max-width: 768px) {
        gap: 0.5rem;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;

const Text = styled.p`
    font-weight: 500;
    font-size: 1rem;

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
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

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const Pronoun = styled.p`
    font-size: 1rem;
    color: ${colors.text.gray};
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
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
    font-size: 1rem;
    color: ${colors.text.gray};
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 0.6rem;
    }
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

interface InfoContainerProps {
    nightMode: boolean;
}

const InfoContainerComponent = ({ nightMode }: InfoContainerProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require('../assets/profile1.JPG'),
        require('../assets/profile2.JPG'),
        require('../assets/profile3.JPG')
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <InfoContainer>
            <ImageContainer>
                <ProfileImage 
                    nightMode={nightMode} 
                    src={images[currentImageIndex]} 
                    alt="Xiling Zhao profile" 
                />
                <NavButton 
                    position="left" 
                    nightMode={nightMode} 
                    onClick={prevImage}
                >
                    <FaChevronLeft />
                </NavButton>
                <NavButton 
                    position="right" 
                    nightMode={nightMode} 
                    onClick={nextImage}
                >
                    <FaChevronRight />
                </NavButton>
            </ImageContainer>
            <NameDescriptionContainer>
                <NameContainer>
                    <Title>Xiling (Will) Zhao</Title>
                    <Pronoun>He/Him</Pronoun>
                </NameContainer>
                <Text>MScAC 27' @ University of Toronto</Text>
                <Text>Computer Science 25' @ University of Toronto</Text>

                <IconContainer>
                    <Icon icon={<FaSchool />} text="University of Toronto" />
                    <Icon icon={<FaLocationDot />} text="Toronto, ON" />
                    <Icon icon={<FaEnvelope />} text="Email" link="mailto:xiling.zhao@mail.utoronto.ca" />
                    <Icon icon={<FaGithub />} text="Github" link="https://github.com/Teinble" />
                    <Icon icon={<FaInstagram />} text="Instagram" link="https://www.instagram.com/willzhao86/" />
                    <Icon icon={<FaLinkedin />} text="LinkedIn" link="https://www.linkedin.com/in/xilingzhao/" />
                </IconContainer>
            </NameDescriptionContainer>
        </InfoContainer>
    );
};

export default InfoContainerComponent; 