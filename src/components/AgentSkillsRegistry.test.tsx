import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import codexInstructions from "../../vendor/agent-config/instructions/AGENTS.md?raw";
import claudeInstructions from "../../vendor/agent-config/instructions/CLAUDE.md?raw";
import AgentSkillsRegistry from "./AgentSkillsRegistry";

it("explains installation and shows the canonical global instructions", async () => {
	const user = userEvent.setup();
	render(<AgentSkillsRegistry variant="plain" />);
	expect(screen.getByText(/npx skills add.*--skill ask$/)).toBeInTheDocument();
	await user.click(screen.getByRole("button", { name: "Global instructions" }));
	expect(document.querySelector("pre code")?.textContent).toBe(
		codexInstructions,
	);
	await user.click(screen.getByRole("button", { name: "Claude · CLAUDE.md" }));
	expect(document.querySelector("pre code")?.textContent).toBe(
		claudeInstructions,
	);
	await user.click(screen.getByRole("button", { name: "Install & update" }));
	expect(screen.getByText("npx skills update")).toBeInTheDocument();
	expect(
		screen.getByText(/a Git push does not update installed files elsewhere/),
	).toBeInTheDocument();
	await user.click(screen.getByRole("button", { name: "Skills" }));
	expect(
		screen.getByRole("link", { name: "Download SKILL.md" }),
	).toHaveAttribute("href", "/skills/ask/SKILL.md");
});
