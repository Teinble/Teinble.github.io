import {
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
	CheckIcon,
	ClipboardDocumentIcon,
	FunnelIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import codexInstructions from "../../vendor/agent-config/instructions/AGENTS.md?raw";
import claudeInstructions from "../../vendor/agent-config/instructions/CLAUDE.md?raw";
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
	const [section, setSection] = useState("Skills");
	const [instruction, setInstruction] = useState("AGENTS.md");
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
	const installCommand = `npx skills add Teinble/agent-config -g -a codex claude-code --skill ${selectedSkill.id}`;
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
				<div className="flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center">
					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
							<p
								className={`${terminal ? "font-mono" : "uppercase tracking-[0.16em]"} text-[11px] font-bold ${accentClass}`}
							>
								{terminal ? "~/agent-config" : "Agent toolkit"}
							</p>
							<h1
								id={`${variant}-agent-skills-title`}
								className={`${terminal ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} font-bold ${headingClass}`}
							>
								Agent skills & instructions
							</h1>
						</div>
						<p
							className={`${terminal ? "mt-0.5 text-xs leading-5" : "mt-2 max-w-2xl text-sm leading-6"} ${mutedClass}`}
						>
							How I work with agents: everyday defaults, reusable workflows, and
							the tools I choose to keep.
						</p>
					</div>
					<a
						href="https://github.com/Teinble/agent-config"
						className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold ${actionClass}`}
					>
						<ArrowTopRightOnSquareIcon className="size-4" />
						<span>Source & setup</span>
					</a>
				</div>

				<nav
					aria-label="Agent configuration sections"
					className="mt-3 flex flex-wrap gap-1"
				>
					{["Skills", "Global instructions", "Install & update"].map((item) => (
						<button
							key={item}
							type="button"
							aria-pressed={section === item}
							onClick={() => setSection(item)}
							className={`${controlShapeClass} border px-2 py-1.5 text-[11px] font-bold sm:px-3 sm:text-xs ${section === item ? selectedClass : idleClass}`}
						>
							{item}
						</button>
					))}
					{section === "Skills" && (
						<div
							className={`${controlShapeClass} relative flex min-h-8 w-8 items-center justify-center border focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ${filter === "all" ? idleClass : selectedClass}`}
							title={`Filter skills: ${filter}`}
						>
							<FunnelIcon className="size-4" aria-hidden="true" />
							{filter !== "all" && (
								<span
									className="absolute right-1 top-1 size-1.5 rounded-full bg-current"
									aria-hidden="true"
								/>
							)}
							<select
								aria-label="Filter skills"
								value={filter}
								onChange={(event) =>
									selectFilter(event.target.value as SkillFilter)
								}
								className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
							>
								{filterLabels.map((item) => (
									<option key={item.id} value={item.id}>
										{item.label} ·{" "}
										{
											agentSkills.filter(
												(skill) => item.id === "all" || skill.kind === item.id,
											).length
										}
									</option>
								))}
							</select>
						</div>
					)}
				</nav>
			</header>

			{section === "Skills" ? (
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
									<h2
										className={`font-mono text-2xl font-bold ${headingClass}`}
									>
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

						{selectedSkill.kind === "mine" && (
							<div
								className={`border-t border-current/15 py-3 text-xs leading-5 ${mutedClass}`}
							>
								<h3 className={`font-bold ${headingClass}`}>
									Install this skill
								</h3>
								<code className="mt-1 block break-all">{installCommand}</code>
								<p className="mt-2">
									Available to Codex and Claude across projects. Installation
									makes the skill available; your request and the agent
									determine when it is used.
								</p>
								<a
									className={`mt-2 inline-block underline ${accentClass}`}
									href={`https://github.com/Teinble/agent-config/tree/main/skills/${selectedSkill.id}`}
								>
									Read skill source
								</a>
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
			) : (
				<article
					tabIndex={terminal ? 0 : undefined}
					className={`${frameClass} mt-3 min-w-0 p-4 sm:p-5 ${terminal ? "lg:min-h-0 lg:flex-1 lg:overflow-y-auto" : ""}`}
				>
					{section === "Global instructions" ? (
						<>
							<h2 className={`text-xl font-bold ${headingClass}`}>
								The defaults I bring to every project
							</h2>
							<p className={`mt-2 max-w-3xl text-sm leading-6 ${mutedClass}`}>
								Global instructions set everyday behavior. Skills describe a
								workflow for a particular task. Project instructions belong with
								the project code.
							</p>
							<div className="my-4 flex flex-wrap gap-2">
								{["AGENTS.md", "CLAUDE.md"].map((file) => (
									<button
										type="button"
										key={file}
										aria-pressed={instruction === file}
										onClick={() => setInstruction(file)}
										className={`${controlShapeClass} border px-3 py-2 text-xs font-bold ${instruction === file ? selectedClass : idleClass}`}
									>
										{file === "AGENTS.md"
											? "Codex · AGENTS.md"
											: "Claude · CLAUDE.md"}
									</button>
								))}
							</div>
							<div className={`mb-4 text-sm leading-6 ${mutedClass}`}>
								<p>
									{instruction === "AGENTS.md"
										? "Git conventions, GitHub authentication checks, temporary files, and optional Herdr collaboration."
										: "Plain English, clear explanations, and optional Herdr collaboration."}
								</p>
								<p className="mt-1">
									{instruction === "AGENTS.md"
										? "Current A100 configuration: adapt the scratch path before using it on another machine."
										: "Herdr collaboration requires the separately installed herdr-collaboration skill."}
								</p>
								<p className="mt-1">
									Install separately from skills at{" "}
									<code>
										{instruction === "AGENTS.md"
											? "~/.codex/AGENTS.md"
											: "~/.claude/CLAUDE.md"}
									</code>
									.
								</p>
							</div>
							<pre
								className={`whitespace-pre-wrap break-words border p-4 font-mono text-xs leading-6 ${idleClass} ${headingClass}`}
							>
								<code>
									{instruction === "AGENTS.md"
										? codexInstructions
										: claudeInstructions}
								</code>
							</pre>
							<a
								className={`mt-3 inline-block text-xs underline ${accentClass}`}
								href={`https://github.com/Teinble/agent-config/blob/main/instructions/${instruction}`}
							>
								View latest on GitHub
							</a>
							<p className={`mt-2 text-xs ${mutedClass}`}>
								The source shown here is bundled with this website. GitHub may
								contain newer changes.
							</p>
						</>
					) : (
						<>
							<h2 className={`text-xl font-bold ${headingClass}`}>
								One source. Install where you work.
							</h2>
							<p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
								I maintain my skills and global instructions in
								Teinble/agent-config. This website is a guide to that
								collection.
							</p>
							<ol
								className={`mt-5 grid gap-4 text-sm leading-6 ${headingClass}`}
							>
								<li>
									<h3 className="font-bold">1. Choose your skills</h3>
									<p className={mutedClass}>
										List the collection, then install only what you need.
									</p>
									<code className="mt-2 block break-all text-xs">
										npx skills add Teinble/agent-config --list
									</code>
									<code className="mt-1 block break-all text-xs">
										npx skills add Teinble/agent-config -g -a codex claude-code
										--skill ask eli5
									</code>
								</li>
								<li>
									<h3 className="font-bold">2. Set your global defaults</h3>
									<p className={mutedClass}>
										Clone the repo to a stable path. Review the instruction
										files, adapt machine-specific paths, and back up existing
										global files before linking or copying them.
									</p>
									<a
										className={`underline ${accentClass}`}
										href="https://github.com/Teinble/agent-config#global-instructions"
									>
										Follow the global instruction setup
									</a>
								</li>
								<li>
									<h3 className="font-bold">3. Update each machine</h3>
									<code className="mt-2 block text-xs">npx skills update</code>
									<p className={mutedClass}>
										For instructions linked to your clone, run{" "}
										<code>git pull --ff-only</code> inside that clone. Copied
										instructions need to be copied again after review. Repeat on
										each machine; a Git push does not update installed files
										elsewhere.
									</p>
								</li>
							</ol>
							<p
								className={`mt-5 border-t border-current/15 pt-4 text-xs leading-5 ${mutedClass}`}
							>
								Project knowledge stays in the project repository. Recommended
								third-party tools stay upstream. This page does not track which
								machines have installed a skill.
							</p>
						</>
					)}
				</article>
			)}
		</section>
	);
};

export default AgentSkillsRegistry;
