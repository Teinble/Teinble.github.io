export type AgentSkill = {
	id: string;
	command: string;
	name: string;
	summary: string;
	description: string;
	kind: "mine" | "recommended";
	tags: string[];
	workflow: string[];
	guardrails: string[];
	copyText: string;
	downloadUrl?: string;
	sourceUrl?: string;
	license?: string;
	included?: string[];
};

export const agentSkills: AgentSkill[] = [
	{
		id: "ask",
		command: "/ask",
		name: "Ask",
		summary: "Repository-aware answers with a strict read-only boundary.",
		description:
			"Use repository evidence to answer a question without changing files or external state.",
		kind: "mine",
		tags: ["read-only", "repository", "evidence"],
		workflow: [
			"Inspect the relevant code and trace the real flow.",
			"Answer directly, citing files and lines when useful.",
			"Separate confirmed behavior from inference or uncertainty.",
		],
		guardrails: [
			"Do not edit, create, rename, or delete files.",
			"Do not install, commit, push, deploy, or mutate external systems.",
			"Describe a possible change only when it helps answer the question.",
		],
		copyText:
			"/ask Answer my question using evidence from this repository. Do not make changes; only inspect and explain.",
		downloadUrl: "/skills/ask/SKILL.md",
	},
	{
		id: "eli5",
		command: "/eli5",
		name: "ELI5",
		summary: "Clear explanations built from an analogy and a concrete example.",
		description:
			"Explain a difficult idea for a curious beginner without losing the important truth.",
		kind: "mine",
		tags: ["explanation", "beginner", "analogy"],
		workflow: [
			"Start with the simplest accurate explanation.",
			"Add one familiar analogy and one small concrete example.",
			"Introduce the proper technical terms after the intuition is clear.",
		],
		guardrails: [
			"Do not become condescending or childish.",
			"Do not trade correctness for simplicity.",
			"Call out where the analogy stops matching reality.",
		],
		copyText:
			"/eli5 Explain this for a curious beginner using plain language, one analogy, and one concrete example.",
		downloadUrl: "/skills/eli5/SKILL.md",
	},
	{
		id: "review-fix-loop",
		command: "/review-fix-loop",
		name: "Review Fix Loop",
		summary:
			"Review, validate findings, fix confirmed issues, and review again.",
		description:
			"Use independent agents to improve an existing diff without blindly accepting review comments.",
		kind: "mine",
		tags: ["multi-agent", "review", "verification"],
		workflow: [
			"Ask an independent agent to review the current diff.",
			"Validate every finding against the code and intended behavior.",
			"Fix confirmed findings, rerun focused checks, then review again.",
		],
		guardrails: [
			"Never treat a review comment as true without evidence.",
			"Reject false positives with a concrete explanation.",
			"Stop when no actionable findings remain or a real blocker is documented.",
		],
		copyText:
			"/review-fix-loop Review the current work with independent agents, validate every finding, fix only confirmed issues, and repeat until no actionable findings remain.",
		downloadUrl: "/skills/review-fix-loop/SKILL.md",
	},
	{
		id: "implement-review-loop",
		command: "/implement-review-loop",
		name: "Implement Review Loop",
		summary:
			"Implementation with verification, independent review, and visual QA.",
		description:
			"Carry a change from implementation through checks and repeated review until it is clean.",
		kind: "mine",
		tags: ["implementation", "quality", "visual QA"],
		workflow: [
			"Implement the smallest complete change and run relevant checks.",
			"Have an independent agent review correctness, clarity, and maintainability.",
			"For UI work, inspect screenshots at affected widths and both themes.",
			"Fix confirmed issues and repeat review until the result converges.",
		],
		guardrails: [
			"Keep unrelated user changes untouched.",
			"Do not push or deploy unless the user requested it.",
			"Stop and report evidence when an external blocker prevents convergence.",
		],
		copyText:
			"/implement-review-loop Implement this change, verify it, independently review it, and fix confirmed findings until the result converges. For frontend work, include screenshot-based UI review.",
		downloadUrl: "/skills/implement-review-loop/SKILL.md",
	},
	{
		id: "ponytail",
		command: "/ponytail",
		name: "Ponytail",
		summary: "The lazy senior-developer mindset: ship the minimum that works.",
		description:
			"A portable third-party collection that pushes coding agents toward YAGNI, native features, and smaller implementations.",
		kind: "recommended",
		tags: ["minimalism", "YAGNI", "portable"],
		workflow: [
			"Question whether new code is needed.",
			"Prefer existing code, standard libraries, and native platform features.",
			"Write only the minimum implementation that remains safe and correct.",
		],
		guardrails: [
			"Created and maintained by Dietrich Gebert.",
			"Install from upstream to receive current skills, adapters, and hooks.",
			"Review lifecycle hooks before trusting them in an agent environment.",
		],
		copyText: "codex plugin marketplace add DietrichGebert/ponytail",
		sourceUrl: "https://github.com/DietrichGebert/ponytail",
		license: "MIT",
		included: [
			"ponytail",
			"ponytail-review",
			"ponytail-audit",
			"ponytail-debt",
			"ponytail-gain",
			"ponytail-help",
		],
	},
];
