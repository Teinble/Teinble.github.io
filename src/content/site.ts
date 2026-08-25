const buildTime = new Date(import.meta.env.VITE_BUILD_TIME ?? Date.now());

export const lastUpdatedIso = buildTime.toISOString();

export const formatLastUpdated = (compact = false) =>
	new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: compact ? "short" : "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "America/Toronto",
	}).format(buildTime);
