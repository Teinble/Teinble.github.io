import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useRef, useState } from "react";

type ContributionDay = {
	date: string;
	count: number;
	level: number;
};

type ContributionResponse = {
	contributions?: ContributionDay[];
};

const levelClasses = [
	"bg-[var(--term-selection)]",
	"bg-[var(--term-green)]/25",
	"bg-[var(--term-green)]/45",
	"bg-[var(--term-green)]/70",
	"bg-[var(--term-green)]",
] as const;

const formatDate = (date: string) =>
	new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${date}T00:00:00Z`));

const GithubActivity = ({
	className = "mt-6",
	compact = false,
}: {
	className?: string;
	compact?: boolean;
}) => {
	const [days, setDays] = useState<ContributionDay[]>([]);
	const [state, setState] = useState<"loading" | "ready" | "error">("loading");
	const [tooltip, setTooltip] = useState<{
		day: ContributionDay;
		left: number;
	} | null>(null);
	const graphRef = useRef<HTMLDivElement>(null);
	const activityScrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const controller = new AbortController();
		const loadActivity = async () => {
			try {
				const response = await fetch(
					"https://github-contributions-api.jogruber.de/v4/Teinble?y=last",
					{ signal: controller.signal },
				);
				if (!response.ok) throw new Error("Contribution request failed");
				const data = (await response.json()) as ContributionResponse;
				setDays(data.contributions ?? []);
				setState("ready");
			} catch (error) {
				if (error instanceof DOMException && error.name === "AbortError")
					return;
				setState("error");
			}
		};
		void loadActivity();
		return () => controller.abort();
	}, []);

	const calendar = useMemo(() => {
		if (days.length === 0) return [];
		const leadingEmptyDays = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
		return [
			...Array.from({ length: leadingEmptyDays }, (_, dayOfWeek) => ({
				emptyId: `leading-${dayOfWeek}`,
			})),
			...days,
		];
	}, [days]);
	const monthSegments = useMemo(() => {
		if (days.length === 0) return [];
		const leadingDays = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
		const starts: Array<{ key: string; label: string; startWeek: number }> = [];
		let previousMonth = "";
		days.forEach((day, index) => {
			const month = day.date.slice(0, 7);
			if (month === previousMonth) return;
			starts.push({
				key: month,
				label: new Intl.DateTimeFormat("en", {
					month: "short",
					timeZone: "UTC",
				}).format(new Date(`${day.date}T00:00:00Z`)),
				startWeek: Math.floor((leadingDays + index) / 7),
			});
			previousMonth = month;
		});
		const weekCount = Math.ceil((leadingDays + days.length) / 7);
		const visibleStarts = starts.filter(
			(month, index) => starts[index + 1]?.startWeek !== month.startWeek,
		);
		return visibleStarts.map((month, index) => ({
			...month,
			span:
				(visibleStarts[index + 1]?.startWeek ?? weekCount) - month.startWeek,
		}));
	}, [days]);
	const weekCount = Math.max(1, Math.ceil(calendar.length / 7));

	useEffect(() => {
		if (state !== "ready" || days.length === 0) return;
		const frame = window.requestAnimationFrame(() => {
			if (activityScrollRef.current) {
				activityScrollRef.current.scrollLeft =
					activityScrollRef.current.scrollWidth;
			}
		});
		return () => window.cancelAnimationFrame(frame);
	}, [days.length, state]);

	const total = useMemo(
		() => days.reduce((sum, day) => sum + day.count, 0),
		[days],
	);

	return (
		<section
			className={`${className} border border-[var(--term-border)] bg-[var(--term-panel)] ${compact ? "p-3" : "p-4 sm:p-5"}`}
		>
			<header
				className={`${compact ? "mb-2" : "mb-4"} flex flex-wrap items-center justify-between gap-2`}
			>
				<div>
					<p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--term-muted)]">
						GitHub activity
					</p>
					<h2 className="mt-1 text-sm font-bold text-[var(--term-heading)]">
						{state === "ready"
							? `${total.toLocaleString()} contributions in the last year`
							: "Contribution calendar"}
					</h2>
				</div>
				<a
					href="https://github.com/Teinble"
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--term-blue)] hover:underline"
				>
					@Teinble
					<ArrowTopRightOnSquareIcon className="size-3.5" />
				</a>
			</header>

			{state === "loading" && (
				<div
					className={`${compact ? "h-[72px]" : "h-[94px]"} animate-pulse bg-[var(--term-selection)] motion-reduce:animate-none`}
				/>
			)}
			{state === "error" && (
				<p className="py-6 text-sm text-[var(--term-muted)]">
					Activity is unavailable right now. Open GitHub to view the current
					calendar.
				</p>
			)}
			{state === "ready" && calendar.length > 0 && (
				<>
					<div
						ref={graphRef}
						className={`relative ${compact ? "pt-7" : "pt-8"}`}
					>
						{tooltip && (
							<div
								role="tooltip"
								style={{ left: tooltip.left }}
								className="pointer-events-none absolute top-0 z-20 -translate-x-1/2 whitespace-nowrap border border-[var(--term-border)] bg-[var(--term-chrome)] px-2 py-1 text-[10px] font-bold text-[var(--term-heading)] shadow-lg"
							>
								{tooltip.day.count} contribution
								{tooltip.day.count === 1 ? "" : "s"} on{" "}
								{formatDate(tooltip.day.date)}
							</div>
						)}
						<div
							ref={activityScrollRef}
							className="overflow-x-auto pb-2"
							onScroll={() => setTooltip(null)}
						>
							<div
								className="mb-1 grid h-3 min-w-max text-[9px] leading-3 text-[var(--term-muted)]"
								style={{
									gridTemplateColumns: `repeat(${weekCount}, ${compact ? "0.5rem" : "0.625rem"})`,
									columnGap: compact ? "0.125rem" : "0.25rem",
								}}
								aria-hidden="true"
							>
								{monthSegments.map((month) => (
									<span
										key={month.key}
										className="truncate"
										style={{
											gridColumn: `${month.startWeek + 1} / span ${month.span}`,
										}}
									>
										{month.label}
									</span>
								))}
							</div>
							<div
								className="grid min-w-max grid-flow-col grid-rows-7"
								style={{
									gridAutoColumns: compact ? "0.5rem" : "0.625rem",
									columnGap: compact ? "0.125rem" : "0.25rem",
									rowGap: compact ? "0.125rem" : "0.25rem",
								}}
							>
								{calendar.map((day) =>
									"date" in day ? (
										<span
											key={day.date}
											role="img"
											aria-label={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
											title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
											onMouseEnter={(event) => {
												const graphBounds =
													graphRef.current?.getBoundingClientRect();
												if (!graphBounds) return;
												const cellBounds =
													event.currentTarget.getBoundingClientRect();
												const center =
													cellBounds.left -
													graphBounds.left +
													cellBounds.width / 2;
												setTooltip({
													day,
													left: Math.min(
														Math.max(center, 86),
														graphBounds.width - 86,
													),
												});
											}}
											onMouseLeave={() => setTooltip(null)}
											className={`${compact ? "size-2" : "size-2.5"} cursor-crosshair rounded-[2px] border border-[var(--term-border)]/45 ${levelClasses[Math.min(day.level, 4)]}`}
										/>
									) : (
										<span
											key={day.emptyId}
											className={compact ? "size-2" : "size-2.5"}
										/>
									),
								)}
							</div>
						</div>
					</div>
					<div
						className={`${compact ? "mt-1" : "mt-2"} flex items-center justify-end gap-1 text-[10px] text-[var(--term-muted)]`}
					>
						<span>less</span>
						{levelClasses.map((level) => (
							<span
								key={level}
								className={`${compact ? "size-2" : "size-2.5"} rounded-[2px] border border-[var(--term-border)]/45 ${level}`}
							/>
						))}
						<span>more</span>
					</div>
				</>
			)}
			{state === "ready" && calendar.length === 0 && (
				<p className="py-6 text-sm text-[var(--term-muted)]">
					No public contribution data is available.
				</p>
			)}
		</section>
	);
};

export default GithubActivity;
