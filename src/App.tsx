import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import PlainShell from "./features/plain/PlainShell";
import TerminalShell from "./features/terminal/TerminalShell";

type Theme = "light" | "dark";
type ViewMode = "terminal" | "plain";

const getInitialTheme = (): Theme => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const App = () => {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const [viewMode, setViewMode] = useState<ViewMode>(() =>
		window.localStorage.getItem("view-mode") === "plain" ? "plain" : "terminal",
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	useEffect(() => {
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
		const applySystemTheme = (event: MediaQueryListEvent) =>
			setTheme(event.matches ? "dark" : "light");
		systemTheme.addEventListener("change", applySystemTheme);
		return () => systemTheme.removeEventListener("change", applySystemTheme);
	}, []);

	useEffect(() => {
		window.localStorage.setItem("view-mode", viewMode);
	}, [viewMode]);

	const nightMode = theme === "dark";
	const toggleTheme = () =>
		setTheme((current) => (current === "light" ? "dark" : "light"));

	return (
		<HashRouter>
			{viewMode === "terminal" ? (
				<TerminalShell
					nightMode={nightMode}
					onShowPlain={() => setViewMode("plain")}
					onToggleTheme={toggleTheme}
				/>
			) : (
				<PlainShell
					nightMode={nightMode}
					onShowTerminal={() => setViewMode("terminal")}
					onToggleTheme={toggleTheme}
				/>
			)}
		</HashRouter>
	);
};

export default App;
