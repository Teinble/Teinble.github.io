import {
	Bars3Icon,
	MoonIcon,
	SunIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
	nightMode: boolean;
	toggleNightMode: () => void;
}

const Header = ({ nightMode, toggleNightMode }: HeaderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		void pathname;
		setIsOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!isOpen) return;
		closeButtonRef.current?.focus();
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isOpen]);

	const links = [
		["/", "About"],
		["/projects", "My Projects"],
		["/notes", "My Notes"],
	];

	const navLinkClass = (to: string) =>
		`rounded px-2.5 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
			pathname === to
				? "font-medium text-blue-600"
				: "text-gray-800 dark:text-gray-100"
		}`;

	return (
		<header className="relative flex items-center justify-between border-b border-gray-200 bg-white px-5 py-2.5 dark:border-gray-700 dark:bg-[#1a1a1a]">
			<h1 className="text-base font-medium">Xiling Zhao&apos;s Site</h1>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="hidden rounded-full p-1.5 max-md:flex"
				aria-label="Open navigation menu"
				aria-expanded={isOpen}
			>
				<Bars3Icon className="size-5" />
			</button>
			<nav
				aria-label="Primary navigation"
				className={`flex items-center gap-2.5 max-md:fixed max-md:bottom-0 max-md:right-0 max-md:top-0 max-md:z-20 max-md:w-[250px] max-md:flex-col max-md:bg-white max-md:px-5 max-md:pb-5 max-md:pt-16 max-md:shadow-lg max-md:transition-transform dark:max-md:bg-[#1a1a1a] ${isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}
			>
				<button
					ref={closeButtonRef}
					type="button"
					onClick={() => setIsOpen(false)}
					className="absolute right-5 top-5 hidden rounded-full p-1.5 max-md:flex"
					aria-label="Close navigation menu"
				>
					<XMarkIcon className="size-5" />
				</button>
				{links.map(([to, label]) => (
					<Link
						key={to}
						to={to}
						className={`${navLinkClass(to)} max-md:w-full max-md:py-2.5 max-md:text-center`}
					>
						{label}
					</Link>
				))}
				<button
					type="button"
					onClick={toggleNightMode}
					className="flex rounded-full p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
					aria-label={`Switch to ${nightMode ? "light" : "dark"} mode`}
				>
					{nightMode ? (
						<SunIcon className="size-5" />
					) : (
						<MoonIcon className="size-5" />
					)}
				</button>
			</nav>
			{isOpen && (
				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="fixed inset-0 z-10 hidden bg-black/50 max-md:block"
					aria-label="Close navigation menu"
				/>
			)}
		</header>
	);
};

export default Header;
