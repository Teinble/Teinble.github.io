import { Link } from "react-router-dom";
import {
	education,
	skillGroups,
	terminalDocuments,
} from "../content/portfolio";

const sectionTitle =
	"mb-4 flex items-center gap-2 text-[1.8rem] font-bold max-md:text-2xl";
const cardClass =
	"mb-6 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-[#1a1a1a]";

const experienceIds = ["bosonai", "iqbank", "xiaomi"] as const;
const experienceSectionNames = new Set([
	"Higgs Realtime",
	"Evaluation platform",
	"Published work",
	"Research contribution",
	"role",
	"impact",
	"work",
]);

const About = ({ nightMode: _nightMode }: { nightMode: boolean }) => {
	const research = terminalDocuments.research;

	return (
		<div className="mx-auto max-w-[1200px] p-8 max-md:p-4">
			<h1 className="mb-4 text-[2.5rem] font-bold max-md:text-4xl">About Me</h1>
			<section className="mb-8 space-y-2 leading-7">
				<p>
					Hello! My name is Xiling, and you can also call me{" "}
					<strong>Will</strong>.
				</p>
				<p>{terminalDocuments.home.intro}</p>
				<p>I was born in Beijing and came to Canada to study in 2019.</p>
			</section>

			<section className="mb-8">
				<h2 className={sectionTitle}>🎓 Education</h2>
				<h3 className="mb-2 text-xl font-semibold">{education.school}</h3>
				<p className="mb-1 italic">
					{education.graduate.degree} ({education.graduate.period}) · cGPA{" "}
					<strong>{education.graduate.gpa}</strong>
				</p>
				<p className="mb-3 italic">
					{education.undergraduate.degree} ({education.undergraduate.period}) ·
					cGPA <strong>{education.undergraduate.gpa}</strong>
				</p>
				<p className="text-gray-500">{education.achievements.join(" · ")}</p>
			</section>

			<section className="mb-8">
				<h2 className={sectionTitle}>💼 Work Experience</h2>
				{experienceIds.map((id) => {
					const experience = terminalDocuments[id];
					const sections = experience.sections.filter((section) =>
						experienceSectionNames.has(section.heading),
					);

					return (
						<article key={id} className={cardClass}>
							<div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
								<div>
									<h3 className="text-xl font-semibold text-blue-600">
										{experience.title}
									</h3>
									<p className="font-medium">{experience.meta?.[0]}</p>
								</div>
								{experience.meta && experience.meta.length > 1 && (
									<p className="text-sm text-gray-500">
										{experience.meta.slice(1).join(" · ")}
									</p>
								)}
							</div>
							<p className="mb-4 leading-7 text-gray-600 dark:text-gray-300">
								{experience.intro}
							</p>
							{sections.map((section) => (
								<div key={section.heading} className="mt-4">
									<h4 className="mb-2 font-semibold">{section.heading}</h4>
									{section.body && <p className="leading-6">{section.body}</p>}
									{section.items && (
										<ul
											className={`${section.body ? "mt-2" : ""} list-disc space-y-1.5 pl-6 leading-6`}
										>
											{section.items.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									)}
									{section.links?.map((link) => (
										<a
											key={link.href}
											href={link.href}
											target="_blank"
											rel="noreferrer"
											className="mt-2 inline-block font-medium text-blue-600 underline"
										>
											{link.label}
										</a>
									))}
								</div>
							))}
							{id === "iqbank" && (
								<Link
									to="/projects/iqbank"
									className="mt-4 inline-block font-medium text-blue-600 underline"
								>
									Read the full IQBank case study
								</Link>
							)}
						</article>
					);
				})}
			</section>

			<section className="mb-8">
				<h2 className={sectionTitle}>🎯 {research.title}</h2>
				<p className="mb-5 leading-7">{research.intro}</p>
				<div className="grid gap-5 md:grid-cols-2">
					{research.sections.map((section) => (
						<div key={section.heading}>
							<h3 className="mb-2 text-lg font-semibold text-gray-500">
								{section.heading}
							</h3>
							<p className="leading-7">{section.body}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mb-8">
				<h2 className={sectionTitle}>✨ Skills &amp; Tools</h2>
				{Object.entries(skillGroups).map(([category, items]) => (
					<div key={category} className="mb-6">
						<h3 className="mb-3 text-lg font-semibold text-gray-500">
							{category}
						</h3>
						<div className="flex flex-wrap gap-2">
							{items.map((item) => (
								<span
									key={item}
									className="rounded border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700"
								>
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

export default About;
