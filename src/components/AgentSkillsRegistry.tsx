import {
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
	CheckIcon,
	ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { type AgentSkill, agentSkills } from "../content/agentSkills";

type SkillFilter = "all" | "mine" | "recommended";

const filterLabels: Array<{ id: SkillFilter; label: string }> = [
	{ id: "all", label: "All" },
	{ id: "mine", label: "Mine" },
	{ id: "recommended", label: "Recommended" },
];

const AgentSkillsRegistry = ({
	variant,
	selectedSkillId,
	onSkillChange,
}: {
	variant: "terminal" | "plain";
	selectedSkillId?: string;
	onSkillChange?: (id: string) => void;
}) => {
	const [filter, setFilter] = useState<SkillFilter>("all");
	const [localSelectedId, setLocalSelectedId] = useState(agentSkills[0].id);
	const selectedId = selectedSkillId ?? localSelectedId;
	const setSelectedId = onSkillChange ?? setLocalSelectedId;
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const visibleSkills = useMemo(
		() =>
			agentSkills.filter((skill) => filter === "all" || skill.kind === filter),
		[filter],
	);
	const selectedSkill =
		visibleSkills.find((skill) => skill.id === selectedId) ?? visibleSkills[0];
	const terminal = variant === "terminal";

	const selectFilter = (nextFilter: SkillFilter) => {
		setFilter(nextFilter);
		const nextSkills = agentSkills.filter(
			(skill) => nextFilter === "all" || skill.kind === nextFilter,
		);
		if (!nextSkills.some((skill) => skill.id === selectedId)) {
			setSelectedId(nextSkills[0].id);
		}
	};

	const copy = async (skill: AgentSkill) => {
		await navigator.clipboard.writeText(skill.copyText);
		setCopiedId(skill.id);
		window.setTimeout(() => setCopiedId(null), 1800);
	};

	const frameClass = terminal
		? "border border-[var(--term-border)] bg-[var(--term-panel)]"
		: "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#1a1a1a]";
	const mutedClass = terminal
		? "text-[var(--term-muted)]"
		: "text-gray-500 dark:text-gray-400";
	const headingClass = terminal
		? "text-[var(--term-heading)]"
		: "text-gray-900 dark:text-white";
	const accentClass = terminal ? "text-[var(--term-cyan)]" : "text-blue-600";
	const selectedClass = terminal
		? "border-[var(--term-blue)] bg-[var(--term-selection)]"
		: "border-blue-500 bg-blue-50 shadow-sm dark:bg-blue-950/30";
	const idleClass = terminal
		? "border-[var(--term-border)] hover:bg-[var(--term-selection)]"
		: "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800";
	const actionClass = terminal
		? "border-[var(--term-border)] bg-[var(--term-bg)] text-[var(--term-blue)] hover:border-[var(--term-blue)] hover:bg-[var(--term-selection)]"
		: "rounded-md border-gray-300 bg-white text-blue-600 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:bg-[#1a1a1a] dark:hover:bg-gray-800";
	const controlShapeClass = terminal ? "" : "rounded-md";
	const tagShapeClass = terminal
		? ""
		: "rounded-full bg-gray-50 dark:bg-gray-800";

	return (
		<section
			className={`${terminal ? "mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:flex lg:h-full lg:min-h-0 lg:flex-col" : ""}`}
			aria-labelledby={`${variant}-agent-skills-title`}
		>
			<header
				className={`${frameClass} shrink-0 p-3 ${terminal ? "" : "sm:p-5"}`}
			>
				<div className="flex flex-wrap items-center justify-between gap-2.5">
					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
							<p
								className={`${terminal ? "font-mono" : "uppercase tracking-[0.16em]"} text-[11px] font-bold ${accentClass}`}
							>
								{terminal ? "$ skills list --all" : "Agent toolkit"}
							</p>
							<h1
								id={`${variant}-agent-skills-title`}
								className={`${terminal ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} font-bold ${headingClass}`}
							>
								Agent skills
							</h1>
						</div>
						<p
							className={`${terminal ? "mt-0.5 text-xs leading-5" : "mt-2 max-w-2xl text-sm leading-6"} ${mutedClass}`}
						>
							Reusable workflows I built and agent tools I recommend.
						</p>
					</div>
					<a
						href="/skills/teinble-agent-skills.zip"
						download
						className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold ${actionClass}`}
					>
						<ArrowDownTrayIcon className="size-4" />
						<span className="sm:hidden">Download all</span>
						<span className="hidden sm:inline">Download my four</span>
					</a>
				</div>

				<fieldset className="mt-2 flex flex-wrap gap-1">
					<legend className="sr-only">Filter skills</legend>
					{filterLabels.map((item) => {
						const count = agentSkills.filter(
							(skill) => item.id === "all" || skill.kind === item.id,
						).length;
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => selectFilter(item.id)}
								aria-pressed={filter === item.id}
								className={`${controlShapeClass} border px-3 py-1.5 text-xs font-bold ${
									filter === item.id ? selectedClass : idleClass
								}`}
							>
								{item.label} · {count}
							</button>
						);
					})}
				</fieldset>
			</header>

			<div
				className={`${terminal ? "mt-2 gap-2 lg:min-h-0 lg:flex-1" : "mt-4 gap-4"} grid min-w-0 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)]`}
			>
				<section
					aria-label="Skills list"
					tabIndex={terminal ? 0 : undefined}
					className={`${frameClass} min-w-0 p-2 ${terminal ? "lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain" : "sm:p-3"}`}
				>
					{visibleSkills.map((skill) => (
						<button
							key={skill.id}
							type="button"
							onClick={() => setSelectedId(skill.id)}
							className={`${controlShapeClass} mb-1 flex w-full items-start gap-3 border p-3 text-left last:mb-0 ${
								selectedSkill.id === skill.id ? selectedClass : idleClass
							}`}
						>
							<span
								className={`mt-0.5 font-mono text-sm font-bold ${accentClass}`}
							>
								{skill.command}
							</span>
							<span className="min-w-0 flex-1">
								<span
									className={`block text-[10px] font-bold uppercase tracking-wider ${mutedClass}`}
								>
									{skill.kind === "mine" ? "Mine" : "Recommended"}
								</span>
								<span
									className={`mt-0.5 block text-xs leading-5 ${headingClass}`}
								>
									{skill.summary}
								</span>
							</span>
						</button>
					))}
				</section>

				<article
					tabIndex={terminal ? 0 : undefined}
					className={`${frameClass} min-w-0 p-4 sm:p-5 ${terminal ? "lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain" : "lg:p-6"}`}
				>
					<div className="flex flex-wrap items-start justify-between gap-3 border-b border-current/15 pb-3">
						<div>
							<div className="flex flex-wrap items-center gap-2">
								<h2 className={`font-mono text-2xl font-bold ${headingClass}`}>
									{selectedSkill.command}
								</h2>
								<span
									className={`border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
										selectedSkill.kind === "mine" ? accentClass : mutedClass
									}`}
								>
									{selectedSkill.kind === "mine" ? "Mine" : "Upstream"}
								</span>
								{selectedSkill.license && (
									<span className={`text-[10px] ${mutedClass}`}>
										{selectedSkill.license} licensed
									</span>
								)}
							</div>
							<p
								className={`mt-2 max-w-3xl text-sm leading-6 sm:text-[15px] ${mutedClass}`}
							>
								{selectedSkill.description}
							</p>
						</div>
						<div className="flex flex-wrap gap-1.5">
							{selectedSkill.tags.map((tag) => (
								<span
									key={tag}
									className={`${tagShapeClass} border px-2 py-1 text-[10px] ${mutedClass}`}
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div className="grid gap-4 py-4 sm:grid-cols-2">
						<div>
							<h3
								className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}
							>
								Workflow
							</h3>
							<ol
								className={`mt-2 space-y-2 text-sm leading-5 ${headingClass}`}
							>
								{selectedSkill.workflow.map((step, index) => (
									<li
										key={step}
										className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2"
									>
										<span className={`font-mono font-bold ${accentClass}`}>
											{index + 1}.
										</span>
										<span>{step}</span>
									</li>
								))}
							</ol>
						</div>
						<div>
							<h3
								className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}
							>
								Guardrails
							</h3>
							<ul
								className={`mt-2 space-y-2 text-sm leading-5 ${headingClass}`}
							>
								{selectedSkill.guardrails.map((guardrail) => (
									<li
										key={guardrail}
										className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2"
									>
										<span className={accentClass}>›</span>
										<span>{guardrail}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{selectedSkill.included && (
						<div className="border-t border-current/15 py-3">
							<h3
								className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}
							>
								Included skills
							</h3>
							<div className="mt-2 flex flex-wrap gap-1.5">
								{selectedSkill.included.map((item) => (
									<code
										key={item}
										className={`${tagShapeClass} border px-2 py-1 text-[11px] ${mutedClass}`}
									>
										{item}
									</code>
								))}
							</div>
						</div>
					)}

					{selectedSkill.sourceUrl && (
						<div className="space-y-2 border-t border-current/15 py-3">
							<div>
								<h3
									className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}
								>
									Codex setup
								</h3>
								<code
									className={`mt-1 block break-all font-mono text-xs leading-5 ${headingClass}`}
								>
									{selectedSkill.copyText}
								</code>
							</div>
							<div>
								<h3
									className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}
								>
									Upstream repository
								</h3>
								<a
									href={selectedSkill.sourceUrl}
									target="_blank"
									rel="noreferrer"
									className={`mt-1 inline-block break-all font-mono text-xs leading-5 underline decoration-current/40 underline-offset-2 ${accentClass}`}
								>
									{selectedSkill.sourceUrl}
								</a>
							</div>
						</div>
					)}

					<div className="flex flex-wrap gap-2 border-t border-current/15 pt-4">
						<button
							type="button"
							onClick={() => void copy(selectedSkill)}
							className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold ${actionClass}`}
						>
							{copiedId === selectedSkill.id ? (
								<CheckIcon className="size-4" />
							) : (
								<ClipboardDocumentIcon className="size-4" />
							)}
							{copiedId === selectedSkill.id
								? "Copied"
								: selectedSkill.kind === "mine"
									? "Copy prompt"
									: "Copy Codex setup"}
						</button>
						{selectedSkill.downloadUrl && (
							<a
								href={selectedSkill.downloadUrl}
								download={`${selectedSkill.id}-SKILL.md`}
								className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold ${actionClass}`}
							>
								<ArrowDownTrayIcon className="size-4" />
								Download SKILL.md
							</a>
						)}
						{selectedSkill.sourceUrl && (
							<a
								href={selectedSkill.sourceUrl}
								target="_blank"
								rel="noreferrer"
								className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold ${actionClass}`}
							>
								<ArrowTopRightOnSquareIcon className="size-4" />
								View upstream
							</a>
						)}
					</div>
				</article>
			</div>
		</section>
	);
};

export default AgentSkillsRegistry;
