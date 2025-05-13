import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import About from './pages/About';
import Footer from './components/Footer';
import { colors } from './theme';
import InfoContainerComponent from './components/InfoContainer';
import Notes from './pages/Notes';
import NotFound from './pages/NotFound';

const MainContainer = styled.main<{ nightMode: boolean }>`
    background-color: ${props => props.nightMode ? colors.background.dark : colors.background.light};
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
    }
`;

const PageContent = styled.div`
    flex: 1;
`;

const App = () => {
    const [nightMode, setNightMode] = useState(false);
    
    const toggleNightMode = () => {
        setNightMode(!nightMode);
    }

    return (
        <Router>
            <MainContainer nightMode={nightMode}>
                <Header 
                    nightMode={nightMode} 
                    toggleNightMode={toggleNightMode}
                />
                <ContentWrapper>
                    <InfoContainerComponent nightMode={nightMode} />
                    <PageContent>
                        <Routes>
                            <Route path="/" element={<About nightMode={nightMode} />} />
                            <Route path="/notes" element={<Notes nightMode={nightMode} />} />
                            <Route path="*" element={<NotFound nightMode={nightMode} />} />
                        </Routes>
                    </PageContent>
                </ContentWrapper>
                <Footer nightMode={nightMode} />
            </MainContainer>
        </Router>
    );
}

export default App;
