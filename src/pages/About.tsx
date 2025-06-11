import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';

const AboutContainer = styled.div<{ nightMode: boolean }>`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: ${props => props.nightMode ? colors.text.dark : colors.text.light};
    display: flex;
    gap: 2rem;
`;

const ContentContainer = styled.div`
    flex: 1;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

const Section = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const EducationItem = styled.div`
    margin-bottom: 1.5rem;
`;

const SchoolName = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const Program = styled.p`
    font-style: italic;
    margin-bottom: 0.5rem;
`;

const Detail = styled.p`
    margin: 0.25rem 0;
    color: ${colors.text.gray};
`;

const SkillsSection = styled.div`
    margin-bottom: 2rem;
`;

const SkillsCategory = styled.h3`
    font-size: 1.2rem;
    margin: 1.5rem 0 1rem;
    color: ${colors.text.gray};
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
`;

const SkillItem = styled.div<{ nightMode: boolean }>`
    background-color: ${props => props.nightMode ? colors.background.dark : colors.background.light};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: 1px solid ${props => props.nightMode ? colors.border.dark : colors.border.light};
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;

const InterestParagraph = styled.p`
    margin-bottom: 1.5rem;
    line-height: 1.6;
`;

const Highlight = styled.span`
    color: ${colors.primary.main};
    font-weight: 600;
`;

const InterestSection = styled.div`
    margin-bottom: 2rem;
`;

const InterestTitle = styled.h3`
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: ${colors.text.gray};
`;

const WorkItem = styled.div<{ nightMode: boolean }>`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: ${props => props.nightMode ? colors.background.dark : colors.background.light};
    border-radius: 8px;
    border: 1px solid ${props => props.nightMode ? colors.border.dark : colors.border.light};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const CompanyName = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${colors.primary.main};
`;

const Position = styled.p`
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

const Duration = styled.p`
    color: ${colors.text.gray};
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

const WorkDescription = styled.ul`
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;
`;

const WorkListItem = styled.li`
    margin-bottom: 0.5rem;
    line-height: 1.5;
`;

interface AboutProps {
    nightMode: boolean;
}

const About = ({ nightMode }: AboutProps) => {
    return (
        <AboutContainer nightMode={nightMode}>
            <ContentContainer>
                <Title>About Me</Title>
                <Section>
                    <p>Hello! My name is Xiling, you can also call me <strong>Will</strong>! </p>
                    <p>I was born in Beijing, China. I came to Canada to pursue my studies in 2019.</p>
                    <p>Let's collaborate and code the future together!</p>
                </Section>

                <Section>
                    <SectionTitle>🎓 Education</SectionTitle>
                    <EducationItem>
                        <SchoolName>University of Toronto, St. George</SchoolName>
                        <Program>Master of Applied Science in Computer Science (Sep 2025 - July 2027)</Program>
                        <Program>Honours Bachelor of Science in Computer Science (Sep 2021 - June 2025) </Program>
                        <Detail>cGPA: 3.94/4.00</Detail>
                        <Detail>Achievements: Dean's List Scholar x 4</Detail>
                        <Detail>
                            Courses Taken: Natural Language Processing, Operating System, Neural Nets and Deep Learning, Computer Networks, 
                            Algorithm Design & Analysis, Software Engineering, Introduction to Databases, and more.
                        </Detail>
                    </EducationItem>
                </Section>

                <Section>
                    <SectionTitle>💼 Work Experience</SectionTitle>
                    <WorkItem nightMode={nightMode}>
                        <CompanyName>Beijing Xiaomi Mobile Software Co., Ltd.</CompanyName>
                        <Position>Software Engineer Intern</Position>
                        <Duration>May 2024 - Aug 2024</Duration>
                        <WorkDescription>
                            <WorkListItem>
                                Engineered the development of the IoT department's first Large Language Model (LLM) evaluation system, adopted by a team over 10 engineers, integrating <strong>DeepEval</strong> for metrics collection and <strong>LangChain</strong> for judging and testing model encapsulation to evaluate Retrieval-Augmented Generation (RAG) models
                            </WorkListItem>
                            <WorkListItem>
                                Generated and evaluated <strong>5,000</strong> test cases from official IoT developer platform documentations to assess RAG system performance across six dimensions
                            </WorkListItem>
                        </WorkDescription>
                    </WorkItem>

                    <WorkItem nightMode={nightMode}>
                        <CompanyName>IQBank</CompanyName>
                        <Position>Full Stack Engineering, Team Lead</Position>
                        <Duration>September 2023 - April 2024</Duration>
                        <WorkDescription>
                            <WorkListItem>
                                Presented at the University of Toronto's <strong>Applied Research in Action (ARIA)</strong> showcase, featuring over 150 student-led R\&D projects
                            </WorkListItem>
                            <WorkListItem>
                                Implemented robust software architecture ensuring system reliability and scalability
                            </WorkListItem>
                            <WorkListItem>
                                Mentored junior developers and conducted code reviews to maintain code quality
                            </WorkListItem>
                            <WorkListItem>
                                A demo version available at <a href="https://demo.iqbank.xyz/" target="_blank" rel="noopener noreferrer">here</a>
                            </WorkListItem>
                        </WorkDescription>
                    </WorkItem>
                </Section>

                <Section>
                    <SectionTitle>🎯 Research Interests</SectionTitle>
                    <InterestSection>
                        <InterestTitle>Primary Focus: Computational Linguistics & NLP</InterestTitle>
                        <InterestParagraph>
                            Driven by my passion for creating AI systems that accurately understand and generate human language, 
                            my primary research interest lies in <Highlight>Computational Linguistics</Highlight> and 
                            <Highlight>Natural Language Processing (NLP)</Highlight>. This interest has been cultivated through 
                            previous coursework, projects, and internship experiences.
                        </InterestParagraph>
                        <InterestParagraph>
                            While transformer models like <Highlight>ChatGPT</Highlight> have significantly advanced NLP, 
                            barriers such as high computational costs and limited resources still prevent underfunded enterprises 
                            from leveraging these technologies. I'm passionate about making NLP technologies 
                            more <Highlight>efficient</Highlight> and <Highlight>scalable</Highlight> to facilitate their widespread adoption.
                        </InterestParagraph>
                    </InterestSection>

                    <InterestSection>
                        <InterestTitle>Secondary Focus: Software Engineering</InterestTitle>
                        <InterestParagraph>
                            My secondary interest is in <Highlight>Software Engineering</Highlight>, particularly in areas like <Highlight>software reliability</Highlight> and <Highlight>fault tolerance</Highlight>. 
                            I've developed expertise in ensuring system robustness and maintainability while leading a 15-member team for the <Highlight>IQBank project</Highlight>.
                            expertise in ensuring system robustness and maintainability while leading a 15-member team for the <Highlight>IQBank project</Highlight>.
                        </InterestParagraph>
                        <InterestParagraph>
                            As AI increasingly intersects with software engineering, evident in emerging trends like 
                            Cursor and MLOps, I'm enthusiastic about creating reliable systems that support cutting-edge AI technologies.
                        </InterestParagraph>
                    </InterestSection>
                </Section>

                <Section>
                    <SectionTitle>✨ Skills</SectionTitle>
                    <SkillsSection>
                        <SkillsCategory>Programming Languages</SkillsCategory>
                        <SkillsGrid>
                            <SkillItem nightMode={nightMode}>Python</SkillItem>
                            <SkillItem nightMode={nightMode}>Java</SkillItem>
                            <SkillItem nightMode={nightMode}>C</SkillItem>
                            <SkillItem nightMode={nightMode}>TypeScript</SkillItem>
                            <SkillItem nightMode={nightMode}>PostgreSQL</SkillItem>
                            <SkillItem nightMode={nightMode}>HTML/CSS</SkillItem>
                        </SkillsGrid>

                        <SkillsCategory>Frameworks and Libraries</SkillsCategory>
                        <SkillsGrid>
                            <SkillItem nightMode={nightMode}>React</SkillItem>
                            <SkillItem nightMode={nightMode}>React Native</SkillItem>
                            <SkillItem nightMode={nightMode}>Tailwind CSS</SkillItem>
                            <SkillItem nightMode={nightMode}>DeepEval</SkillItem>
                            <SkillItem nightMode={nightMode}>LangChain</SkillItem>
                            <SkillItem nightMode={nightMode}>HuggingFace</SkillItem>
                            <SkillItem nightMode={nightMode}>Django</SkillItem>
                            <SkillItem nightMode={nightMode}>PyTorch</SkillItem>
                            <SkillItem nightMode={nightMode}>Numpy</SkillItem>
                            <SkillItem nightMode={nightMode}>Scipy</SkillItem>
                            <SkillItem nightMode={nightMode}>Scikit-learn</SkillItem>
                            <SkillItem nightMode={nightMode}>Pandas</SkillItem>
                            <SkillItem nightMode={nightMode}>Streamlit</SkillItem>
                        </SkillsGrid>

                        <SkillsCategory>Tools</SkillsCategory>
                        <SkillsGrid>
                            <SkillItem nightMode={nightMode}>LATEX</SkillItem>
                            <SkillItem nightMode={nightMode}>Git</SkillItem>
                            <SkillItem nightMode={nightMode}>Linux</SkillItem>
                            <SkillItem nightMode={nightMode}>Docker</SkillItem>
                            <SkillItem nightMode={nightMode}>Anaconda</SkillItem>
                            <SkillItem nightMode={nightMode}>Prisma</SkillItem>
                            <SkillItem nightMode={nightMode}>Figma</SkillItem>
                            <SkillItem nightMode={nightMode}>Selenium</SkillItem>
                            <SkillItem nightMode={nightMode}>BeautifulSoup</SkillItem>
                        </SkillsGrid>
                    </SkillsSection>
                </Section>

                <Section>
                    <SectionTitle>🎉 Hobbies</SectionTitle>
                    <List>
                        <ListItem>🏂 Snowboarding</ListItem>
                        <ListItem>🏋️ Fitness</ListItem>
                        <ListItem>📺 Watching TV Shows (Better Call Saul is my favorite!)</ListItem>
                        <ListItem>🍳 Cooking</ListItem>
                    </List>
                </Section>
            </ContentContainer>
        </AboutContainer>
    );
};

export default About; 