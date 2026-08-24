import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import type { PortfolioItem } from "../../content/portfolio";

interface MobileSwitcherProps {
	activeId: string;
	isOpen: boolean;
	nightMode: boolean;
	onClose: () => void;
	onSelect: (item: PortfolioItem) => void;
	resources: PortfolioItem[];
	spaces: PortfolioItem[];
}

const statusClasses: Record<NonNullable<PortfolioItem["status"]>, string> = {
	active: "bg-[var(--term-green)]",
	inactive: "bg-[var(--term-muted)]/45",
	idle: "border border-[var(--term-blue)]",
	saved: "bg-[var(--term-yellow)]",
	external: "bg-[var(--term-cyan)]",
};

const SwitcherGroup = ({
	activeId,
	items,
	label,
	onSelect,
}: {
	activeId: string;
	items: PortfolioItem[];
	label: string;
	onSelect: (item: PortfolioItem) => void;
}) => (
	<section className="border-b border-[var(--term-border)] px-4 py-4">
		<h2 className="mb-2 border-b border-[var(--term-muted)]/60 pb-1 text-sm font-bold lowercase text-[var(--term-muted)]">
			{label}
		</h2>
		<div className="space-y-1">
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onSelect(item)}
					className={`flex w-full items-start gap-3 px-3 py-2 text-left transition-colors hover:bg-[var(--term-selection)] ${
						activeId === item.id ? "bg-[var(--term-selection)]" : ""
					}`}
				>
					{item.status && (
						<span
							className={`mt-1.5 size-2 shrink-0 rounded-full ${statusClasses[item.status]}`}
						/>
					)}
					<span className="min-w-0">
						<span className="block font-bold text-[var(--term-text)]">
							{item.label}
						</span>
						<span className="block truncate text-xs text-[var(--term-muted)]">
							{item.detail}
						</span>
					</span>
				</button>
			))}
		</div>
	</section>
);

const MobileSwitcher = ({
	activeId,
	isOpen,
	nightMode,
	onClose,
	onSelect,
	resources,
	spaces,
}: MobileSwitcherProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		closeButtonRef.current?.focus();
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 overflow-y-auto bg-[var(--term-panel)] font-mono text-[var(--term-text)] md:hidden"
			role="dialog"
			aria-modal="true"
			aria-label="Switch portfolio section"
		>
			<header className="sticky top-0 z-10 flex items-stretch justify-between border-b border-[var(--term-border)] bg-[var(--term-panel)]">
				<strong className="px-5 py-3 text-[var(--term-text)]">switch</strong>
				<button
					ref={closeButtonRef}
					type="button"
					onClick={onClose}
					className="grid min-w-24 place-items-center border-l border-[var(--term-border)] bg-[var(--term-selection)] px-5 py-2 font-bold text-[var(--term-muted)]"
					aria-label="Close section switcher"
				>
					<span>close</span>
					<XMarkIcon className="size-5" />
				</button>
			</header>
			<SwitcherGroup
				activeId={activeId}
				items={spaces}
				label="spaces"
				onSelect={onSelect}
			/>
			<SwitcherGroup
				activeId={activeId}
				items={resources}
				label="resources"
				onSelect={onSelect}
			/>
			<section className="px-7 py-4 text-xs text-[var(--term-muted)]">
				<h2 className="mb-2 font-bold uppercase tracking-[0.16em]">status</h2>
				<div className="grid grid-cols-2 gap-x-3 gap-y-2">
					<span>
						<i className="mr-2 inline-block size-2 rounded-full bg-[var(--term-green)]" />
						current
					</span>
					<span>
						<i className="mr-2 inline-block size-2 rounded-full bg-[var(--term-muted)]/45" />
						past
					</span>
					<span>
						<i className="mr-2 inline-block size-2 rounded-full bg-[var(--term-cyan)]" />
						ready
					</span>
					<span>
						<i className="mr-2 inline-block size-2 rounded-full bg-[var(--term-yellow)]" />
						planned
					</span>
					<span>
						<i className="mr-2 inline-block size-2 rounded-full border border-[var(--term-blue)]" />
						exploring
					</span>
				</div>
				<p className="mt-3 border-t border-[var(--term-border)] pt-2 text-[11px] leading-5">
					<span className="text-[var(--term-purple)]">zsh/agnoster</span>
					{" · "}night owl {nightMode ? "dark" : "light"}
					{" · "}Toronto/EDT
				</p>
			</section>
		</div>
	);
};

export default MobileSwitcher;
