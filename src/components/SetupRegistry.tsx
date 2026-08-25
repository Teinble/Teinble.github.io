import {
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
	CheckIcon,
	ChevronDownIcon,
	ClipboardDocumentIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
	setupAgentGuides,
	setupApplications,
	setupCategories,
	setupConfigurations,
} from "../content/setup";

export type SetupPane = "applications" | "configurations";

const SetupRegistry = ({
	variant,
	pane,
	onPaneChange,
	selectedConfigurationId: controlledConfigurationId,
	onConfigurationChange,
	expandedGuideId: controlledGuideId,
	onGuideChange,
}: {
	variant: "terminal" | "plain";
	pane?: SetupPane;
	onPaneChange?: (pane: SetupPane) => void;
	selectedConfigurationId?: string;
	onConfigurationChange?: (id: string) => void;
	expandedGuideId?: string | null;
	onGuideChange?: (id: string | null) => void;
}) => {
	const terminal = variant === "terminal";
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const [localGuideId, setLocalGuideId] = useState<string | null>(null);
	const [localPane, setLocalPane] = useState<SetupPane>("applications");
	const [localConfigurationId, setLocalConfigurationId] = useState(
		setupConfigurations[0].id,
	);
	const activePane = pane ?? localPane;
	const setActivePane = onPaneChange ?? setLocalPane;
	const expandedGuideId =
		controlledGuideId === undefined ? localGuideId : controlledGuideId;
	const setExpandedGuideId = onGuideChange ?? setLocalGuideId;
	const selectedConfigurationId =
		controlledConfigurationId ?? localConfigurationId;
	const setSelectedConfigurationId =
		onConfigurationChange ?? setLocalConfigurationId;
	const selectedConfiguration =
		setupConfigurations.find(
			(configuration) => configuration.id === selectedConfigurationId,
		) ?? setupConfigurations[0];
	const frame = terminal
		? "border border-[var(--term-border)] bg-[var(--term-panel)]"
		: "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#1a1a1a]";
	const heading = terminal
		? "text-[var(--term-heading)]"
		: "text-gray-900 dark:text-white";
	const muted = terminal
		? "text-[var(--term-muted)]"
		: "text-gray-500 dark:text-gray-400";
	const accent = terminal ? "text-[var(--term-cyan)]" : "text-blue-600";
	const action = terminal
		? "border-[var(--term-border)] bg-[var(--term-bg)] text-[var(--term-blue)] hover:border-[var(--term-blue)]"
		: "rounded-md border-gray-200 text-blue-600 hover:border-blue-400 dark:border-gray-700";
	const inset = terminal
		? "border-[var(--term-border)] bg-[var(--term-bg)]"
		: "rounded-lg border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40";
	const applicationAction = `inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-1 text-[11px] font-bold transition-colors ${accent} ${terminal ? "hover:bg-[var(--term-selection)] hover:text-[var(--term-heading)]" : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"}`;

	const copyCommand = async (id: string, command: string) => {
		await navigator.clipboard.writeText(command);
		setCopiedId(id);
		window.setTimeout(() => setCopiedId(null), 1800);
	};

	return (
		<section
			className={
				terminal
					? `mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 ${activePane === "configurations" ? "lg:flex lg:h-full lg:min-h-0 lg:flex-col" : ""}`
					: ""
			}
			aria-labelledby={`${variant}-setup-title`}
		>
			<header className={`${frame} px-4 py-3 sm:px-5`}>
				<p
					className={`text-[11px] font-bold uppercase tracking-[0.15em] ${accent}`}
				>
					{terminal
						? activePane === "configurations"
							? "$ setup config --list"
							: "$ setup --list"
						: "My everyday environment"}
				</p>
				<h1
					id={`${variant}-setup-title`}
					className={`mt-0.5 text-xl font-bold sm:text-2xl ${heading}`}
				>
					{activePane === "configurations" ? "Configurations" : "My setup"}
				</h1>
				<p className={`mt-1 max-w-2xl text-sm leading-6 ${muted}`}>
					{activePane === "configurations"
						? "Browse my portable environment and Obsidian settings, then download what you need."
						: "The applications I use every day to make a new machine feel like mine."}
				</p>
				<div className={`mt-2 flex gap-1 ${terminal ? "md:hidden" : ""}`}>
					{(["applications", "configurations"] as const).map((option) => (
						<button
							key={option}
							type="button"
							onClick={() => setActivePane(option)}
							aria-pressed={activePane === option}
							className={`border px-3 py-1.5 text-xs font-bold ${
								activePane === option ? action : muted
							}`}
						>
							{option === "applications" ? "Applications" : "Configurations"}
						</button>
					))}
				</div>
			</header>

			{activePane === "applications" && (
				<div className="mt-3 grid gap-3">
					<section className={`${frame} p-3`} aria-label="Agent setup guides">
						<div className="mb-2 flex items-center justify-between gap-2">
							<h2
								className={`text-[10px] font-bold uppercase tracking-[0.16em] ${accent}`}
							>
								Agent handoff
							</h2>
							<span className={`text-[10px] ${muted}`}>
								copy and give to your agent
							</span>
						</div>
						<div className="grid gap-2 sm:grid-cols-2">
							{setupAgentGuides.map((guide) => {
								const expanded = expandedGuideId === guide.id;
								return (
									<div key={guide.id} className={`min-w-0 border ${inset}`}>
										<div className="flex min-w-0 items-center gap-1 p-2">
											<button
												type="button"
												onClick={() =>
													setExpandedGuideId(expanded ? null : guide.id)
												}
												aria-expanded={expanded}
												aria-label={`${expanded ? "Collapse" : "Expand"} ${guide.title} agent setup guide`}
												className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
											>
												<ChevronDownIcon
													className={`size-3.5 shrink-0 transition-transform ${accent} ${expanded ? "rotate-180" : ""}`}
												/>
												<span className="min-w-0">
													<strong className={`block text-xs ${heading}`}>
														{guide.title}
													</strong>
													<span
														className={`block truncate text-[10px] ${muted}`}
													>
														{guide.description}
													</span>
												</span>
											</button>
											<button
												type="button"
												onClick={() =>
													copyCommand(`guide-${guide.id}`, guide.document)
												}
												aria-label={`Copy ${guide.title} agent setup guide`}
												className={`shrink-0 border p-1.5 ${action}`}
											>
												{copiedId === `guide-${guide.id}` ? (
													<CheckIcon className="size-4" />
												) : (
													<ClipboardDocumentIcon className="size-4" />
												)}
											</button>
										</div>
										{expanded && (
											<pre
												className={`max-h-80 overflow-y-auto whitespace-pre-wrap break-words border-t p-3 font-mono text-[11px] leading-5 ${terminal ? "border-[var(--term-border)] text-[var(--term-text)]" : "border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200"}`}
											>
												{guide.document}
											</pre>
										)}
									</div>
								);
							})}
						</div>
					</section>
					<section className={`${frame} p-4`}>
						<h2
							className={`text-xs font-bold uppercase tracking-[0.16em] ${accent}`}
						>
							Applications
						</h2>
						<div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
							{setupCategories.map((category) => (
								<section key={category.id} className={`border p-3 ${inset}`}>
									<h3
										className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${muted}`}
									>
										{category.label}
									</h3>
									<div className="divide-y divide-current/10">
										{setupApplications
											.filter(
												(application) => application.category === category.id,
											)
											.map((application) => {
												return (
													<article key={application.id} className="py-2.5">
														<div className="flex flex-wrap items-center justify-between gap-2">
															<h4
																className={`flex min-w-0 items-center gap-1.5 text-sm font-bold ${heading}`}
															>
																<img
																	src={
																		application.iconUrl ??
																		`/setup/icons/${application.id}.png`
																	}
																	alt=""
																	width={24}
																	height={24}
																	className="size-6 shrink-0 object-contain"
																/>
																{application.name}
															</h4>
															<div className="flex flex-wrap items-center gap-2">
																<a
																	href={application.href}
																	target={
																		application.href.startsWith("http")
																			? "_blank"
																			: undefined
																	}
																	rel={
																		application.href.startsWith("http")
																			? "noreferrer"
																			: undefined
																	}
																	download={application.href.startsWith("/")}
																	aria-label={application.linkLabel}
																	className={applicationAction}
																>
																	{application.id === "homebrew"
																		? "Install"
																		: application.category === "portable"
																			? "GitHub"
																			: "Download"}
																	<ArrowTopRightOnSquareIcon className="size-3" />
																</a>
																{application.configurationId && (
																	<button
																		type="button"
																		onClick={() => {
																			setSelectedConfigurationId(
																				application.configurationId ??
																					"ghostty",
																			);
																			setActivePane("configurations");
																		}}
																		aria-label={`View ${application.name} configuration`}
																		className={applicationAction}
																	>
																		<Cog6ToothIcon className="size-3" />
																		Config
																	</button>
																)}
															</div>
														</div>
														<p className={`mt-0.5 text-xs leading-5 ${muted}`}>
															{application.summary}
														</p>
														{application.installCommand && (
															<button
																type="button"
																onClick={() =>
																	copyCommand(
																		application.id,
																		application.installCommand ?? "",
																	)
																}
																aria-label={`Copy ${application.name} install command`}
																className={`mt-1.5 inline-flex max-w-full items-center gap-2 border px-2 py-1 font-mono text-[10px] ${action}`}
															>
																{copiedId === application.id ? (
																	<CheckIcon className="size-3 shrink-0" />
																) : (
																	<ClipboardDocumentIcon className="size-3 shrink-0" />
																)}
																<span className="truncate">
																	{application.installCommand}
																</span>
															</button>
														)}
													</article>
												);
											})}
									</div>
								</section>
							))}
						</div>
					</section>
				</div>
			)}

			{activePane === "configurations" && (
				<div
					className={`mt-3 grid min-w-0 gap-3 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.25fr)] ${terminal ? "lg:min-h-0 lg:flex-1" : ""}`}
				>
					<section
						aria-label="Configuration files"
						className={`${frame} min-w-0 p-2 ${terminal ? "lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain" : ""}`}
					>
						{(["dotfiles", "linux", "environment", "obsidian"] as const).map(
							(group) => (
								<div key={group} className="mb-2 last:mb-0">
									<h2
										className={`px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider ${accent}`}
									>
										{
											{
												dotfiles: "Dotfiles",
												linux: "Linux server",
												environment: "Environment",
												obsidian: "Obsidian",
											}[group]
										}
									</h2>
									{setupConfigurations
										.filter((configuration) => configuration.group === group)
										.map((configuration) => (
											<button
												key={configuration.id}
												type="button"
												onClick={() =>
													setSelectedConfigurationId(configuration.id)
												}
												aria-pressed={
													selectedConfiguration.id === configuration.id
												}
												className={`mb-1 block w-full border p-2.5 text-left last:mb-0 ${
													selectedConfiguration.id === configuration.id
														? action
														: inset
												}`}
											>
												<strong className={`block text-xs ${heading}`}>
													{configuration.name}
												</strong>
												{configuration.path && (
													<span
														className={`mt-0.5 block truncate font-mono text-[10px] ${muted}`}
													>
														{configuration.path}
													</span>
												)}
											</button>
										))}
								</div>
							),
						)}
					</section>

					<article
						className={`${frame} min-w-0 p-4 sm:p-5 ${terminal ? "lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain" : ""}`}
					>
						<p
							className={`text-[10px] font-bold uppercase tracking-wider ${accent}`}
						>
							{
								{
									dotfiles: "Dotfiles",
									linux: "Linux server",
									environment: "Environment",
									obsidian: "Obsidian",
								}[selectedConfiguration.group]
							}
						</p>
						<div className="mt-1 flex flex-wrap items-start justify-between gap-3">
							<h2 className={`text-xl font-bold sm:text-2xl ${heading}`}>
								{selectedConfiguration.name}
							</h2>
							<a
								href={selectedConfiguration.downloadHref}
								download
								aria-label={`Download ${selectedConfiguration.name}`}
								className={`inline-flex items-center gap-1.5 border px-3 py-2 text-xs font-bold ${action}`}
							>
								<ArrowDownTrayIcon className="size-4" />
								Download config
							</a>
						</div>
						{selectedConfiguration.path && (
							<p className={`mt-2 break-all font-mono text-xs ${muted}`}>
								{selectedConfiguration.path}
							</p>
						)}
						<p className={`mt-3 text-sm leading-6 ${muted}`}>
							{selectedConfiguration.summary}
						</p>
						<div className="mt-5 border-t border-current/15 pt-4">
							<h3
								className={`text-xs font-bold uppercase tracking-wider ${accent}`}
							>
								Configuration preview
							</h3>
							<pre
								className={`mt-2 overflow-x-auto border p-4 font-mono text-xs leading-6 ${terminal ? "border-[var(--term-border)] bg-[var(--term-bg)] text-[var(--term-cyan)]" : "rounded-md border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"}`}
							>
								<code>{selectedConfiguration.preview}</code>
							</pre>
						</div>
					</article>
				</div>
			)}
		</section>
	);
};

export default SetupRegistry;
