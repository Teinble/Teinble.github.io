import {
	ArrowTopRightOnSquareIcon,
	BanknotesIcon,
	BuildingOffice2Icon,
	CodeBracketSquareIcon,
	CommandLineIcon,
	DocumentTextIcon,
	FolderIcon,
	HomeIcon,
	MoonIcon,
	SparklesIcon,
	SunIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import {
	type ComponentType,
	type FormEvent,
	type SVGProps,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AgentSkillsRegistry from "../../components/AgentSkillsRegistry";
import SetupRegistry, { type SetupPane } from "../../components/SetupRegistry";
import { agentSkills } from "../../content/agentSkills";
import {
	education,
	type PortfolioItem,
	pathToDocument,
	resources,
	spaces,
	terminalDocuments,
} from "../../content/portfolio";
import { setupApplications, setupConfigurations } from "../../content/setup";
import GithubActivity from "./GithubActivity";
import MobileSwitcher from "./MobileSwitcher";

interface TerminalShellProps {
	nightMode: boolean;
	onShowPlain: () => void;
	onToggleTheme: () => void;
}

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type CommandOutput = {
	title: string;
	sections: {
		label: string;
		rows: { command: string; description: string }[];
	}[];
};

const itemIcons: Record<string, IconComponent> = {
	home: HomeIcon,
	bosonai: BuildingOffice2Icon,
	iqbank: BanknotesIcon,
	xiaomi: BuildingOffice2Icon,
	notes: DocumentTextIcon,
	setup: CodeBracketSquareIcon,
	skills: SparklesIcon,
};

const statusClasses: Record<NonNullable<PortfolioItem["status"]>, string> = {
	active: "bg-[var(--term-green)]",
	inactive: "bg-[var(--term-muted)]/45",
	idle: "border border-[var(--term-blue)]",
	saved: "bg-[var(--term-yellow)]",
	external: "bg-[var(--term-cyan)]",
};

const SIDEBAR_MIN_WIDTH = 208;
const SIDEBAR_MAX_WIDTH = 336;
const SIDEBAR_DEFAULT_WIDTH = 240;

const getInitialSidebarWidth = () => {
	const savedValue = window.localStorage.getItem("terminal-sidebar-width");
	if (!savedValue) return SIDEBAR_DEFAULT_WIDTH;
	const savedWidth = Number(savedValue);
	if (!Number.isFinite(savedWidth)) return SIDEBAR_DEFAULT_WIDTH;
	return Math.min(Math.max(savedWidth, SIDEBAR_MIN_WIDTH), SIDEBAR_MAX_WIDTH);
};

const shellCommands = Array.from(
	new Set([
		"help",
		"help setup",
		"help skills",
		"home",
		"bosonai",
		"iqbank",
		"xiaomi",
		"notes",
		"setup",
		"setup applications",
		"setup configurations",
		"setup mac",
		"setup linux",
		"config",
		"dotfiles",
		"linux-server",
		"skills",
		"cat skills",
		"plain",
		"theme",
		...setupApplications.map((application) => application.id),
		...setupConfigurations.map((configuration) => `config ${configuration.id}`),
		...agentSkills.map((skill) => skill.id),
	]),
);

const SidebarGroup = ({
	activeId,
	items,
	label,
	onSelect,
}: {
	activeId: string;
	items: PortfolioItem[];
	label: string;
	onSelect: (item: PortfolioItem) => void;
}) => (
	<section className="border-b border-[var(--term-border)] py-2 last:border-b-0">
		<h2 className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--term-muted)]">
			{label}
		</h2>
		<div className="px-1.5">
			{items.map((item) => {
				const Icon = itemIcons[item.id] ?? FolderIcon;
				return (
					<button
						key={item.id}
						type="button"
						onClick={() => onSelect(item)}
						className={`group flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left transition-colors hover:bg-[var(--term-selection)] ${
							activeId === item.id ? "bg-[var(--term-selection)]" : ""
						}`}
					>
						<Icon className="size-4 shrink-0 text-[var(--term-blue)]" />
						<span className="min-w-0 flex-1">
							<span className="block text-xs font-bold leading-4 text-[var(--term-text)]">
								{item.label}
							</span>
							<span className="block truncate text-[10px] leading-3.5 text-[var(--term-muted)]">
								{item.detail}
							</span>
						</span>
						{item.status && (
							<span
								className={`size-1.5 shrink-0 rounded-full ${statusClasses[item.status]}`}
							/>
						)}
					</button>
				);
			})}
		</div>
	</section>
);

const AgnosterPrompt = ({
	command,
	directory = "~/portfolio",
}: {
	command: string;
	directory?: string;
}) => (
	<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-[15px]">
		<span className="bg-[var(--term-green)] px-2 py-0.5 font-bold text-[var(--term-bg)]">
			xiling@portfolio
		</span>
		<span className="bg-[var(--term-blue)] px-2 py-0.5 font-bold text-[var(--term-bg)]">
			{directory}
		</span>
		<span className="text-[var(--term-purple)]">❯</span>
		<span className="text-[var(--term-heading)]">{command}</span>
	</div>
);

const ProfileStat = ({ label, value }: { label: string; value: string }) => (
	<div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-b border-[var(--term-border)]/60 py-2 last:border-b-0">
		<dt className="text-xs font-bold uppercase tracking-wider text-[var(--term-purple)]">
			{label}
		</dt>
		<dd className="text-sm leading-6 text-[var(--term-text)]">{value}</dd>
	</div>
);

const emphasisTerms = [
	"ComplexFuncBench (Audio)",
	"University of Toronto",
	"Machine Learning Engineer",
	"GitHub Actions",
	"Hugging Face",
	"Higgs Realtime",
	"Instruct-FD",
	"Tailwind CSS",
	"Xiaomi IoT",
	"BosonAI",
	"DeepEval",
	"LangChain",
	"TypeScript",
	"Homebrew",
	"PyTorch",
	"MScAC",
	"IQBank",
	"Docker",
	"Python",
	"React",
	"Biome",
	"Vitest",
	"Herdr",
	"agnoster",
	"Git",
	"SSH",
	"zsh",
	"tmux",
	"Node",
	"GPU",
	"PDF",
	"LLM",
	"NLP",
	"CI",
	"AI",
] as const;

const escapePattern = (value: string) =>
	value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const termPattern = emphasisTerms
	.map((term) => {
		const startBoundary = /^\w/.test(term) ? "\\b" : "";
		const endBoundary = /\w$/.test(term) ? "\\b" : "";
		return `${startBoundary}${escapePattern(term)}${endBoundary}`;
	})
	.join("|");

const emphasisPattern = new RegExp(
	`(${termPattern}|\\d[\\d,.]*(?:\\/[\\d.]+)?(?:[+×%])?)`,
	"gi",
);

const EmphasizedText = ({
	text,
	emphasizeLead = false,
}: {
	text: string;
	emphasizeLead?: boolean;
}) => {
	const firstSpace = text.indexOf(" ");
	const lead = emphasizeLead
		? text.slice(0, firstSpace === -1 ? text.length : firstSpace)
		: "";
	const remainder = emphasizeLead
		? text.slice(firstSpace === -1 ? text.length : firstSpace + 1)
		: text;
	let offset = 0;
	const parts = remainder
		.split(emphasisPattern)
		.filter(Boolean)
		.map((part) => {
			const token = { part, offset };
			offset += part.length;
			return token;
		});

	return (
		<>
			{lead && (
				<>
					<strong className="font-bold text-[var(--term-heading)]">
						{lead}
					</strong>
					{remainder && " "}
				</>
			)}
			{parts.map(({ part, offset: tokenOffset }) => {
				const isTerm = emphasisTerms.some(
					(term) => term.toLowerCase() === part.toLowerCase(),
				);
				const isMetric = /^\d/.test(part);
				if (!isTerm && !isMetric) return part;
				return (
					<strong
						key={`${tokenOffset}-${part}`}
						className={`font-bold ${isMetric ? "text-[var(--term-green)]" : "text-[var(--term-cyan)]"}`}
					>
						{part}
					</strong>
				);
			})}
		</>
	);
};

const HomeDashboard = ({ onOpen }: { onOpen: (id: string) => void }) => (
	<div className="home-dashboard mx-auto w-full max-w-6xl px-5 py-5 sm:px-7">
		<div className="home-dashboard-prompt">
			<AgnosterPrompt command="neofetch --profile xiling" />
		</div>

		<section className="home-dashboard-profile mt-6 grid gap-5 border border-[var(--term-border)] bg-[var(--term-panel)] p-4 sm:p-5 lg:grid-cols-[10rem_minmax(0,1fr)]">
			<div>
				<div className="relative mx-auto aspect-square max-w-52 overflow-hidden border border-[var(--term-border)] bg-[var(--term-selection)] p-1">
					<img
						src="/profile1.JPG"
						alt="Xiling Zhao"
						className="size-full object-cover grayscale-[15%]"
					/>
					<div className="absolute bottom-2 left-2 bg-[var(--term-bg)]/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--term-green)]">
						online
					</div>
				</div>
				<div className="mt-3 grid grid-cols-8 gap-1" aria-hidden="true">
					{[
						"--term-red",
						"--term-yellow",
						"--term-green",
						"--term-cyan",
						"--term-blue",
						"--term-purple",
						"--term-muted",
						"--term-heading",
					].map((color) => (
						<span
							key={color}
							className="h-2"
							style={{ backgroundColor: `var(${color})` }}
						/>
					))}
				</div>
			</div>

			<div className="min-w-0">
				<p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--term-cyan)]">
					xiling@toronto
				</p>
				<h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--term-heading)] sm:text-5xl">
					Xiling Zhao
				</h1>
				<p className="mt-2 text-base text-[var(--term-muted)] sm:text-lg">
					Will · machine learning engineer · builder
				</p>

				<dl className="mt-5 border-y border-[var(--term-border)]">
					<ProfileStat
						label="role"
						value="Machine Learning Engineer · BosonAI"
					/>
					<ProfileStat
						label="focus"
						value="Deeply focused tools · easy for everyone · hardcore under the hood"
					/>
					<ProfileStat
						label="study"
						value={`${education.graduate.short} · ${education.school}`}
					/>
					<ProfileStat
						label="gpa"
						value={`MScAC ${education.graduate.gpa} · BSc ${education.undergraduate.gpa}`}
					/>
				</dl>

				<div className="mt-4 flex flex-wrap gap-2">
					{[
						["GitHub", "https://github.com/Teinble"],
						["X @Teinble", "https://x.com/Teinble"],
						["LinkedIn", "https://www.linkedin.com/in/xilingzhao/"],
						["Email", "mailto:xiling.zhao@mail.utoronto.ca"],
					].map(([label, href]) => (
						<a
							key={href}
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noreferrer" : undefined}
							className="inline-flex items-center gap-1.5 border border-[var(--term-border)] bg-[var(--term-bg)] px-3 py-2 text-xs font-bold text-[var(--term-blue)] hover:border-[var(--term-blue)] hover:bg-[var(--term-selection)]"
						>
							{label}
							<ArrowTopRightOnSquareIcon className="size-3.5" />
						</a>
					))}
				</div>
			</div>
		</section>

		<div className="home-dashboard-side min-w-0">
			<GithubActivity className="home-dashboard-activity mt-6" compact />

			<section className="home-dashboard-quick mt-5">
				<div className="mb-3 flex items-center justify-between gap-3">
					<h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--term-muted)]">
						Quick commands
					</h2>
					<span className="text-[11px] text-[var(--term-muted)]">
						click or type below
					</span>
				</div>
				<div className="grid gap-2 sm:grid-cols-2">
					{[
						["bosonai", "Current ML engineering role", BuildingOffice2Icon],
						["iqbank", "Previous founder project", BanknotesIcon],
						["setup", "Apps and configurations", CodeBracketSquareIcon],
						["skills", "Agent skills I use daily", SparklesIcon],
					].map(([id, description, Icon]) => {
						const CommandIcon = Icon as IconComponent;
						return (
							<button
								key={id as string}
								type="button"
								onClick={() => onOpen(id as string)}
								className="group flex items-center gap-3 border border-[var(--term-border)] bg-[var(--term-panel)] p-3 text-left hover:border-[var(--term-blue)] hover:bg-[var(--term-selection)]"
							>
								<CommandIcon className="size-5 shrink-0 text-[var(--term-cyan)]" />
								<span>
									<strong className="block text-sm text-[var(--term-heading)]">
										$ open {id as string}
									</strong>
									<span className="text-[11px] text-[var(--term-muted)]">
										{description as string}
									</span>
								</span>
							</button>
						);
					})}
				</div>
			</section>
		</div>
	</div>
);

const DocumentView = ({ activeId }: { activeId: string }) => {
	const document = terminalDocuments[activeId] ?? terminalDocuments.home;

	return (
		<article className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-7 sm:py-6">
			<AgnosterPrompt
				command={document.command}
				directory={document.directory}
			/>

			<header className="mt-5 border-l-2 border-[var(--term-cyan)] bg-[var(--term-panel)] px-4 py-3 sm:px-5 sm:py-4">
				<p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--term-muted)]">
					{document.directory}
				</p>
				<h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--term-heading)] sm:text-4xl">
					{document.title}
				</h1>
				<p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--term-text)] sm:text-[15px]">
					<EmphasizedText text={document.intro} />
				</p>
				{document.meta && (
					<div className="mt-3 flex flex-wrap gap-1.5">
						{document.meta.map((item) => (
							<span
								key={item}
								className="border border-[var(--term-border)] bg-[var(--term-bg)] px-2 py-1 text-[10px] font-bold text-[var(--term-blue)]"
							>
								<EmphasizedText text={item} />
							</span>
						))}
					</div>
				)}
			</header>

			<div className="mt-4 grid gap-px border border-[var(--term-border)] bg-[var(--term-border)] lg:grid-cols-2">
				{document.sections.map((section, index) => (
					<section
						key={section.heading}
						className={`min-w-0 bg-[var(--term-panel)] p-4 ${
							document.sections.length % 2 === 1 &&
							index === document.sections.length - 1
								? "lg:col-span-2"
								: ""
						}`}
					>
						<div className="mb-2.5 flex items-center gap-2 border-b border-[var(--term-border)] pb-2">
							<span className="grid size-5 place-items-center bg-[var(--term-selection)] text-[10px] font-bold text-[var(--term-purple)]">
								{String(index + 1).padStart(2, "0")}
							</span>
							<h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--term-heading)]">
								{section.heading}
							</h2>
						</div>
						{section.body && (
							<p className="text-sm leading-6 text-[var(--term-text)]">
								<EmphasizedText text={section.body} />
							</p>
						)}
						{section.items && (
							<ul
								className={`${section.body ? "mt-3" : ""} space-y-1.5 text-sm leading-6 text-[var(--term-text)]`}
							>
								{section.items.map((item) => (
									<li
										key={item}
										className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2"
									>
										<span className="font-bold text-[var(--term-green)]">
											›
										</span>
										<span>
											<EmphasizedText text={item} emphasizeLead />
										</span>
									</li>
								))}
							</ul>
						)}
						{section.links && (
							<div className={`grid gap-1.5 ${section.body ? "mt-3" : ""}`}>
								{section.links.map((link) => (
									<a
										key={link.href}
										href={link.href}
										target={link.href.startsWith("http") ? "_blank" : undefined}
										rel={
											link.href.startsWith("http") ? "noreferrer" : undefined
										}
										className="flex items-center justify-between gap-3 border border-[var(--term-border)] bg-[var(--term-bg)] px-3 py-2 text-xs font-bold text-[var(--term-blue)] hover:border-[var(--term-blue)] hover:bg-[var(--term-selection)]"
									>
										{link.label}
										<ArrowTopRightOnSquareIcon className="size-4 shrink-0" />
									</a>
								))}
							</div>
						)}
					</section>
				))}
			</div>
		</article>
	);
};

const CommandBar = ({
	feedback,
	inputId,
	onRun,
	output,
	onDismissOutput,
}: {
	feedback: string;
	inputId: string;
	onRun: (command: string) => void;
	output: CommandOutput | null;
	onDismissOutput: () => void;
}) => {
	const [command, setCommand] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [draftCommand, setDraftCommand] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestions = useMemo(() => {
		const query = command.trim().toLowerCase();
		if (!query) return [];
		return shellCommands
			.filter((candidate) => candidate.startsWith(query) && candidate !== query)
			.slice(0, 5);
	}, [command]);
	const selectedSuggestion = suggestions[0];
	const completionSuffix = selectedSuggestion?.startsWith(command.toLowerCase())
		? selectedSuggestion.slice(command.length)
		: "";

	useEffect(() => {
		if (!output) return;
		const dismissOnEscape = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			event.preventDefault();
			onDismissOutput();
			inputRef.current?.focus();
		};
		window.addEventListener("keydown", dismissOnEscape);
		return () => window.removeEventListener("keydown", dismissOnEscape);
	}, [onDismissOutput, output]);

	const completeCommand = (suggestion: string) => {
		setCommand(suggestion);
		inputRef.current?.focus();
	};

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const submittedCommand = command.trim();
		if (!submittedCommand) return;
		setHistory((previous) =>
			previous[0] === submittedCommand
				? previous
				: [submittedCommand, ...previous].slice(0, 50),
		);
		setHistoryIndex(-1);
		setDraftCommand("");
		onRun(command);
		setCommand("");
	};

	return (
		<div className="relative z-20 shrink-0 border-t border-[var(--term-border)] bg-[var(--term-chrome)] px-3 py-2 sm:px-5">
			{output && (
				<section
					aria-label="Terminal command output"
					className="mb-1 max-h-40 overflow-y-auto overscroll-contain border-b border-[var(--term-border)] pb-1"
				>
					<div className="sticky top-0 flex items-center justify-between bg-[var(--term-chrome)] py-0.5">
						<h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--term-cyan)]">
							{output.title}
						</h2>
						<div className="flex items-center gap-2">
							<span className="hidden text-[9px] text-[var(--term-muted)] sm:inline">
								TAB complete · ↑↓ history · ESC close
							</span>
							<button
								type="button"
								onClick={onDismissOutput}
								aria-label="Close terminal command output"
								className="grid size-5 cursor-pointer place-items-center text-[var(--term-muted)] hover:text-[var(--term-heading)]"
							>
								<XMarkIcon className="size-3" />
							</button>
						</div>
					</div>
					<div
						className={`grid gap-x-4 gap-y-1 pt-0.5 ${output.sections.length > 1 ? "sm:grid-cols-3" : ""}`}
					>
						{output.sections.map((section) => (
							<div key={section.label}>
								<h3 className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--term-purple)]">
									{section.label}
								</h3>
								<dl className="grid gap-0.5">
									{section.rows.map((row) => (
										<div
											key={row.command}
											className="grid gap-x-2 text-[10px] leading-4 sm:grid-cols-[minmax(6.5rem,0.95fr)_minmax(0,1.05fr)]"
										>
											<dt className="font-bold text-[var(--term-blue)]">
												{row.command}
											</dt>
											<dd className="text-[var(--term-muted)]">
												{row.description}
											</dd>
										</div>
									))}
								</dl>
							</div>
						))}
					</div>
				</section>
			)}
			{feedback && (
				<p
					className="mb-1 truncate text-[11px] text-[var(--term-muted)]"
					aria-live="polite"
				>
					{feedback}
				</p>
			)}
			<form onSubmit={submit} className="flex items-center gap-2">
				<span className="font-bold text-[var(--term-green)]">xiling</span>
				<span className="font-bold text-[var(--term-purple)]">❯</span>
				<label htmlFor={inputId} className="sr-only">
					Portfolio command
				</label>
				<div className="relative min-w-0 flex-1 py-1 text-sm leading-5">
					{completionSuffix && (
						<div
							className="pointer-events-none absolute left-0 top-1 whitespace-pre leading-5 text-[var(--term-muted)]/55"
							aria-hidden="true"
						>
							<span className="invisible">{command}</span>
							{completionSuffix}
						</div>
					)}
					<input
						ref={inputRef}
						id={inputId}
						value={command}
						onChange={(event) => {
							setCommand(event.target.value);
							setHistoryIndex(-1);
						}}
						onKeyDown={(event) => {
							if (
								selectedSuggestion &&
								(event.key === "Tab" ||
									(event.key === "ArrowRight" &&
										event.currentTarget.selectionStart === command.length))
							) {
								event.preventDefault();
								completeCommand(selectedSuggestion);
								return;
							}
							if (event.key === "ArrowUp" && history.length > 0) {
								event.preventDefault();
								if (historyIndex === -1) setDraftCommand(command);
								const nextIndex = Math.min(
									historyIndex + 1,
									history.length - 1,
								);
								setHistoryIndex(nextIndex);
								setCommand(history[nextIndex]);
							}
							if (event.key === "ArrowDown" && historyIndex >= 0) {
								event.preventDefault();
								const nextIndex = historyIndex - 1;
								setHistoryIndex(nextIndex);
								setCommand(nextIndex < 0 ? draftCommand : history[nextIndex]);
							}
						}}
						placeholder="try: help, setup mac, cat skills"
						autoComplete="off"
						spellCheck={false}
						className="relative w-full bg-transparent leading-5 text-[var(--term-heading)] outline-none placeholder:text-[var(--term-muted)]/70"
					/>
				</div>
				<span className="hidden text-[10px] text-[var(--term-muted)] sm:block">
					ENTER TO RUN
				</span>
			</form>
		</div>
	);
};

const TerminalShell = ({
	nightMode,
	onShowPlain,
	onToggleTheme,
}: TerminalShellProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const mainId = useId();
	const commandInputId = useId();
	const [activeId, setActiveId] = useState(
		() => pathToDocument[location.pathname] ?? "home",
	);
	const [feedback, setFeedback] = useState(
		"type 'help' to see available commands",
	);
	const [commandOutput, setCommandOutput] = useState<CommandOutput | null>(
		null,
	);
	const [switcherOpen, setSwitcherOpen] = useState(false);
	const [setupPane, setSetupPane] = useState<SetupPane>("applications");
	const [selectedSetupConfigurationId, setSelectedSetupConfigurationId] =
		useState(setupConfigurations[0].id);
	const [expandedSetupGuideId, setExpandedSetupGuideId] = useState<
		string | null
	>(null);
	const [selectedSkillId, setSelectedSkillId] = useState(agentSkills[0].id);
	const [sidebarWidth, setSidebarWidth] = useState(getInitialSidebarWidth);
	const shellBodyRef = useRef<HTMLDivElement>(null);
	const resizingSidebarRef = useRef(false);

	useEffect(() => {
		window.localStorage.setItem("terminal-sidebar-width", String(sidebarWidth));
	}, [sidebarWidth]);

	useEffect(() => {
		const routeDocument = pathToDocument[location.pathname];
		if (routeDocument) setActiveId(routeDocument);
	}, [location.pathname]);

	const selectItem = useCallback(
		(item: PortfolioItem) => {
			setActiveId(item.id);
			setFeedback(`opened ${item.label}`);
			setSwitcherOpen(false);
			if (item.path) navigate(item.path);
		},
		[navigate],
	);

	const openById = useCallback(
		(id: string) => {
			const item = [...spaces, ...resources].find(
				(candidate) => candidate.id === id,
			);
			if (item) selectItem(item);
		},
		[selectItem],
	);

	const runCommand = (rawCommand: string) => {
		const normalized = rawCommand.trim().toLowerCase();
		if (!normalized) return;
		setCommandOutput(null);
		if (normalized === "help" || normalized.startsWith("help ")) {
			const helpSections: CommandOutput["sections"] = [
				{
					label: "Navigation",
					rows: [
						{
							command: "home · bosonai · iqbank",
							description: "Portfolio and work",
						},
						{
							command: "notes · plain · theme",
							description: "Notes, view, theme",
						},
					],
				},
				{
					label: "Setup",
					rows: [
						{
							command: "setup mac · setup linux",
							description: "Machine setup guides",
						},
						{
							command: "config <name> · dotfiles",
							description: "Application settings",
						},
					],
				},
				{
					label: "Skills",
					rows: [
						{
							command: "skills · cat skills",
							description: "Browse or list skills",
						},
						{
							command: "ask · eli5 · review-fix-loop",
							description: "Open a specific skill",
						},
					],
				},
			];
			const topic = normalized.replace(/^help\s*/, "");
			const matchingSections = topic
				? helpSections.filter((section) =>
						section.label.toLowerCase().startsWith(topic),
					)
				: helpSections;
			if (matchingSections.length === 0) {
				setFeedback(`unknown help topic: ${topic} · try 'help'`);
				return;
			}
			setCommandOutput({
				title: topic ? `Help: ${topic}` : "Available commands",
				sections: matchingSections,
			});
			setFeedback(
				"commands: home · setup · skills · cat skills · help <topic>",
			);
			return;
		}
		if (normalized === "cat skills") {
			setCommandOutput({
				title: "Available skills",
				sections: [
					{
						label: "Personal and recommended",
						rows: agentSkills.map((skill) => ({
							command: skill.id,
							description: skill.summary,
						})),
					},
				],
			});
			setFeedback(
				`${agentSkills.length} skills · type a skill name to open it`,
			);
			return;
		}
		if (normalized === "plain") {
			onShowPlain();
			return;
		}
		if (normalized === "theme") {
			onToggleTheme();
			setFeedback("theme toggled");
			return;
		}

		const target = normalized.replace(/^(open|cd|cat)\s+/, "");
		const guideAliases: Record<string, "macos" | "linux"> = {
			"setup mac": "macos",
			"setup guide mac": "macos",
			"new-mac": "macos",
			mac: "macos",
			"setup linux": "linux",
			"setup guide linux": "linux",
			"linux-server": "linux",
			linux: "linux",
		};
		const guideId = guideAliases[target];
		if (guideId) {
			setSetupPane("applications");
			setExpandedSetupGuideId(guideId);
			openById("setup");
			setFeedback(
				`opened ${guideId === "macos" ? "Mac" : "Linux"} setup guide`,
			);
			return;
		}
		const configurationTarget = target.match(/^(?:setup )?config\s+(.+)$/)?.[1];
		const configuration = setupConfigurations.find(
			(candidate) =>
				candidate.id === configurationTarget ||
				candidate.name.toLowerCase() === configurationTarget,
		);
		if (configuration) {
			setSelectedSetupConfigurationId(configuration.id);
			setSetupPane("configurations");
			openById("setup");
			setFeedback(`opened ${configuration.name}`);
			return;
		}
		const skillTarget = target.replace(/^skills\s+/, "");
		const skill = agentSkills.find(
			(candidate) =>
				candidate.id === skillTarget || candidate.command === skillTarget,
		);
		if (skill) {
			setSelectedSkillId(skill.id);
			openById("skills");
			setFeedback(`opened ${skill.command}`);
			return;
		}
		if (
			target === "config" ||
			target === "configurations" ||
			target === "setup configurations"
		) {
			setSetupPane("configurations");
			openById("setup");
			setFeedback("opened setup configurations");
			return;
		}
		if (target === "setup applications") {
			setSetupPane("applications");
			openById("setup");
			return;
		}
		if (target === "dotfiles") {
			setSelectedSetupConfigurationId("zshrc");
			setSetupPane("configurations");
			openById("setup");
			setFeedback("opened dotfiles configuration");
			return;
		}
		const application = setupApplications.find(
			(candidate) => candidate.id === target,
		);
		if (application) {
			if (application.configurationId) {
				setSelectedSetupConfigurationId(application.configurationId);
				setSetupPane("configurations");
			} else {
				setSetupPane("applications");
			}
			openById("setup");
			setFeedback(`opened ${application.name}`);
			return;
		}
		const aliases: Record<string, string> = {
			about: "home",
			whoami: "home",
			boson: "bosonai",
			uses: "setup",
		};
		const targetId = aliases[target] ?? target;
		const item = [...spaces, ...resources].find(
			(candidate) => candidate.id === targetId || candidate.label === targetId,
		);
		if (item) {
			selectItem(item);
			return;
		}
		setFeedback(`command not found: ${normalized} · try 'help'`);
	};

	const activeLabel = [...spaces, ...resources].find(
		(item) => item.id === activeId,
	)?.label;

	return (
		<div className="terminal-app h-screen overflow-hidden bg-[var(--term-bg)] font-mono text-[var(--term-text)]">
			<a
				href={`#${mainId}`}
				className="fixed left-3 top-3 z-[60] -translate-y-24 bg-[var(--term-blue)] px-3 py-2 text-sm text-[var(--term-bg)] focus:translate-y-0"
			>
				Skip to content
			</a>
			<header className="flex h-11 items-center border-b border-[var(--term-border)] bg-[var(--term-chrome)] px-3 sm:px-4">
				<div
					className="mr-4 hidden items-center gap-2 sm:flex"
					aria-hidden="true"
				>
					<span className="size-2.5 rounded-full bg-[#ff5f57]" />
					<span className="size-2.5 rounded-full bg-[#febc2e]" />
					<span className="size-2.5 rounded-full bg-[#28c840]" />
				</div>
				<CommandLineIcon className="mr-2 size-4 text-[var(--term-cyan)]" />
				<strong className="min-w-0 flex-1 truncate text-xs text-[var(--term-muted)] sm:text-sm">
					portfolio://xiling/{activeLabel ?? "home"}
				</strong>
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={onShowPlain}
						className="border border-[var(--term-border)] px-2.5 py-1 text-xs font-bold text-[var(--term-muted)] hover:bg-[var(--term-selection)] hover:text-[var(--term-heading)] sm:px-3"
					>
						Plain view
					</button>
					<button
						type="button"
						onClick={onToggleTheme}
						className="grid size-7 place-items-center border border-[var(--term-border)] text-[var(--term-muted)] hover:bg-[var(--term-selection)] hover:text-[var(--term-heading)]"
						aria-label={`Switch to ${nightMode ? "light" : "dark"} theme`}
					>
						{nightMode ? (
							<SunIcon className="size-4" />
						) : (
							<MoonIcon className="size-4" />
						)}
					</button>
				</div>
			</header>

			<div
				ref={shellBodyRef}
				className="h-[calc(100vh-2.75rem)] md:grid"
				style={{
					gridTemplateColumns: `${sidebarWidth}px 5px minmax(0, 1fr)`,
				}}
			>
				<aside className="hidden h-full min-h-0 flex-col overflow-hidden bg-[var(--term-panel)] md:flex">
					<div className="shrink-0 border-b border-[var(--term-border)] px-3 py-2">
						<p className="text-[10px] uppercase tracking-[0.2em] text-[var(--term-muted)]">
							workspace
						</p>
						<p className="mt-0.5 text-[13px] font-bold text-[var(--term-heading)]">
							xiling.dev
						</p>
					</div>
					<nav
						aria-label="Sidebar navigation"
						className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
					>
						<SidebarGroup
							activeId={activeId}
							items={spaces}
							label="Spaces"
							onSelect={selectItem}
						/>
						<SidebarGroup
							activeId={activeId}
							items={resources}
							label="Resources"
							onSelect={selectItem}
						/>
					</nav>
					<footer className="shrink-0 border-t border-[var(--term-border)] px-3 py-2 text-[10px] leading-4 text-[var(--term-muted)]">
						<p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em]">
							Status
						</p>
						<div className="flex flex-wrap gap-x-2.5">
							<span>
								<i className="mr-1.5 inline-block size-1.5 rounded-full bg-[var(--term-green)]" />
								current
							</span>
							<span>
								<i className="mr-1.5 inline-block size-1.5 rounded-full bg-[var(--term-muted)]/45" />
								past
							</span>
							<span>
								<i className="mr-1.5 inline-block size-1.5 rounded-full bg-[var(--term-cyan)]" />
								ready
							</span>
							<span>
								<i className="mr-1.5 inline-block size-1.5 rounded-full bg-[var(--term-yellow)]" />
								planned
							</span>
							<span>
								<i className="mr-1.5 inline-block size-1.5 rounded-full border border-[var(--term-blue)]" />
								exploring
							</span>
						</div>
						<p className="mt-1.5 border-t border-[var(--term-border)] pt-1.5 text-[9px] leading-3.5">
							<span className="text-[var(--term-purple)]">zsh/agnoster</span>
							{" · "}night owl {nightMode ? "dark" : "light"}
							{" · "}Toronto/EDT
						</p>
					</footer>
				</aside>
				<hr
					aria-label="Resize sidebar"
					aria-orientation="vertical"
					aria-valuemin={SIDEBAR_MIN_WIDTH}
					aria-valuemax={SIDEBAR_MAX_WIDTH}
					aria-valuenow={sidebarWidth}
					tabIndex={0}
					title="Drag to resize sidebar · double-click to reset"
					className="group relative m-0 hidden h-full touch-none cursor-col-resize border-0 bg-[var(--term-border)] outline-none hover:bg-[var(--term-blue)] focus-visible:bg-[var(--term-blue)] md:block"
					onDoubleClick={() => setSidebarWidth(SIDEBAR_DEFAULT_WIDTH)}
					onKeyDown={(event) => {
						const step = event.shiftKey ? 24 : 8;
						if (event.key === "ArrowLeft") {
							event.preventDefault();
							setSidebarWidth((width) =>
								Math.max(SIDEBAR_MIN_WIDTH, width - step),
							);
						}
						if (event.key === "ArrowRight") {
							event.preventDefault();
							setSidebarWidth((width) =>
								Math.min(SIDEBAR_MAX_WIDTH, width + step),
							);
						}
						if (event.key === "Home") {
							event.preventDefault();
							setSidebarWidth(SIDEBAR_MIN_WIDTH);
						}
						if (event.key === "End") {
							event.preventDefault();
							setSidebarWidth(SIDEBAR_MAX_WIDTH);
						}
					}}
					onPointerDown={(event) => {
						resizingSidebarRef.current = true;
						event.currentTarget.setPointerCapture(event.pointerId);
					}}
					onPointerMove={(event) => {
						if (!resizingSidebarRef.current) return;
						const left =
							shellBodyRef.current?.getBoundingClientRect().left ?? 0;
						setSidebarWidth(
							Math.min(
								SIDEBAR_MAX_WIDTH,
								Math.max(SIDEBAR_MIN_WIDTH, event.clientX - left),
							),
						);
					}}
					onPointerUp={(event) => {
						resizingSidebarRef.current = false;
						event.currentTarget.releasePointerCapture(event.pointerId);
					}}
					onLostPointerCapture={() => {
						resizingSidebarRef.current = false;
					}}
				/>

				<main
					id={mainId}
					className="terminal-main-panel flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
				>
					<div className="grid grid-cols-[minmax(0,1fr)_7rem] border-b border-[var(--term-border)] bg-[var(--term-panel)] md:hidden">
						<div className="min-w-0 px-4 py-2">
							<strong className="block truncate text-sm text-[var(--term-heading)]">
								⌁ {activeLabel}
							</strong>
							<span className="block truncate text-xs text-[var(--term-muted)]">
								xiling.dev · terminal
							</span>
						</div>
						<button
							type="button"
							onClick={() => setSwitcherOpen(true)}
							className="border-l border-[var(--term-border)] bg-[var(--term-selection)] text-sm font-bold text-[var(--term-heading)]"
						>
							switch
						</button>
					</div>
					<div className="sticky top-0 z-10 hidden h-10 items-stretch border-b border-[var(--term-border)] bg-[var(--term-panel)] md:flex">
						{activeId === "setup" ? (
							<>
								<button
									type="button"
									onClick={() => setSetupPane("applications")}
									aria-pressed={setupPane === "applications"}
									className={`flex items-center border-r border-[var(--term-border)] px-4 text-xs font-bold ${setupPane === "applications" ? "bg-[var(--term-selection)] text-[var(--term-purple)]" : "text-[var(--term-muted)] hover:bg-[var(--term-selection)]"}`}
								>
									⌁ setup
								</button>
								<button
									type="button"
									onClick={() => setSetupPane("configurations")}
									aria-pressed={setupPane === "configurations"}
									className={`flex items-center border-r border-[var(--term-border)] px-4 text-xs font-bold ${setupPane === "configurations" ? "bg-[var(--term-selection)] text-[var(--term-purple)]" : "text-[var(--term-muted)] hover:bg-[var(--term-selection)]"}`}
								>
									⌁ configurations
								</button>
							</>
						) : (
							<div className="flex items-center border-r border-[var(--term-border)] bg-[var(--term-selection)] px-4 text-xs font-bold text-[var(--term-purple)]">
								⌁ {activeLabel ?? "home"}
							</div>
						)}
						<div className="flex items-center px-4 text-xs text-[var(--term-muted)]">
							terminal · zsh
						</div>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
						{activeId === "home" ? (
							<HomeDashboard onOpen={openById} />
						) : activeId === "setup" ? (
							<SetupRegistry
								variant="terminal"
								pane={setupPane}
								onPaneChange={setSetupPane}
								selectedConfigurationId={selectedSetupConfigurationId}
								onConfigurationChange={setSelectedSetupConfigurationId}
								expandedGuideId={expandedSetupGuideId}
								onGuideChange={setExpandedSetupGuideId}
							/>
						) : activeId === "skills" ? (
							<AgentSkillsRegistry
								variant="terminal"
								selectedSkillId={selectedSkillId}
								onSkillChange={setSelectedSkillId}
							/>
						) : (
							<DocumentView activeId={activeId} />
						)}
					</div>
					<CommandBar
						feedback={feedback}
						inputId={commandInputId}
						onRun={runCommand}
						output={commandOutput}
						onDismissOutput={() => setCommandOutput(null)}
					/>
				</main>
			</div>

			<MobileSwitcher
				activeId={activeId}
				isOpen={switcherOpen}
				nightMode={nightMode}
				onClose={() => setSwitcherOpen(false)}
				onSelect={selectItem}
				resources={resources}
				spaces={spaces}
			/>
		</div>
	);
};

export default TerminalShell;
