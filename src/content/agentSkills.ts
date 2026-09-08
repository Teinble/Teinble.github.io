import personalSkills from "../../vendor/agent-config/registry.json";

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
	...personalSkills.map((skill): AgentSkill => ({ ...skill, kind: "mine" })),
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
