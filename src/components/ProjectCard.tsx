import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../theme";

const CardContainer = styled.div<{ $nightMode: boolean }>`
    position: relative;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    height: 320px;
    background: ${(props) => (props.$nightMode ? colors.background.dark : colors.background.light)};
    border: 1px solid ${(props) => (props.$nightMode ? colors.border.dark : colors.border.light)};
    box-shadow: ${(props) =>
			props.$nightMode
				? "0 4px 6px rgba(0, 0, 0, 0.3)"
				: "0 4px 6px rgba(0, 0, 0, 0.1)"};
    transition: all 0.3s ease;

    &:hover {
        box-shadow: ${(props) =>
					props.$nightMode
						? "0 10px 20px rgba(0, 0, 0, 0.4)"
						: "0 10px 20px rgba(0, 0, 0, 0.2)"};
        transform: translateY(-4px);
        border-color: ${colors.primary};
    }
`;

const BackgroundImage = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${(p) => p.$backgroundImage});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const GradientBlur = styled.div<{ $nightMode: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;               /* don't block clicks */
  backdrop-filter: blur(10px);        /* real blur */
  -webkit-backdrop-filter: blur(10px);
  background: ${(props) =>
		props.$nightMode
			? "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%)"
			: "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.9) 100%)"};

  /* Show overlay only on the bottom via a mask */
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0) 0 20%, rgba(0,0,0,1) 80% 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0) 0 20%, rgba(0,0,0,1) 80% 100%);
`;

const Content = styled.div`
    position: relative;
    z-index: 10;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const Title = styled.h2<{ $nightMode: boolean }>`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.text.gray};
    margin-bottom: 12px;
    transition: color 0.3s ease;

    ${CardContainer}:hover & {
        color: ${colors.primary};
    }
`;

const BadgeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
`;

const Badge = styled.span<{ $nightMode: boolean; $type: "timeline" | "role" }>`
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid ${(props) => (props.$type === "timeline" ? colors.primary : colors.secondary.main)};
    color: ${(props) => (props.$type === "timeline" ? colors.primary : colors.secondary.main)};
    background: ${(props) => (props.$nightMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)")};
    backdrop-filter: blur(4px);
`;

const Description = styled.p<{ $nightMode: boolean }>`
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)")};
    font-size: 0.875rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArrowIndicator = styled.div<{ $nightMode: boolean }>`
    position: absolute;
    bottom: 24px;
    right: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${CardContainer}:hover & {
        opacity: 1;
    }

    svg {
        width: 24px;
        height: 24px;
        color: ${(props) => (props.$nightMode ? colors.primary : colors.primary)};
    }
`;

interface ProjectCardProps {
	title: string;
	backgroundImage: string;
	timeline: string;
	role: string;
	shortDescription: string;
	projectSlug: string;
	nightMode: boolean;
}

const ProjectCard = ({
	title,
	backgroundImage,
	timeline,
	role,
	shortDescription,
	projectSlug,
	nightMode,
}: ProjectCardProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/projects/${projectSlug}`);
	};

	return (
		<CardContainer onClick={handleClick} $nightMode={nightMode}>
			<BackgroundImage $backgroundImage={backgroundImage} />
			<GradientBlur $nightMode={nightMode} />

			<Content>
				<Title $nightMode={nightMode}>{title}</Title>

				<BadgeContainer>
					<Badge $nightMode={nightMode} $type="timeline">
						{timeline}
					</Badge>
					<Badge $nightMode={nightMode} $type="role">
						{role}
					</Badge>
				</BadgeContainer>

				<Description $nightMode={nightMode}>{shortDescription}</Description>

				<ArrowIndicator $nightMode={nightMode}>
					<svg
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</ArrowIndicator>
			</Content>
		</CardContainer>
	);
};

export default ProjectCard;
