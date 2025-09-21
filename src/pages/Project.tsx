import styled from "styled-components";
import ProjectCard from "../components/ProjectCard";

const ProjectsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;

export const Project = ({ nightMode }: { nightMode: boolean }) => {
	// Sample projects data - you can move this to a separate file or fetch from an API
	const projects = [
		{
			id: 1,
			title: "IQbank",
			backgroundImage: "./iqbank.png",
			timeline: "May 2025 - Present",
			role: "Founder",
			shortDescription:
				"A collaborative exam preparation platform for university students, featuring a vast repository of past exam papers, interactive quizzes, and study resources to enhance learning outcomes.",
			projectSlug: "iqbank",
		},
	];

	return (
		<div>
			<Title>My Projects</Title>
			<ProjectsContainer>
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						title={project.title}
						backgroundImage={project.backgroundImage}
						timeline={project.timeline}
						role={project.role}
						shortDescription={project.shortDescription}
						projectSlug={project.projectSlug}
						nightMode={nightMode}
					/>
				))}
			</ProjectsContainer>
		</div>
	);
};
