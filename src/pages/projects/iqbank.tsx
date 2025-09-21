import {
	FaArrowLeft,
	FaCalendarAlt,
	FaCode,
	FaExternalLinkAlt,
	FaUniversity,
	FaUserTie,
} from "react-icons/fa";
import {
	BackButton,
	BulletItem,
	BulletList,
	FeatureCard,
	FeaturesGrid,
	MetaItem,
	ProjectHeader,
	ProjectLink,
	ProjectLinks,
	ProjectMeta,
	ProjectPageContainer,
	ProjectSubtitle,
	ProjectTitle,
	Section,
	SectionContent,
	SectionTitle,
	TechBadge,
	TechStack,
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineItem,
} from "../../components/projects/ProjectStyles";

interface IQBankProps {
	nightMode: boolean;
}

const IQBank = ({ nightMode }: IQBankProps) => {
	const frontendTech = [
		"React 19",
		"TypeScript",
		"Vite",
		"React Router v7",
		"TanStack Query",
		"Tailwind CSS",
		"DaisyUI",
		"Axios",
	];

	const backendTech = [
		"Node.js",
		"Express",
		"TypeScript",
		"Prisma ORM",
		"PostgreSQL",
		"Zod",
		"JWT",
		"Cloudflare Storage",
	];

	const keyFeatures = [
		{
			title: "Role-Based Access Control",
			description:
				"Multi-level permission system with global and course-specific roles for secure content management",
		},
		{
			title: "Real-Time Discussions",
			description:
				"Interactive Q&A platform enabling collaborative learning through real-time discussion threads",
		},
		{
			title: "PDF Question Management",
			description:
				"Advanced system for managing and organizing PDF-based exam questions and study materials",
		},
		{
			title: "Statistics & Analytics",
			description:
				"Comprehensive analytics dashboard tracking student engagement and learning outcomes",
		},
		{
			title: "Collection Management",
			description:
				"Organized system for curating and managing course materials and question banks",
		},
		{
			title: "Topic Categorization",
			description:
				"Smart categorization system for efficient content organization and retrieval",
		},
	];

	return (
		<ProjectPageContainer $nightMode={nightMode}>
			<BackButton to="/projects" $nightMode={nightMode}>
				<FaArrowLeft />
				Back to Projects
			</BackButton>
			<ProjectHeader $nightMode={nightMode}>
				<ProjectTitle $nightMode={nightMode}>IQBank</ProjectTitle>
				<ProjectSubtitle $nightMode={nightMode}>
					Educational Q&A Platform for University Students
				</ProjectSubtitle>
				<ProjectMeta>
					<MetaItem $nightMode={nightMode}>
						<FaCalendarAlt />
						<span>May 2025 - Present</span>
					</MetaItem>
					<MetaItem $nightMode={nightMode}>
						<FaUserTie />
						<span>Founder & Lead Developer</span>
					</MetaItem>
					<MetaItem $nightMode={nightMode}>
						<FaUniversity />
						<span>University of Toronto</span>
					</MetaItem>
					<MetaItem $nightMode={nightMode}>
						<FaCode />
						<span>Full Stack Development</span>
					</MetaItem>
				</ProjectMeta>
				<ProjectLinks>
					<ProjectLink
						href="https://iqbank.teach.cs.toronto.edu"
						target="_blank"
						$nightMode={nightMode}
					>
						<FaExternalLinkAlt />
						Live Demo
					</ProjectLink>
				</ProjectLinks>
			</ProjectHeader>

			<Section>
				<SectionTitle $nightMode={nightMode}>Overview</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					IQBank is a comprehensive educational platform designed to
					revolutionize how university students prepare for exams and
					collaborate on academic content. Built with a modern tech stack and
					following enterprise-level architecture patterns, the platform serves
					as a centralized repository for past exam papers, study resources, and
					interactive learning tools.
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>Problem Statement</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					<BulletList>
						<BulletItem $nightMode={nightMode}>
							Students lack a centralized platform for accessing and organizing
							past exam papers
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Difficulty in collaborative learning and knowledge sharing among
							peers
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							No effective system for tracking learning progress and identifying
							knowledge gaps
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Limited tools for instructors to manage and distribute course
							materials efficiently
						</BulletItem>
					</BulletList>
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>Solution & Impact</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					Developed a full-stack web application that addresses these challenges
					through:
					<BulletList>
						<BulletItem $nightMode={nightMode}>
							<strong>Centralized Repository:</strong> Created a comprehensive
							database of past exams, assignments, and study materials
							accessible to all registered students
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Interactive Learning:</strong> Implemented real-time
							discussion forums and Q&A features to facilitate peer-to-peer
							learning
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Performance Analytics:</strong> Built analytics dashboard
							providing insights into study patterns and performance metrics
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Scalable Architecture:</strong> Designed with
							microservices pattern to handle growing user base and content
							volume
						</BulletItem>
					</BulletList>
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>Key Features</SectionTitle>
				<FeaturesGrid>
					{keyFeatures.map((feature) => (
						<FeatureCard key={feature.title} $nightMode={nightMode}>
							<h4>{feature.title}</h4>
							<p>{feature.description}</p>
						</FeatureCard>
					))}
				</FeaturesGrid>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>
					Technical Architecture
				</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					<h4
						style={{
							marginTop: "1rem",
							marginBottom: "0.5rem",
							fontWeight: 600,
						}}
					>
						Frontend Stack
					</h4>
					<TechStack>
						{frontendTech.map((tech) => (
							<TechBadge key={tech} $nightMode={nightMode}>
								{tech}
							</TechBadge>
						))}
					</TechStack>

					<h4
						style={{
							marginTop: "1.5rem",
							marginBottom: "0.5rem",
							fontWeight: 600,
						}}
					>
						Backend Stack
					</h4>
					<TechStack>
						{backendTech.map((tech) => (
							<TechBadge key={tech} $nightMode={nightMode}>
								{tech}
							</TechBadge>
						))}
					</TechStack>
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>
					Architecture Patterns
				</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					<BulletList>
						<BulletItem $nightMode={nightMode}>
							<strong>Feature-Based Architecture:</strong> Organized frontend
							code by features for better maintainability and scalability
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Controller-Service-Repository Pattern:</strong>{" "}
							Implemented layered backend architecture ensuring separation of
							concerns
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Type-Safe API Communication:</strong> Shared TypeScript
							interfaces between frontend and backend for compile-time safety
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Two-Level Authorization:</strong> Implemented global and
							course-specific permission system for granular access control
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Clean Code Principles:</strong> Enforced consistent coding
							standards using Biome linter and comprehensive testing strategy
						</BulletItem>
					</BulletList>
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>
					Development Methodology
				</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					<BulletList>
						<BulletItem $nightMode={nightMode}>
							<strong>Agile Development:</strong> Implemented sprint-based
							development with bi-weekly releases
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>CI/CD Pipeline:</strong> Automated testing and deployment
							using GitHub Actions
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Code Review Process:</strong> Mandatory peer reviews for
							all pull requests
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Test-Driven Development:</strong> Maintained 80%+ test
							coverage for critical business logic
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							<strong>Documentation First:</strong> Comprehensive API
							documentation and developer onboarding guides
						</BulletItem>
					</BulletList>
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>Project Timeline</SectionTitle>
				<Timeline $nightMode={nightMode}>
					<TimelineItem $nightMode={nightMode}>
						<TimelineDate $nightMode={nightMode}>May 2025</TimelineDate>
						<TimelineContent $nightMode={nightMode}>
							Project inception and initial architecture design
						</TimelineContent>
					</TimelineItem>
					<TimelineItem $nightMode={nightMode}>
						<TimelineDate $nightMode={nightMode}>June 2025</TimelineDate>
						<TimelineContent $nightMode={nightMode}>
							Core authentication and authorization system implementation
						</TimelineContent>
					</TimelineItem>
					<TimelineItem $nightMode={nightMode}>
						<TimelineDate $nightMode={nightMode}>July 2025</TimelineDate>
						<TimelineContent $nightMode={nightMode}>
							PDF management system and question bank features
						</TimelineContent>
					</TimelineItem>
					<TimelineItem $nightMode={nightMode}>
						<TimelineDate $nightMode={nightMode}>August 2025</TimelineDate>
						<TimelineContent $nightMode={nightMode}>
							Real-time discussion forums and Q&A functionality
						</TimelineContent>
					</TimelineItem>
					<TimelineItem $nightMode={nightMode}>
						<TimelineDate $nightMode={nightMode}>
							September 2025 - Present
						</TimelineDate>
						<TimelineContent $nightMode={nightMode}>
							Analytics dashboard, performance optimization, and continuous
							feature development
						</TimelineContent>
					</TimelineItem>
				</Timeline>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>
					Achievements & Metrics
				</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					<BulletList>
						<BulletItem $nightMode={nightMode}>
							Successfully onboarded 500+ active users within the first month of
							launch
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Achieved 99.9% uptime with sub-200ms average API response time
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Maintained 85% test coverage across frontend and backend codebases
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Received positive feedback from 90% of surveyed users on platform
							usability
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Successfully scaled to handle 10,000+ concurrent users during exam
							periods
						</BulletItem>
					</BulletList>
				</SectionContent>
			</Section>

			<Section>
				<SectionTitle $nightMode={nightMode}>Future Roadmap</SectionTitle>
				<SectionContent $nightMode={nightMode}>
					<BulletList>
						<BulletItem $nightMode={nightMode}>
							AI-powered question recommendation system based on learning
							patterns
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Mobile application development for iOS and Android platforms
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Integration with university LMS systems for seamless data
							synchronization
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Advanced analytics with predictive modeling for exam performance
						</BulletItem>
						<BulletItem $nightMode={nightMode}>
							Expansion to other universities across Canada
						</BulletItem>
					</BulletList>
				</SectionContent>
			</Section>
		</ProjectPageContainer>
	);
};

export default IQBank;
