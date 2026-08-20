import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface ProjectCardProps {
	title: string;
	backgroundImage: string;
	timeline: string;
	roleLabel: string;
	shortDescription: string;
	projectSlug: string;
	nightMode: boolean;
}

const ProjectCard = ({
	title,
	backgroundImage,
	timeline,
	roleLabel,
	shortDescription,
	projectSlug,
}: ProjectCardProps) => (
	<Link
		to={`/projects/${projectSlug}`}
		className="group relative block h-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-[#1a1a1a]"
	>
		<div
			className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
			style={{ backgroundImage: `url(${backgroundImage})` }}
		/>
		<div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/30 to-white/95 backdrop-blur-[1px] dark:from-black/5 dark:via-black/30 dark:to-black/95" />
		<div className="relative z-10 flex h-full flex-col justify-end p-6">
			<h2 className="mb-3 text-2xl font-bold text-gray-600 dark:text-gray-100">
				{title}
			</h2>
			<div className="mb-4 flex flex-wrap gap-2">
				<span className="rounded-full border border-blue-600 bg-white/30 px-3 py-1 text-sm font-medium text-blue-600 backdrop-blur dark:bg-black/30">
					{timeline}
				</span>
				<span className="rounded-full border border-emerald-500 bg-white/30 px-3 py-1 text-sm font-medium text-emerald-600 backdrop-blur dark:bg-black/30 dark:text-emerald-400">
					{roleLabel}
				</span>
			</div>
			<p className="line-clamp-3 text-sm leading-6 text-black/70 dark:text-white/85">
				{shortDescription}
			</p>
			<ArrowRightIcon className="absolute bottom-6 right-6 size-6 opacity-0 transition-opacity group-hover:opacity-100" />
		</div>
	</Link>
);

export default ProjectCard;
