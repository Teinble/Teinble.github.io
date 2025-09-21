import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../theme";

// Back navigation button
export const BackButton = styled(Link)<{ $nightMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    text-decoration: none;
    border: 1px solid ${(props) => (props.$nightMode ? colors.border.dark : colors.border.light)};
    border-radius: 8px;
    background: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)")};
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
        background: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)")};
        transform: translateX(-4px);
        border-color: ${colors.primary};
        color: ${colors.primary};
    }

    svg {
        width: 1.25rem;
        height: 1.25rem;
        transition: transform 0.2s ease;
    }

    &:hover svg {
        transform: translateX(-4px);
    }

    @media (max-width: 768px) {
        padding: 0.4rem 0.8rem;
        font-size: 0.875rem;
    }
`;

// Container for the entire project page
export const ProjectPageContainer = styled.div<{ $nightMode: boolean }>`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

// Project header section
export const ProjectHeader = styled.header<{ $nightMode: boolean }>`
    border-bottom: 2px solid ${(props) => (props.$nightMode ? colors.border.dark : colors.border.light)};
    padding-bottom: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
        padding-bottom: 1.5rem;
        margin-bottom: 2rem;
    }
`;

export const ProjectTitle = styled.h1<{ $nightMode: boolean }>`
    font-size: 3rem;
    font-weight: 700;
    color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const ProjectSubtitle = styled.h2<{ $nightMode: boolean }>`
    font-size: 1.25rem;
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.7)" : colors.text.gray)};
    font-weight: 400;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export const ProjectMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
        gap: 1rem;
    }
`;

export const MetaItem = styled.div<{ $nightMode: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.6)" : colors.text.gray)};
    font-size: 1rem;

    svg {
        width: 1.25rem;
        height: 1.25rem;
    }

    @media (max-width: 768px) {
        font-size: 0.875rem;
    }
`;

// Section components
export const Section = styled.section`
    margin-bottom: 3rem;

    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }
`;

export const SectionTitle = styled.h3<{ $nightMode: boolean }>`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${colors.border.light};

    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const SectionContent = styled.div<{ $nightMode: boolean }>`
    font-size: 1rem;
    line-height: 1.8;
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.8)" : colors.text.gray)};

    strong {
        color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    }

    h4 {
        color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    }

    @media (max-width: 768px) {
        font-size: 0.875rem;
        line-height: 1.6;
    }
`;

// Tech stack badge
export const TechBadge = styled.span<{ $nightMode: boolean }>`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)")};
    border: 1px solid ${(props) => (props.$nightMode ? colors.border.dark : colors.border.light)};
    border-radius: 20px;
    font-size: 0.875rem;
    margin: 0.25rem;
    color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};

    @media (max-width: 768px) {
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
    }
`;

export const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
`;

// List styles
export const BulletList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1rem 0;
`;

export const BulletItem = styled.li<{ $nightMode: boolean }>`
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.6;
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)")};

    &:before {
        content: "▸";
        position: absolute;
        left: 0;
        color: ${colors.primary};
        font-weight: bold;
    }

    strong {
        color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    }
`;

// Key features grid
export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

export const FeatureCard = styled.div<{ $nightMode: boolean }>`
    padding: 1.5rem;
    background: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)")};
    border: 1px solid ${(props) => (props.$nightMode ? colors.border.dark : colors.border.light)};
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h4 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: ${(props) => (props.$nightMode ? colors.text.dark : colors.text.light)};
    }

    p {
        font-size: 0.875rem;
        color: ${colors.text.gray};
        line-height: 1.5;
    }
`;

// Links section
export const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
`;

export const ProjectLink = styled.a<{
	$nightMode: boolean;
	$primary?: boolean;
}>`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: ${(props) =>
			props.$primary
				? colors.primary
				: (
						props.$nightMode
							? "rgba(255, 255, 255, 0.1)"
							: "rgba(0, 0, 0, 0.05)"
					)};
    color: ${(props) =>
			props.$primary
				? "#ffffff"
				: (props.$nightMode ? colors.text.dark : colors.text.light)};
    border: 1px solid ${(props) =>
			props.$primary
				? colors.primary
				: (props.$nightMode ? colors.border.dark : colors.border.light)};
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;

    svg {
        width: 1.25rem;
        height: 1.25rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: ${(props) =>
					props.$primary
						? colors.primary.dark
						: (
								props.$nightMode
									? "rgba(255, 255, 255, 0.15)"
									: "rgba(0, 0, 0, 0.1)"
							)};
    }

    @media (max-width: 768px) {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
`;

// Timeline component
export const Timeline = styled.div<{ $nightMode: boolean }>`
    position: relative;
    padding-left: 2rem;

    &:before {
        content: '';
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        bottom: 0.5rem;
        width: 2px;
        background: ${(props) => (props.$nightMode ? colors.border.dark : colors.border.light)};
    }
`;

export const TimelineItem = styled.div<{ $nightMode: boolean }>`
    position: relative;
    margin-bottom: 2rem;

    &:before {
        content: '';
        position: absolute;
        left: -1.5rem;
        top: 0.5rem;
        width: 0.75rem;
        height: 0.75rem;
        background: ${colors.primary};
        border-radius: 50%;
        border: 2px solid ${(props) => (props.$nightMode ? "#1a1a1a" : "white")};
        box-shadow: 0 0 0 2px ${colors.primary};
    }
`;

export const TimelineDate = styled.div<{ $nightMode: boolean }>`
    font-size: 0.875rem;
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.6)" : colors.text.gray)};
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

export const TimelineContent = styled.div<{ $nightMode: boolean }>`
    font-size: 1rem;
    line-height: 1.6;
    color: ${(props) => (props.$nightMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)")};
`;
