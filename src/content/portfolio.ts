export type PortfolioItem = {
	id: string;
	label: string;
	detail: string;
	status?: "active" | "inactive" | "idle" | "saved" | "external";
	path?: string;
};

export type TerminalSection = {
	heading: string;
	body?: string;
	items?: string[];
	links?: Array<{ label: string; href: string }>;
};

export type TerminalDocument = {
	title: string;
	directory: string;
	command: string;
	intro: string;
	meta?: string[];
	sections: TerminalSection[];
};

export const education = {
	school: "University of Toronto, St. George",
	graduate: {
		short: "MScAC 27'",
		degree: "Master of Science in Applied Computing",
		period: "Sep 2025—Jul 2027",
		gpa: "4.0/4.0",
	},
	undergraduate: {
		short: "Computer Science 25'",
		degree: "Honours Bachelor of Science in Computer Science",
		period: "Sep 2021—Jun 2025",
		gpa: "3.94/4.0",
	},
	achievements: ["Dean's List Scholar × 4"],
} as const;

export const skillGroups = {
	"Programming languages": [
		"Python",
		"TypeScript",
		"Java",
		"C",
		"PostgreSQL",
		"HTML/CSS",
	],
	"Frameworks and libraries": [
		"React",
		"React Native",
		"Tailwind CSS",
		"DeepEval",
		"LangChain",
		"Hugging Face",
		"Django",
		"PyTorch",
		"NumPy",
		"SciPy",
		"scikit-learn",
		"Pandas",
		"Streamlit",
	],
	Tools: [
		"zsh + agnoster",
		"Herdr",
		"Git",
		"Linux",
		"Docker",
		"tmux",
		"Biome",
		"Vitest",
		"GitHub Actions",
		"Figma",
		"Selenium",
	],
} as const;

export const courseNotes = [
	{
		title: "Introduction to Artificial Intelligence",
		code: "CSC384 2025W",
		description:
			"A compact final-exam cheat sheet made after a term whose final differed substantially from previous years.",
		href: "/assets/CSC384.pdf",
		linkLabel: "View cheat sheet",
	},
	{
		title: "Introduction to Linguistics: Sentence",
		code: "LIN102 2025W",
		description:
			"A question-and-answer review sheet for a definition-heavy linguistics course.",
		href: "/assets/LIN102.pdf",
		linkLabel: "View Q&A sheet",
	},
	{
		title: "Introduction to Graph Theory",
		code: "MAT332 2024W",
		description:
			"Definition-practice sheets made while reviewing the course's concepts and proofs.",
		href: "/assets/MAT332.pdf",
		linkLabel: "View practice sheets",
	},
	{
		title: "Operating Systems",
		code: "CSC369 2023F",
		description:
			"Cheat-sheet notes for one of the most challenging courses I took at U of T.",
		href: "/assets/CSC369.pdf",
		linkLabel: "View notes",
	},
] as const;

export const spaces: PortfolioItem[] = [
	{
		id: "home",
		label: "xiling",
		detail: "portfolio · main",
		path: "/",
	},
	{
		id: "bosonai",
		label: "bosonai",
		detail: "machine learning engineer",
		status: "active",
	},
	{
		id: "iqbank",
		label: "iqbank",
		detail: "founder",
		status: "inactive",
		path: "/projects/iqbank",
	},
	{
		id: "xiaomi",
		label: "xiaomi",
		detail: "software engineer intern",
		status: "inactive",
	},
	{
		id: "notes",
		label: "course-notes",
		detail: "uoft study archive",
		status: "external",
		path: "/notes",
	},
];

export const resources: PortfolioItem[] = [
	{
		id: "dotfiles",
		label: "dotfiles",
		detail: "portable shell setup",
		status: "external",
	},
	{
		id: "mac-setup",
		label: "new-mac",
		detail: "bootstrap checklist",
		status: "saved",
	},
	{
		id: "linux-setup",
		label: "linux-server",
		detail: "remote environment",
		status: "saved",
	},
	{
		id: "tools",
		label: "uses",
		detail: "tools I keep nearby",
		status: "external",
	},
	{
		id: "skills",
		label: "recent-skills",
		detail: "what I am learning",
		status: "idle",
	},
];

export const terminalDocuments: Record<string, TerminalDocument> = {
	home: {
		title: "Xiling (Will) Zhao",
		directory: "~/portfolio",
		command: "whoami --verbose",
		intro:
			"Computer scientist, builder, and MScAC student at the University of Toronto. I like turning research ideas into reliable tools that people can actually use.",
		sections: [
			{
				heading: "current",
				items: [
					"Machine Learning Engineer · BosonAI",
					`${education.graduate.short} · ${education.school}`,
				],
			},
			{
				heading: "highlights",
				items: [
					"Built an exam-preparation platform serving 400+ students",
					"Created Xiaomi IoT's first LLM evaluation system",
					`MScAC cGPA ${education.graduate.gpa} · bachelor's cGPA ${education.undergraduate.gpa}`,
					"Dean's List Scholar × 4",
				],
			},
			{
				heading: "connect",
				links: [
					{ label: "GitHub", href: "https://github.com/Teinble" },
					{ label: "X @Teinble", href: "https://x.com/Teinble" },
					{
						label: "LinkedIn",
						href: "https://www.linkedin.com/in/xilingzhao/",
					},
					{ label: "Email", href: "mailto:xiling.zhao@mail.utoronto.ca" },
				],
			},
		],
	},
	bosonai: {
		title: "BosonAI",
		directory: "~/portfolio/experience/bosonai",
		command: "cat README.md",
		intro:
			"Working as a Machine Learning Engineer at BosonAI on Higgs Realtime, tool calling, and the evaluation infrastructure that keeps model progress measurable.",
		meta: ["Machine Learning Engineer", "Current"],
		sections: [
			{
				heading: "Higgs Realtime",
				items: [
					"Improved audio-native tool calling for complex, multi-step workflows",
					"Helped raise ComplexFuncBench (Audio) performance from 53 to 83.4",
					"Contributed to the model's benchmark-leading tool-calling result",
				],
			},
			{
				heading: "Evaluation platform",
				items: [
					"Refactored BosonAI's internal model-evaluation platform",
					"Built compressed-evaluation workflows that made evaluation about 10× faster",
					"Improved experiment and result management through a clearer UI",
					"Made evaluation workflows easier for both engineers and coding agents to use",
				],
			},
			{
				heading: "Published work",
				body: "Higgs Realtime is BosonAI's real-time, audio-native speech-to-speech model, designed for low-latency conversation and reliable tool use.",
				links: [
					{
						label: "Read the Higgs Realtime launch article",
						href: "https://staging.boson.ai/blog/higgs-realtime",
					},
				],
			},
			{
				heading: "Research contribution",
				body: "Instruct-FD studies whether full-duplex speech systems can follow explicit turn-taking instructions across different conversational scenarios.",
				items: [
					"Co-authored Instruct-FD: Can Your Full-Duplex Speech System Follow Turn-Taking Instructions?",
					"Contributed to the paper's human-study session",
				],
				links: [
					{
						label: "Read Instruct-FD on arXiv",
						href: "https://arxiv.org/abs/2607.20460",
					},
				],
			},
		],
	},
	projects: {
		title: "Projects",
		directory: "~/portfolio/projects",
		command: "cat README.md",
		intro:
			"A growing record of products, research tools, and experiments. The useful ones stay; the rest still teach me something.",
		sections: [
			{
				heading: "iqbank/",
				body: "Collaborative exam preparation for university students, with interactive PDF questions and peer-to-peer learning.",
				items: [
					"Founder · May 2025—present",
					"400+ students",
					"Team of 8 developers",
				],
			},
			{
				heading: "next",
				body: "This space will collect smaller experiments, open-source work, and systems I want to explain rather than merely link.",
			},
		],
	},
	iqbank: {
		title: "IQBank",
		directory: "~/portfolio/projects/iqbank",
		command: "cat README.md",
		intro:
			"A collaborative exam-preparation platform that makes past exams interactive and helps students learn from one another.",
		meta: ["Founder and lead developer", "May 2025", "400+ students"],
		sections: [
			{
				heading: "role",
				items: ["Founder", "Product and engineering lead"],
			},
			{
				heading: "impact",
				items: [
					"Serving more than 400 students",
					"Led a team of 8 developers",
					"Made PDF question annotation about 10× faster",
					"Introduced type-checking, testing, and CI workflows",
					"Built an engagement dashboard that helps professors recognize top contributors as Junior TAs",
				],
			},
			{
				heading: "key features",
				items: [
					"Role-based access control across global and course-specific permissions",
					"Real-time discussions for collaborative question answering",
					"PDF-native question creation and collection management",
					"Engagement statistics, topic categorization, and analytics",
				],
			},
			{
				heading: "architecture",
				items: [
					"React, TypeScript, Vite, Tailwind CSS, and TanStack Query frontend",
					"Node.js, Express, Prisma, PostgreSQL, Zod, and JWT backend",
					"Feature-based frontend with a controller-service-repository backend",
				],
			},
			{
				heading: "links",
				links: [
					{ label: "Open IQBank", href: "https://iqbank.teach.cs.toronto.edu" },
				],
			},
		],
	},
	xiaomi: {
		title: "Xiaomi IoT",
		directory: "~/portfolio/experience/xiaomi",
		command: "cat README.md",
		intro:
			"Software Engineer Intern in Beijing, working on evaluation infrastructure for retrieval-augmented language models.",
		meta: ["Software Engineer Intern", "May—Aug 2024", "Beijing"],
		sections: [
			{
				heading: "work",
				items: [
					"Built the IoT department's first LLM evaluation system",
					"Integrated DeepEval metrics and LangChain-based judges",
					"Generated and evaluated 5,000 cases from developer documentation",
					"The system was adopted by a team of 10+ engineers",
				],
			},
		],
	},
	research: {
		title: "Research interests",
		directory: "~/portfolio/research",
		command: "cat README.md",
		intro:
			"I care about language systems that are efficient, measurable, and dependable outside a demo.",
		sections: [
			{
				heading: "primary",
				body: "Computational linguistics, NLP evaluation, efficient language models, and resource-conscious AI systems.",
			},
			{
				heading: "secondary",
				body: "Software reliability, testing, fault tolerance, and the engineering practices that make research systems maintainable.",
			},
		],
	},
	notes: {
		title: "Course notes",
		directory: "~/portfolio/notes",
		command: "cat README.md",
		intro:
			"A small archive of review material I made while studying computer science, mathematics, and linguistics at U of T.",
		sections: courseNotes.map((note) => ({
			heading: note.code,
			body: `${note.title}. ${note.description}`,
			links: [{ label: note.linkLabel, href: note.href }],
		})),
	},
	dotfiles: {
		title: "Dotfiles",
		directory: "~/resources/dotfiles",
		command: "cat README.md",
		intro:
			"My portable starting point for a familiar shell on a new Mac or Linux server. This section will grow with the repository.",
		sections: [
			{
				heading: "shell",
				items: [
					"zsh",
					"agnoster prompt",
					"small aliases that travel well",
					"machine-specific secrets kept out of Git",
				],
			},
			{
				heading: "repository",
				links: [
					{ label: "Browse my GitHub", href: "https://github.com/Teinble" },
				],
			},
		],
	},
	"mac-setup": {
		title: "New Mac checklist",
		directory: "~/resources/bootstrap/mac",
		command: "cat README.md",
		intro:
			"A future one-command setup, kept readable so I understand everything it installs.",
		sections: [
			{
				heading: "plan",
				items: [
					"Install command-line tools and Homebrew",
					"Link dotfiles safely",
					"Restore terminal, editor, Git, and SSH settings",
					"Install daily applications from a reviewed list",
				],
			},
			{
				heading: "status",
				body: "Documentation first; executable bootstrap scripts will be linked when they are ready.",
			},
		],
	},
	"linux-setup": {
		title: "Linux server checklist",
		directory: "~/resources/bootstrap/linux",
		command: "cat README.md",
		intro:
			"A lightweight environment for getting productive quickly on a fresh remote machine.",
		sections: [
			{
				heading: "baseline",
				items: [
					"SSH keys and Git identity",
					"zsh and portable dotfiles",
					"tmux and terminal tooling",
					"Python and Node runtimes",
					"GPU monitoring tools when needed",
				],
			},
		],
	},
	tools: {
		title: "Tools I use",
		directory: "~/resources/uses",
		command: "cat README.md",
		intro:
			"Tools earn a place here by reducing friction, improving understanding, or making work easier to reproduce.",
		sections: Object.entries(skillGroups).map(([heading, items]) => ({
			heading,
			items: [...items],
		})),
	},
	skills: {
		title: "Recently explored",
		directory: "~/resources/recent-skills",
		command: "cat README.md",
		intro:
			"A deliberately changing list of techniques, tools, and ideas that have recently improved how I work.",
		sections: [
			{
				heading: "now",
				items: [
					"Agent-assisted engineering workflows",
					"Evaluation for language and speech systems",
					"Portable development environments",
					"Accessible interface architecture",
				],
			},
		],
	},
};

export const pathToDocument: Record<string, string> = {
	"/": "home",
	"/projects": "home",
	"/projects/iqbank": "iqbank",
	"/notes": "notes",
};
