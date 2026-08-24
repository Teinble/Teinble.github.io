import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("portfolio modes", () => {
	beforeEach(() => {
		window.location.hash = "";
		window.localStorage.clear();
		document.documentElement.classList.remove("dark");
		vi.stubGlobal(
			"fetch",
			vi.fn().mockReturnValue(new Promise(() => undefined)),
		);
	});

	it("opens in terminal mode with personal portfolio content", () => {
		render(<App />);

		expect(
			screen.getByRole("heading", { name: "Xiling Zhao" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Plain view" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Contribution calendar" }),
		).toBeInTheDocument();
	});

	it("preserves the original website as plain mode", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "Plain view" }));

		expect(
			screen.getByRole("heading", { name: "About Me" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Terminal/i }),
		).toBeInTheDocument();
		expect(screen.getByText("4.0/4.0")).toBeInTheDocument();
		expect(screen.getByText("3.94/4.0")).toBeInTheDocument();
		expect(screen.queryByText(/Selected courses/i)).not.toBeInTheDocument();
	});

	it("navigates through terminal spaces", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: /iqbank founder/i }));

		expect(screen.getByRole("heading", { name: "IQBank" })).toBeInTheDocument();
		expect(window.location.hash).toBe("#/projects/iqbank");
	});

	it("completes terminal commands with Tab", async () => {
		const user = userEvent.setup();
		render(<App />);
		const commandInput = screen.getByRole("textbox", {
			name: "Portfolio command",
		});

		await user.type(commandInput, "h");

		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("help");

		await user.keyboard("{Enter}");
		expect(screen.getByText(/commands: home/)).toBeInTheDocument();
	});

	it("renders downloadable personal skills and attributed recommendations", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(
			screen.getByRole("button", {
				name: /agent-skills workflows I built & recommend/i,
			}),
		);
		expect(
			screen.getByRole("heading", { name: "Agent skills" }),
		).toBeInTheDocument();

		await user.click(
			screen.getByRole("button", { name: /\/review-fix-loop/i }),
		);
		expect(
			screen.getByRole("link", { name: "Download SKILL.md" }),
		).toHaveAttribute("href", "/skills/review-fix-loop/SKILL.md");

		await user.click(screen.getByRole("button", { name: "Recommended · 1" }));
		expect(screen.getByText("ponytail-review")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "View upstream" })).toHaveAttribute(
			"href",
			"https://github.com/DietrichGebert/ponytail",
		);

		await user.click(screen.getByRole("button", { name: "Plain view" }));
		expect(window.location.hash).toBe("#/skills");
		expect(
			screen.getByRole("heading", { name: "Agent skills" }),
		).toBeInTheDocument();
	});

	it("resizes and remembers the terminal sidebar", async () => {
		const user = userEvent.setup();
		render(<App />);
		const separator = screen.getByRole("separator", { name: "Resize sidebar" });

		expect(separator).toHaveAttribute("aria-valuenow", "240");
		separator.focus();
		await user.keyboard("{ArrowRight}");

		expect(separator).toHaveAttribute("aria-valuenow", "248");
		expect(window.localStorage.getItem("terminal-sidebar-width")).toBe("248");
	});

	it("navigates to the work route in plain mode", async () => {
		const user = userEvent.setup();
		window.localStorage.setItem("view-mode", "plain");
		render(<App />);

		await user.click(screen.getByRole("link", { name: "My Projects" }));

		expect(
			screen.getByRole("heading", { name: "My Projects" }),
		).toBeInTheDocument();
	});

	it("shares current experience facts between terminal and plain modes", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(
			screen.getByRole("button", {
				name: /bosonai machine learning engineer/i,
			}),
		);
		expect(
			screen.getByText(
				(_, element) =>
					element?.tagName === "LI" &&
					Boolean(
						element.textContent?.includes(
							"Helped raise ComplexFuncBench (Audio) performance from 53 to 83.4",
						),
					),
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				(_, element) =>
					element?.tagName === "LI" &&
					Boolean(
						element.textContent?.includes(
							"Built compressed-evaluation workflows that made evaluation about 10× faster",
						),
					),
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Read Instruct-FD on arXiv" }),
		).toHaveAttribute("href", "https://arxiv.org/abs/2607.20460");

		await user.click(screen.getByRole("button", { name: "Plain view" }));
		expect(
			screen.getByText(/performance from 53 to 83\.4/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/evaluation about 10× faster/i),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Read Instruct-FD on arXiv" }),
		).toHaveAttribute("href", "https://arxiv.org/abs/2607.20460");
	});

	it("starts with the system color theme and allows a session toggle", async () => {
		const user = userEvent.setup();
		render(<App />);

		expect(document.documentElement).not.toHaveClass("dark");
		await user.click(
			screen.getByRole("button", { name: "Switch to dark theme" }),
		);

		expect(document.documentElement).toHaveClass("dark");
		expect(window.localStorage.getItem("theme")).toBeNull();
	});
});
