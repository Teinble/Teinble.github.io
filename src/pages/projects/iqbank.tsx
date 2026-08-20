import {
	ArrowLeftIcon,
	ArrowTopRightOnSquareIcon,
	CalendarDaysIcon,
	CodeBracketIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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

const features = [
	[
		"Role-Based Access Control",
		"Multi-level permissions with global and course-specific roles.",
	],
	[
		"Real-Time Discussions",
		"Interactive Q&A threads supporting collaborative learning.",
	],
	[
		"PDF Question Management",
		"Questions can be created and organized directly on exam PDFs.",
	],
	[
		"Statistics & Analytics",
		"Engagement metrics help instructors understand participation.",
	],
	[
		"Collection Management",
		"Course materials and question banks stay organized.",
	],
	[
		"Topic Categorization",
		"Topics make content easier to retrieve and review.",
	],
];

const Section = ({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) => (
	<section className="mb-12 max-md:mb-8">
		<h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold dark:border-gray-700">
			{title}
		</h2>
		<div className="leading-7 text-gray-500 dark:text-white/80">{children}</div>
	</section>
);

const BulletList = ({ children }: { children: ReactNode }) => (
	<ul className="my-4 space-y-3">{children}</ul>
);
const Bullet = ({ children }: { children: ReactNode }) => (
	<li className="relative pl-6 before:absolute before:left-0 before:font-bold before:text-blue-600 before:content-['▸']">
		{children}
	</li>
);

const IQBank = ({ nightMode: _nightMode }: { nightMode: boolean }) => (
	<div className="mx-auto max-w-[1200px] p-8 max-md:p-4">
		<Link
			to="/projects"
			className="mb-8 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium transition-transform hover:-translate-x-1 dark:border-gray-700"
		>
			<ArrowLeftIcon className="size-5" /> Back to Projects
		</Link>

		<header className="mb-12 border-b-2 border-gray-200 pb-8 dark:border-gray-700">
			<h1 className="mb-4 text-5xl font-bold max-md:text-3xl">IQBank</h1>
			<p className="mb-6 text-xl text-gray-500 max-md:text-base">
				Educational Q&amp;A Platform for University Students
			</p>
			<div className="mt-4 flex flex-wrap gap-8 text-gray-500 max-md:gap-4 max-md:text-sm">
				<p className="flex items-center gap-2">
					<CalendarDaysIcon className="size-5" /> May 2025 - Present
				</p>
				<p className="flex items-center gap-2">
					<UserIcon className="size-5" /> Founder &amp; Lead Developer
				</p>
				<p className="flex items-center gap-2">
					<CodeBracketIcon className="size-5" /> Full Stack Development
				</p>
			</div>
			<a
				href="https://iqbank.teach.cs.toronto.edu"
				target="_blank"
				rel="noreferrer"
				className="mt-8 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-black/[0.02] px-6 py-3 font-medium dark:border-gray-700 dark:bg-white/10"
			>
				<ArrowTopRightOnSquareIcon className="size-5" /> Live Demo
			</a>
		</header>

		<Section title="Overview">
			<p>
				IQBank is an educational platform designed to improve how university
				students prepare for exams and collaborate on academic content. It
				provides a centralized home for past exams, structured questions,
				discussions, and study resources.
			</p>
		</Section>

		<Section title="Problem Statement">
			<BulletList>
				<Bullet>
					Students lack a centralized platform for accessing and organizing past
					exam papers.
				</Bullet>
				<Bullet>
					Static PDF files make collaborative discussion and knowledge sharing
					difficult.
				</Bullet>
				<Bullet>
					Students need better ways to identify topics and revisit knowledge
					gaps.
				</Bullet>
				<Bullet>
					Instructors need practical tools for organizing course material and
					recognizing contributors.
				</Bullet>
			</BulletList>
		</Section>

		<Section title="Solution & Impact">
			<BulletList>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Centralized repository:
					</strong>{" "}
					Past exams and study material are organized by course and topic.
				</Bullet>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						PDF-native workflow:
					</strong>{" "}
					Coordinate-based question creation makes annotation roughly 10× faster
					than a traditional form.
				</Bullet>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Collaborative learning:
					</strong>{" "}
					Discussion and endorsement features help students learn from one
					another.
				</Bullet>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Team delivery:
					</strong>{" "}
					An eight-person development team supports a platform serving more than
					400 students.
				</Bullet>
			</BulletList>
		</Section>

		<Section title="Key Features">
			<div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 max-md:grid-cols-1 max-md:gap-4">
				{features.map(([title, description]) => (
					<div
						key={title}
						className="rounded-lg border border-gray-200 bg-black/[0.02] p-6 dark:border-gray-700 dark:bg-white/5"
					>
						<h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
							{title}
						</h3>
						<p className="text-sm leading-6">{description}</p>
					</div>
				))}
			</div>
		</Section>

		<Section title="Technical Architecture">
			<h3 className="mb-2 mt-4 font-semibold text-gray-800 dark:text-gray-100">
				Frontend Stack
			</h3>
			<div className="my-4 flex flex-wrap">
				{frontendTech.map((tech) => (
					<span
						key={tech}
						className="m-1 rounded-full border border-gray-200 bg-black/5 px-3 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-white/10 dark:text-gray-100"
					>
						{tech}
					</span>
				))}
			</div>
			<h3 className="mb-2 mt-6 font-semibold text-gray-800 dark:text-gray-100">
				Backend Stack
			</h3>
			<div className="my-4 flex flex-wrap">
				{backendTech.map((tech) => (
					<span
						key={tech}
						className="m-1 rounded-full border border-gray-200 bg-black/5 px-3 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-white/10 dark:text-gray-100"
					>
						{tech}
					</span>
				))}
			</div>
		</Section>

		<Section title="Architecture Patterns">
			<BulletList>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Feature-based frontend:
					</strong>{" "}
					Product capabilities are organized into focused modules.
				</Bullet>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Controller-service-repository backend:
					</strong>{" "}
					Layers keep responsibilities separated.
				</Bullet>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Type-safe communication:
					</strong>{" "}
					Shared TypeScript contracts reduce API drift.
				</Bullet>
				<Bullet>
					<strong className="text-gray-800 dark:text-gray-100">
						Two-level authorization:
					</strong>{" "}
					Global and course permissions provide granular access control.
				</Bullet>
			</BulletList>
		</Section>

		<Section title="Project Timeline">
			<div className="border-l-2 border-gray-200 pl-8 dark:border-gray-700">
				{[
					["May 2025", "Project inception and initial architecture design"],
					["June 2025", "Core authentication and authorization implementation"],
					["July 2025", "PDF management and question-bank features"],
					["August 2025", "Discussion and Q&A functionality"],
					[
						"September 2025 - Present",
						"Analytics, performance, and continuous feature development",
					],
				].map(([date, description]) => (
					<div
						key={date}
						className="relative mb-8 before:absolute before:-left-[2.4rem] before:top-2 before:size-3 before:rounded-full before:bg-blue-600"
					>
						<p className="mb-2 text-sm font-semibold">{date}</p>
						<p>{description}</p>
					</div>
				))}
			</div>
		</Section>
	</div>
);

export default IQBank;
