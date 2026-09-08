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

export const agentSkills: AgentSkill[] = personalSkills.map((skill) => ({
	...skill,
	kind: "mine",
}));
