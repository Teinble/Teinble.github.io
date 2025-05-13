import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { colors } from './theme';

const HeaderContainer = styled.div<{ nightMode: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.nightMode ? colors.background.dark : colors.background.light};
    padding: 10px 20px;
    border-bottom: 1px solid ${props => props.nightMode ? colors.border.dark : colors.border.light};
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
    position: relative;
`;

const Nav = styled.nav<{ isOpen: boolean; nightMode: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        right: ${props => props.isOpen ? '0' : '-100%'};
        height: 100vh;
        width: 250px;
        background-color: ${props => props.nightMode ? colors.background.dark : colors.background.light};
        flex-direction: column;
        padding: 60px 20px 20px;
        transition: right 0.3s ease;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        z-index: 2;
    }
`;

const HeaderItem = styled(Link)<{ active?: boolean; nightMode: boolean }>`
    text-decoration: none;
    color: ${props => props.active 
        ? colors.primary.main 
        : props.nightMode ? colors.text.dark : colors.text.light};
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: ${props => props.active ? '500' : 'normal'};

    &:hover {
        background-color: ${props => props.nightMode ? colors.hover.dark : colors.hover.light};
        color: ${props => props.active ? colors.primary.main : colors.primary.light};
    }

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        padding: 10px;
    }
`;

const ThemeButton = styled.button<{ nightMode: boolean }>`
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
    transition: all 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${props => props.nightMode ? colors.hover.dark : colors.hover.light};
        color: ${colors.primary.main};
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

const MenuButton = styled(ThemeButton)`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
    }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
    display: none;
    
    @media (max-width: 768px) {
        display: ${props => props.isOpen ? 'block' : 'none'};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
`;

const CloseButton = styled(ThemeButton)`
    position: absolute;
    top: 20px;
    right: 20px;
    display: none;

    @media (max-width: 768px) {
        display: flex;
    }
`;

const ProfileButton = styled.button<{ nightMode: boolean }>`
    display: none;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid ${props => props.nightMode ? colors.border.dark : colors.border.light};
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    background: none;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        border-color: ${colors.primary.main};
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        display: block;
    }
`;

const Title = styled.h1`
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
`;

interface HeaderItemProps {
    to: string;
    text: string;
    nightMode: boolean;
    onClick?: () => void;
}

const HeaderLink = ({to, text, nightMode, onClick}: HeaderItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <HeaderItem to={to} active={isActive} nightMode={nightMode} onClick={onClick}>{text}</HeaderItem>
    )
}

interface HeaderProps {
    nightMode: boolean;
    toggleNightMode: () => void;
}

const Header = ({nightMode, toggleNightMode}: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <HeaderContainer nightMode={nightMode}>
                <Title>Xiling Zhao's Site</Title>
                <MenuButton onClick={toggleMenu} nightMode={nightMode}>
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </MenuButton>
                <Nav isOpen={isMenuOpen} nightMode={nightMode}>
                    <CloseButton onClick={closeMenu} nightMode={nightMode}>
                        <FiX />
                    </CloseButton>
                    <HeaderLink to="/" text="About" nightMode={nightMode} onClick={closeMenu} />
                    <HeaderLink to="/notes" text="My Notes" nightMode={nightMode} onClick={closeMenu} />
                    <ThemeButton onClick={toggleNightMode} nightMode={nightMode}>
                        {nightMode ? <FiSun /> : <FiMoon />}
                    </ThemeButton>
                </Nav>
            </HeaderContainer>
            <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        </>
    )
}

export default Header;