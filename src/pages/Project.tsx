import ProjectCard from "../components/ProjectCard";

export const Project = ({ nightMode }: { nightMode: boolean }) => (
	<div>
		<h1 className="mb-8 text-3xl font-bold max-md:mb-6 max-md:text-2xl">
			My Projects
		</h1>
		<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 max-md:grid-cols-1 max-md:gap-6">
			<ProjectCard
				title="IQbank"
				backgroundImage="/iqbank.png"
				timeline="May 2025 - Present"
				roleLabel="Founder"
				shortDescription="A collaborative exam preparation platform for university students, featuring past exam papers, interactive questions, and study resources."
				projectSlug="iqbank"
				nightMode={nightMode}
			/>
		</div>
	</div>
);
