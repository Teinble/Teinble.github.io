import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import AgentSkillsRegistry from "./AgentSkillsRegistry";

it("explains installation and shows the canonical global instructions", async () => {
	const user = userEvent.setup();
	render(<AgentSkillsRegistry variant="plain" />);
	expect(screen.getByText(/npx skills add.*--skill ask$/)).toBeInTheDocument();
	await user.click(screen.getByRole("button", { name: "Global instructions" }));
	expect(
		screen.getByText(
			/Use \/local\/numa1\/scratch\/xiling for disposable artifacts/,
		),
	).toBeInTheDocument();
	await user.click(screen.getByRole("button", { name: "Claude · CLAUDE.md" }));
	expect(
		screen.getByText(/Write every reply in plain, simple English/),
	).toBeInTheDocument();
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
