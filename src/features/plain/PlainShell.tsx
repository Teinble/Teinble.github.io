import { useId } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import InfoContainer from "../../components/InfoContainer";
import Header from "../../Header";
import About from "../../pages/About";
import AgentSkills from "../../pages/AgentSkills";
import Notes from "../../pages/Notes";
import NotFound from "../../pages/NotFound";
import { Project } from "../../pages/Project";
import IQBank from "../../pages/projects/iqbank";
import Resources from "../../pages/Resources";

interface PlainShellProps {
	nightMode: boolean;
	onShowTerminal: () => void;
	onToggleTheme: () => void;
}

const PlainShell = ({
	nightMode,
	onShowTerminal,
	onToggleTheme,
}: PlainShellProps) => {
	const mainId = useId();
	const { pathname } = useLocation();
	const fullWidthPage = pathname === "/skills" || pathname === "/resources";

	return (
		<div className="flex min-h-screen flex-col bg-white text-gray-800 dark:bg-[#1a1a1a] dark:text-gray-100">
			<a
				href={`#${mainId}`}
				className="fixed left-3 top-3 z-[60] -translate-y-20 rounded bg-blue-600 px-3 py-2 text-sm text-white focus:translate-y-0"
			>
				Skip to content
			</a>
			<Header
				nightMode={nightMode}
				onShowTerminal={onShowTerminal}
				toggleNightMode={onToggleTheme}
			/>
			<div
				className={`mx-auto flex w-full max-w-[1200px] flex-1 p-8 max-md:flex-col max-md:gap-4 max-md:p-4 ${fullWidthPage ? "" : "gap-8"}`}
			>
				{!fullWidthPage && <InfoContainer nightMode={nightMode} />}
				<main id={mainId} className="min-w-0 flex-1">
					<Routes>
						<Route path="/" element={<About nightMode={nightMode} />} />
						<Route
							path="/projects"
							element={<Project nightMode={nightMode} />}
						/>
						<Route
							path="/projects/iqbank"
							element={<IQBank nightMode={nightMode} />}
						/>
						<Route path="/notes" element={<Notes nightMode={nightMode} />} />
						<Route path="/resources" element={<Resources />} />
						<Route path="/skills" element={<AgentSkills />} />
						<Route path="*" element={<NotFound nightMode={nightMode} />} />
					</Routes>
				</main>
			</div>
			<Footer nightMode={nightMode} />
		</div>
	);
};

export default PlainShell;
