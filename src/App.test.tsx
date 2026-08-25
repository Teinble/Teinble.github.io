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
		expect(
			screen.getByRole("navigation", { name: "Sidebar navigation" }),
		).toHaveClass("flex-1", "overflow-y-auto");
		expect(screen.getByText("Status").closest("footer")).toHaveClass(
			"shrink-0",
		);
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

		await user.type(commandInput, "setup conf");
		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("setup configurations");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("heading", { name: "Configurations" }),
		).toBeInTheDocument();
	});

	it("completes setup guides, configurations, skills, and command history", async () => {
		const user = userEvent.setup();
		render(<App />);
		const commandInput = screen.getByRole("textbox", {
			name: "Portfolio command",
		});

		await user.type(commandInput, "setup m");
		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("setup mac");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("button", {
				name: "Collapse New Mac agent setup guide",
			}),
		).toHaveAttribute("aria-expanded", "true");

		await user.keyboard("{ArrowUp}");
		expect(commandInput).toHaveValue("setup mac");
		await user.keyboard("{ArrowDown}");
		expect(commandInput).toHaveValue("");

		await user.type(commandInput, "config gho");
		await user.keyboard("{ArrowRight}");
		expect(commandInput).toHaveValue("config ghostty");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("heading", { name: "Ghostty profile" }),
		).toBeInTheDocument();

		await user.type(commandInput, "review");
		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("review-fix-loop");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("heading", { name: "/review-fix-loop" }),
		).toBeInTheDocument();

		await user.type(commandInput, "setup lin");
		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("setup linux");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("button", {
				name: "Collapse Linux server agent setup guide",
			}),
		).toHaveAttribute("aria-expanded", "true");
	});

	it("shows categorized help and lists skills without navigating", async () => {
		const user = userEvent.setup();
		render(<App />);
		const commandInput = screen.getByRole("textbox", {
			name: "Portfolio command",
		});
		const initialHash = window.location.hash;

		await user.type(commandInput, "help{enter}");
		expect(
			screen.getByRole("heading", { name: "Available commands" }),
		).toBeInTheDocument();
		expect(screen.getByText("setup mac · setup linux")).toBeInTheDocument();
		expect(screen.getByText(/ESC close/)).toBeInTheDocument();
		expect(screen.queryByText("Shortcuts")).not.toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(
			screen.queryByRole("region", { name: "Terminal command output" }),
		).not.toBeInTheDocument();

		await user.type(commandInput, "cat sk");
		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("cat skills");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("heading", { name: "Available skills" }),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Repository-aware answers with a strict read-only boundary.",
			),
		).toBeInTheDocument();
		expect(window.location.hash).toBe(initialHash);
		expect(
			screen.getByRole("heading", { name: "Xiling Zhao" }),
		).toBeInTheDocument();

		await user.type(commandInput, "help se");
		await user.keyboard("{Tab}");
		expect(commandInput).toHaveValue("help setup");
		await user.keyboard("{Enter}");
		expect(
			screen.getByRole("heading", { name: "Help: setup" }),
		).toBeInTheDocument();
		expect(screen.queryByText("Navigation")).not.toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(
			screen.queryByRole("region", { name: "Terminal command output" }),
		).not.toBeInTheDocument();
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
		expect(
			screen.getByText("codex plugin marketplace add DietrichGebert/ponytail"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", {
				name: "https://github.com/DietrichGebert/ponytail",
			}),
		).toHaveAttribute("href", "https://github.com/DietrichGebert/ponytail");
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

	it("shares setup applications and downloadable configs across views", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(
			screen.getByRole("button", { name: /setup apps, dotfiles & configs/i }),
		);
		expect(
			screen.getByRole("heading", { name: "My setup" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Download Ghostty" }),
		).toHaveAttribute("href", "https://ghostty.org/download");
		expect(
			screen.getByRole("link", { name: "Install Homebrew" }),
		).toHaveAttribute("href", "https://brew.sh/");
		expect(
			screen.getByRole("button", { name: "Copy Homebrew install command" }),
		).toHaveTextContent(
			"https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh",
		);
		expect(
			screen.getByRole("heading", { name: "Ghostty" }).querySelector("img"),
		).toHaveAttribute("src", "/setup/icons/ghostty.png");
		expect(
			screen.getByRole("button", { name: "Copy Codex install command" }),
		).toHaveTextContent("brew install --cask codex");
		expect(
			screen.getByRole("link", { name: "View dotfiles repository" }),
		).toHaveAttribute("href", "https://github.com/Teinble/dotfiles");
		expect(
			screen.getByRole("link", { name: "View Linux server dotfiles" }),
		).toHaveAttribute(
			"href",
			"https://github.com/Teinble/dotfiles/tree/main/bash",
		);
		expect(screen.getByRole("link", { name: "Download Mole" })).toHaveAttribute(
			"href",
			"https://mole.fit/",
		);
		expect(
			screen.queryByRole("button", { name: "Copy Mole install command" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Configurations" }),
		).not.toBeInTheDocument();

		await user.click(
			screen.getByRole("button", { name: "View Ghostty configuration" }),
		);
		expect(
			screen.getByRole("heading", { name: "Configurations" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Ghostty profile" }),
		).toBeInTheDocument();
		expect(
			screen.queryByText(/Application Support\/com\.mitchellh\.ghostty/),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(/\.config\/karabiner\/karabiner\.json/),
		).not.toBeInTheDocument();
		await user.click(
			screen.getByRole("button", { name: /zsh configuration/i }),
		);
		expect(screen.getByText(/zsh-autosuggestions/)).toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: /Git configuration/i }),
		).not.toBeInTheDocument();
		await user.click(
			screen.getByRole("button", { name: /Linux Bash configuration/i }),
		);
		expect(
			screen.getByRole("link", { name: "Download Linux Bash configuration" }),
		).toHaveAttribute("href", "/setup/linux/bashrc");
		await user.click(screen.getByRole("button", { name: /Linux aliases/i }));
		expect(screen.getByText(/alias nvitop="uvx nvitop"/)).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /tmux overrides/i }));
		expect(screen.getByText(/set -g history-limit 50000/)).toBeInTheDocument();
		await user.click(
			screen.getByRole("button", { name: /Karabiner keymaps/i }),
		);
		expect(
			screen.getByRole("link", { name: "Download Karabiner keymaps" }),
		).toHaveAttribute("href", "/setup/karabiner/karabiner.json");
		await user.click(screen.getByRole("button", { name: /Obsidian plugins/i }));
		expect(
			screen.getByText(/obsidian-zotero-desktop-connector/),
		).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /Daily notes/i }));
		expect(
			screen.getByRole("link", { name: "Download Daily notes" }),
		).toHaveAttribute("href", "/setup/obsidian/daily-notes.json");
		await user.click(screen.getByRole("button", { name: /Obsidian Git/i }));
		expect(
			screen.getByRole("link", { name: "Download Obsidian Git" }),
		).toHaveAttribute("href", "/setup/obsidian/plugins/obsidian-git/data.json");
		expect(window.location.hash).toBe("#/resources");

		await user.click(screen.getByRole("button", { name: "Plain view" }));
		expect(
			screen.getByRole("heading", { name: "My setup" }),
		).toBeInTheDocument();
		await user.click(
			screen.getByRole("button", { name: "View Obsidian configuration" }),
		);
		expect(
			screen.getByRole("heading", { name: "Obsidian appearance" }),
		).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /Obsidian plugins/i }));
		expect(
			screen.getByRole("link", { name: "Download Obsidian plugins" }),
		).toHaveAttribute("href", "/setup/obsidian/community-plugins.json");
	});

	it("offers collapsed, copyable setup instructions for Mac and Linux agents", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(
			screen.getByRole("button", { name: /setup apps, dotfiles & configs/i }),
		);

		const macGuide = screen.getByRole("button", {
			name: "Expand New Mac agent setup guide",
		});
		const linuxGuide = screen.getByRole("button", {
			name: "Expand Linux server agent setup guide",
		});

		expect(macGuide).toHaveAttribute("aria-expanded", "false");
		expect(linuxGuide).toHaveAttribute("aria-expanded", "false");
		expect(
			screen.queryByText(/Agent handoff: set up Xiling's Mac/),
		).not.toBeInTheDocument();

		await user.click(macGuide);
		expect(screen.getByText(/font-meslo-lg-nerd-font/)).toBeInTheDocument();
		expect(screen.getByText(/zsh-syntax-highlighting/)).toBeInTheDocument();

		await user.click(
			screen.getByRole("button", { name: "Copy New Mac agent setup guide" }),
		);
		expect(await navigator.clipboard.readText()).toContain(
			"brew install --cask ghostty codex claude-code arc obsidian karabiner-elements",
		);

		await user.click(linuxGuide);
		expect(
			screen.queryByText(/Agent handoff: set up Xiling's Mac/),
		).not.toBeInTheDocument();
		expect(
			screen.getByText(/checksum-verified fzf, bat, and fd/),
		).toBeInTheDocument();
		expect(screen.getByText(/github.com\/gpakosz\/\.tmux/)).toBeInTheDocument();
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
