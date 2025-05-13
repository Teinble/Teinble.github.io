import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme';

const NotesContainer = styled.div<{ nightMode: boolean }>`
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

const Explanation = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const Section = styled.section`
    margin-bottom: 2rem;
`;

const NoteItem = styled.div<{ nightMode: boolean }>`
    background-color: ${props => props.nightMode ? colors.background.dark : colors.background.light};
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid ${props => props.nightMode ? colors.border.dark : colors.border.light};
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const CourseTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${colors.primary.main};
`;

const CourseCode = styled.span`
    font-size: 1rem;
    color: ${colors.text.gray};
    margin-left: 0.5rem;
`;

const NoteContent = styled.p`
    line-height: 1.6;
    margin-bottom: 1rem;
`;

const NoteList = styled.ul`
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;
`;

const NoteListItem = styled.li`
    margin-bottom: 0.5rem;
    line-height: 1.5;
`;

const NoteLink = styled.a`
    color: ${colors.primary.main};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid ${colors.primary.main};
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.primary.main};
        color: white;
    }
`;

interface NotesProps {
    nightMode: boolean;
}

const Notes = ({ nightMode }: NotesProps) => {
    return (
        <NotesContainer nightMode={nightMode}>
            <ContentContainer>
                <Title>Course Notes</Title>
                <Explanation>
                    Most of my notes are on OneNote and the pdf download from there is very nasty, hard to read. 
                    So I can't upload them here. But for certain courses, I made some readable notes/materials for my final review.
                    I hope they can be helpful for you!
                </Explanation>
                <Section>
                    <NoteItem nightMode={nightMode}>
                        <CourseTitle>Introduction to Artificial Intelligence <CourseCode>CSC384 2025W</CourseCode></CourseTitle>
                        <NoteContent>
                            This course overall is a relatively easy course. The final exam is kind tricky in my term.
                            It is very different and more difficult than previous years' final exam.
                        </NoteContent>
                        <NoteLink href="/assets/CSC384.pdf" target="_blank" rel="noopener noreferrer">
                            View Cheat Sheet I made →
                        </NoteLink>
                    </NoteItem>

                    <NoteItem nightMode={nightMode}>
                        <CourseTitle>Introduction to Linguistics: Sentence<CourseCode>Lin102 2025W</CourseCode></CourseTitle>
                        <NoteContent>
                            This is a very interesting course. Even though it is a breadth course, but it is not that easy.
                            A lot of definitions to remember. I made a Q&A sheet for my final/midterm review.
                        </NoteContent>
                        <NoteLink href="/assets/LIN102.pdf" target="_blank" rel="noopener noreferrer">
                            View Q&A Sheet I made →
                        </NoteLink>
                    </NoteItem>

                    <NoteItem nightMode={nightMode}>
                        <CourseTitle>Introduction to Graph Theory <CourseCode>MAT332 2024W</CourseCode></CourseTitle>
                        <NoteContent>
                            Very interesting course! To achieve high mark, need pay attention to every lecture. 
                            Spend a lot of time on understanding concepts. But if you think you will get a low mark,
                            don't worry, there will be a <strong>very BIG curve</strong> to save you.
                        </NoteContent>
                        <NoteContent>
                            Below are the definition practice sheets I made for final review.
                        </NoteContent>
                        <NoteLink href="/assets/MAT332.pdf" target="_blank">
                            View Practices →
                        </NoteLink>
                    </NoteItem>

                    <NoteItem nightMode={nightMode}>
                        <CourseTitle>Operating System <CourseCode>CSC369 2023F</CourseCode></CourseTitle>
                        <NoteContent>
                            I can say this is the most difficult course I took at UofT. 
                            It requires not only understanding concepts, but also a lot of time and bebugging techniques.
                            The workload is very heavy and you better start your assignment early, like seriously early.
                        </NoteContent>
                        <NoteContent>
                            Below are the cheatsheet notes I made for final review. BTW, Jack is the best Professor!
                        </NoteContent>
                        <NoteLink href="/assets/CSC369.pdf" target="_blank">
                            View Notes →
                        </NoteLink>
                    </NoteItem>
                </Section>
            </ContentContainer>
        </NotesContainer>
    );
};

export default Notes; 