import ProjectCard from "../components/ProjectCard";
import { terminalDocuments } from "../content/portfolio";

const iqbank = terminalDocuments.iqbank;

export const Project = ({ nightMode }: { nightMode: boolean }) => (
	<div>
		<h1 className="mb-8 text-3xl font-bold max-md:mb-6 max-md:text-2xl">
			My Projects
		</h1>
		<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 max-md:grid-cols-1 max-md:gap-6">
			<ProjectCard
				title={iqbank.title}
				backgroundImage="/iqbank.png"
				timeline={iqbank.meta?.[1] ?? "May 2025"}
				roleLabel={iqbank.meta?.[0] ?? "Founder"}
				shortDescription={iqbank.intro}
				projectSlug="iqbank"
				nightMode={nightMode}
			/>
		</div>
	</div>
);
