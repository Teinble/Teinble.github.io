export type SetupApplication = {
	id: string;
	name: string;
	category: "terminal" | "portable" | "agents" | "workflow" | "system";
	summary: string;
	href: string;
	linkLabel: string;
	iconUrl?: string;
	installCommand?: string;
	configurationId?: string;
};

export type SetupConfiguration = {
	id: string;
	group: "dotfiles" | "linux" | "environment" | "obsidian";
	name: string;
	path?: string;
	summary: string;
	downloadHref: string;
	preview: string;
};

export const setupAgentGuides = [
	{
		id: "macos",
		title: "New Mac",
		description: "Apps, shell, fonts, and personal configurations",
		document: `# Agent handoff: set up Xiling's Mac

Goal: recreate Xiling's actual macOS environment. Inspect existing configuration first, back up anything you replace, and ask before requesting credentials, system permissions, or destructive changes.

1. Install Homebrew if it is missing:
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   Follow the installer's shell-environment instructions before continuing.

2. Install the daily applications and terminal font:
   brew install --cask ghostty codex claude-code arc obsidian karabiner-elements font-meslo-lg-nerd-font
   Install the Mole desktop application from https://mole.fit/; do not substitute an unrelated CLI package.

3. Restore the real zsh environment:
   git clone https://github.com/ohmyzsh/ohmyzsh.git "$HOME/.oh-my-zsh"
   git clone https://github.com/zsh-users/zsh-autosuggestions "$HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions"
   git clone https://github.com/zsh-users/zsh-syntax-highlighting "$HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting"
   Download https://xilingzhao.me/setup/dotfiles/zshrc, inspect it, back up the existing ~/.zshrc, and install the downloaded configuration.
   Keep the agnoster theme and Meslo font; skip cloning directories that already exist.

4. Restore application settings:
   Ghostty profile: https://xilingzhao.me/setup/ghostty/config.ghostty
   Karabiner keymaps: https://xilingzhao.me/setup/karabiner/karabiner.json
   Import each configuration using the application's supported configuration mechanism; preserve existing settings until backed up.

5. Restore Obsidian after asking which vault to configure:
   Download appearance.json, community-plugins.json, core-plugins.json, and daily-notes.json from https://xilingzhao.me/setup/obsidian/.
   Restore the published settings for obsidian-git, obsidian-minimal-settings, quick-latex, table-editor-obsidian, and the image.css snippet.
   Install missing community plugins and the Things theme; do not overwrite unrelated vault data.

6. Ask the user to complete app sign-ins and approve Karabiner's required macOS permissions.

7. Verify: brew list --cask; zsh starts without errors; Ghostty uses Night Owl and Meslo; Karabiner remaps work; Obsidian plugins load; Codex and Claude Code open successfully.`,
	},
	{
		id: "linux",
		title: "Linux server",
		description: "Private dotfiles, uv, tmux, and verified CLI tools",
		document: `# Agent handoff: set up Xiling's Linux development server

Goal: reproduce Xiling's real modular Bash and tmux environment from the private https://github.com/Teinble/dotfiles repository. Never publish machine-local paths, credentials, or repository-only settings.

1. Verify this is a Linux x86_64 machine:
   uname -s
   uname -m
   The repository installer currently supports Linux x86_64 only. Stop and ask before adapting it to another platform.

2. Check prerequisites without assuming sudo access:
   command -v git curl tar sha256sum install
   Report any missing executable. Do not install system packages or use sudo without permission.

3. Confirm authenticated access to the private dotfiles repository. If GitHub SSH access is not already configured, ask the user to authenticate; never request or print a token.

4. Install uv if missing:
   curl -LsSf https://astral.sh/uv/install.sh | sh
   Load its shell environment before checking uv and uvx.

5. Install oh-my-tmux if it is not already present:
   git clone https://github.com/gpakosz/.tmux.git "$HOME/.local/share/tmux/oh-my-tmux"

6. Clone the actual private repository and inspect its installer:
   git clone git@github.com:Teinble/dotfiles.git "$HOME/dotfiles"
   cd "$HOME/dotfiles"
   ./install.sh
   The installer links the real Bash and tmux configuration and installs pinned, checksum-verified fzf, bat, and fd into ~/.local/bin without sudo.

7. Treat bash/bashrc.d/local.bash as machine-specific and sensitive. Preserve any existing local overrides; ask before changing private paths, Slurm settings, Conda initialization, or credentials.

8. Start a fresh shell and verify:
   exec bash
   command -v fzf bat fd uv uvx
   alias va
   alias sqme
   alias nvitop
   Confirm Bash completions, Git-aware prompt, shared history, and tmux mouse support work.`,
	},
] as const;

export const setupApplications: SetupApplication[] = [
	{
		id: "homebrew",
		name: "Homebrew",
		category: "terminal",
		summary: "The package manager I use to install and update my Mac tools.",
		href: "https://brew.sh/",
		linkLabel: "Install Homebrew",
		iconUrl: "https://brew.sh/assets/img/homebrew.svg",
		installCommand:
			'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
	},
	{
		id: "ghostty",
		name: "Ghostty",
		category: "terminal",
		summary: "My daily terminal, tuned around Night Owl and a Powerline font.",
		href: "https://ghostty.org/download",
		linkLabel: "Download Ghostty",
		installCommand: "brew install --cask ghostty",
		configurationId: "ghostty",
	},
	{
		id: "codex",
		name: "Codex",
		category: "agents",
		summary: "My coding agent for implementation, review, and repository work.",
		href: "https://chatgpt.com/download/",
		linkLabel: "Download Codex",
		installCommand: "brew install --cask codex",
	},
	{
		id: "dotfiles",
		name: "Dotfiles",
		category: "portable",
		summary: "My actual shell dotfiles: macOS zsh and modular Linux Bash.",
		href: "https://github.com/Teinble/dotfiles",
		linkLabel: "View dotfiles repository",
		iconUrl: "/setup/icons/dotfiles.svg",
		configurationId: "zshrc",
	},
	{
		id: "linux-server",
		name: "Linux server",
		category: "portable",
		summary:
			"My real Bash modules, GPU aliases, uv completions, and tmux setup.",
		href: "https://github.com/Teinble/dotfiles/tree/main/bash",
		linkLabel: "View Linux server dotfiles",
		iconUrl: "/setup/icons/linux-server.svg",
		installCommand:
			"git clone git@github.com:Teinble/dotfiles.git && cd dotfiles && ./install.sh",
		configurationId: "linux-bashrc",
	},
	{
		id: "claude-code",
		name: "Claude Code",
		category: "agents",
		summary: "A terminal-native coding agent for focused development sessions.",
		href: "https://claude.com/download",
		linkLabel: "Download Claude Code",
		installCommand: "brew install --cask claude-code",
	},
	{
		id: "arc",
		name: "Arc",
		category: "workflow",
		summary: "The browser I use to keep research and daily work organized.",
		href: "https://arc.net/download",
		linkLabel: "Download Arc",
	},
	{
		id: "obsidian",
		name: "Obsidian",
		category: "workflow",
		summary: "Daily notes, research reading, and a portable knowledge base.",
		href: "https://obsidian.md/download",
		linkLabel: "Download Obsidian",
		configurationId: "obsidian-appearance",
	},
	{
		id: "karabiner",
		name: "Karabiner-Elements",
		category: "system",
		summary: "Custom modifier keys and a right-command IJKL arrow layer.",
		href: "https://karabiner-elements.pqrs.org/",
		linkLabel: "Download Karabiner-Elements",
		configurationId: "karabiner",
	},
	{
		id: "mole",
		name: "Mole",
		category: "system",
		summary:
			"A native Mac app for cleaning, monitoring, and managing my system.",
		href: "https://mole.fit/",
		linkLabel: "Download Mole",
	},
];

export const setupConfigurations: SetupConfiguration[] = [
	{
		id: "zshrc",
		group: "dotfiles",
		name: "zsh configuration",
		path: "~/.zshrc",
		summary:
			"My complete macOS zsh configuration, including agnoster, plugins, Homebrew OpenSSH, and personal aliases.",
		downloadHref: "/setup/dotfiles/zshrc",
		preview: [
			'export ZSH="$HOME/.oh-my-zsh"',
			'ZSH_THEME="agnoster"',
			"plugins=(git zsh-autosuggestions zsh-syntax-highlighting)",
			'source "$ZSH/oh-my-zsh.sh"',
			'[[ -r "$HOME/.local/bin/env" ]] && source "$HOME/.local/bin/env"',
			"alias va='source ./.venv/bin/activate'",
		].join("\n"),
	},
	{
		id: "linux-bashrc",
		group: "linux",
		name: "Linux Bash configuration",
		path: "~/dotfiles/bash/bashrc → ~/.bashrc",
		summary:
			"The actual Bash entrypoint from my dotfiles repository, loading focused modules and machine-local overrides.",
		downloadHref: "/setup/linux/bashrc",
		preview: [
			'source_if_exists "$HOME/.bashrc.d/history.bash"',
			'source_if_exists "$HOME/.bashrc.d/prompt.bash"',
			'source_if_exists "$HOME/.bashrc.d/aliases.bash"',
			'source_if_exists "$HOME/.bashrc.d/completion.bash"',
			'source_if_exists "$HOME/.bashrc.d/local.bash"',
			'export PATH="$HOME/.local/bin:$PATH"',
		].join("\n"),
	},
	{
		id: "linux-aliases",
		group: "linux",
		name: "Linux aliases",
		path: "~/dotfiles/bash/bashrc.d/aliases.bash",
		summary:
			"My real shortcuts for virtual environments, Slurm jobs, GPU monitoring, Git status, and bat.",
		downloadHref: "/setup/linux/aliases.bash",
		preview: [
			"alias va='source .venv/bin/activate'",
			"alias sqme='squeue -u $USER'",
			'alias nvitop="uvx nvitop"',
			'alias gsta="git status"',
			"alias b='bat --paging=never'",
		].join("\n"),
	},
	{
		id: "linux-completion",
		group: "linux",
		name: "Bash completions",
		path: "~/dotfiles/bash/bashrc.d/completion.bash",
		summary: "Real shell-completion setup for Bash, uv, uvx, and fzf.",
		downloadHref: "/setup/linux/completion.bash",
		preview: [
			'eval "$(uv generate-shell-completion bash)"',
			'eval "$(uvx --generate-shell-completion bash)"',
			'eval "$(fzf --bash)"',
		].join("\n"),
	},
	{
		id: "linux-history",
		group: "linux",
		name: "Bash history",
		path: "~/dotfiles/bash/bashrc.d/history.bash",
		summary:
			"Shared interactive history with duplicate removal and a 200,000-line history file.",
		downloadHref: "/setup/linux/history.bash",
		preview: [
			"HISTCONTROL=ignoreboth:erasedups",
			"shopt -s histappend",
			"HISTSIZE=100000",
			"HISTFILESIZE=200000",
		].join("\n"),
	},
	{
		id: "linux-tmux",
		group: "linux",
		name: "tmux overrides",
		path: "~/dotfiles/tmux/tmux.conf.local",
		summary:
			"My actual oh-my-tmux overrides: mouse support and extended scrollback.",
		downloadHref: "/setup/linux/tmux.conf.local",
		preview: "set -g mouse on\nset -g history-limit 50000",
	},
	{
		id: "ghostty",
		group: "environment",
		name: "Ghostty profile",
		summary:
			"Night Owl, Meslo Powerline, a bar cursor, and practical clipboard behavior.",
		downloadHref: "/setup/ghostty/config.ghostty",
		preview: [
			"theme = Night Owl",
			"font-family = Meslo LG L for Powerline",
			"font-size = 14",
			"cursor-style = bar",
			"copy-on-select = true",
		].join("\n"),
	},
	{
		id: "karabiner",
		group: "environment",
		name: "Karabiner keymaps",
		summary:
			"My actual modifier-key rotation and right-command arrow shortcuts.",
		downloadHref: "/setup/karabiner/karabiner.json",
		preview: [
			"caps_lock       → left_option",
			"left_control    → caps_lock",
			"left_option     → left_control",
			"right_command + i/j/k/l → ↑/←/↓/→",
		].join("\n"),
	},
	{
		id: "obsidian-appearance",
		group: "obsidian",
		name: "Obsidian appearance",
		path: "<vault>/.obsidian/appearance.json",
		summary: "A clean Things theme that follows the system light/dark setting.",
		downloadHref: "/setup/obsidian/appearance.json",
		preview: '{\n  "cssTheme": "Things",\n  "enabledCssSnippets": ["image"]\n}',
	},
	{
		id: "obsidian-plugins",
		group: "obsidian",
		name: "Obsidian plugins",
		path: "<vault>/.obsidian/community-plugins.json",
		summary: "Git, Zotero, LaTeX, tables, terminal tools, and note utilities.",
		downloadHref: "/setup/obsidian/community-plugins.json",
		preview: [
			"obsidian-git",
			"obsidian-zotero-desktop-connector",
			"quick-latex",
			"table-editor-obsidian",
			"terminal · image-converter · +3 more",
		].join("\n"),
	},
	{
		id: "obsidian-core-plugins",
		group: "obsidian",
		name: "Core plugins",
		path: "<vault>/.obsidian/core-plugins.json",
		summary:
			"My built-in toolkit for daily notes, backlinks, Canvas, Bases, and sync.",
		downloadHref: "/setup/obsidian/core-plugins.json",
		preview:
			"daily-notes · templates\nbacklink · canvas · bases\nbookmarks · outline · sync",
	},
	{
		id: "obsidian-daily-notes",
		group: "obsidian",
		name: "Daily notes",
		path: "<vault>/.obsidian/daily-notes.json",
		summary:
			"Weekly folders and date-based names, without publishing my private vault path.",
		downloadHref: "/setup/obsidian/daily-notes.json",
		preview: "format = GGGG-[W]WW/YYYY-MM-DD",
	},
	{
		id: "obsidian-git",
		group: "obsidian",
		name: "Obsidian Git",
		path: "<vault>/.obsidian/plugins/obsidian-git/data.json",
		summary:
			"Safe Git sync preferences, branch status, and readable commit timestamps.",
		downloadHref: "/setup/obsidian/plugins/obsidian-git/data.json",
		preview:
			"syncMethod = merge\npullBeforePush = true\nshowBranchStatusBar = true",
	},
	{
		id: "obsidian-minimal-settings",
		group: "obsidian",
		name: "Minimal theme settings",
		path: "<vault>/.obsidian/plugins/obsidian-minimal-settings/data.json",
		summary:
			"The typography, readable line width, and full-width media settings I use.",
		downloadHref: "/setup/obsidian/plugins/obsidian-minimal-settings/data.json",
		preview:
			"textNormal = 16\nlineHeight = 1.5\nreadableLineLength = true\nfullWidthMedia = true",
	},
	{
		id: "obsidian-quick-latex",
		group: "obsidian",
		name: "Quick LaTeX",
		path: "<vault>/.obsidian/plugins/quick-latex/data.json",
		summary:
			"Automatic math brackets, fractions, Greek commands, and superscripts.",
		downloadHref: "/setup/obsidian/plugins/quick-latex/data.json",
		preview:
			"autoCloseMath = true\nautoFraction = true\nautoGreekCommand = true",
	},
	{
		id: "obsidian-table-editor",
		group: "obsidian",
		name: "Table Editor",
		path: "<vault>/.obsidian/plugins/table-editor-obsidian/data.json",
		summary:
			"A normal table format with Enter and Tab bound for quicker editing.",
		downloadHref: "/setup/obsidian/plugins/table-editor-obsidian/data.json",
		preview: "formatType = normal\nbindEnter = true\nbindTab = true",
	},
	{
		id: "obsidian-image-snippet",
		group: "obsidian",
		name: "Image centering snippet",
		path: "<vault>/.obsidian/snippets/image.css",
		summary:
			"My custom CSS snippet for centering images directly from their alt text.",
		downloadHref: "/setup/obsidian/snippets/image.css",
		preview:
			'img[alt*="center"] {\n  display: block;\n  margin-inline: auto;\n}',
	},
];

export const setupCategories = [
	{ id: "terminal", label: "Terminal & packages" },
	{ id: "portable", label: "Dotfiles & Linux" },
	{ id: "agents", label: "Coding agents" },
	{ id: "workflow", label: "Daily workflow" },
	{ id: "system", label: "System" },
] as const;
