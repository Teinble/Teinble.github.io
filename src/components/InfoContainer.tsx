import {
	ChevronLeftIcon,
	ChevronRightIcon,
	EnvelopeIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { type SVGProps, useState } from "react";
import { education } from "../content/portfolio";

const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		<path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.92c-2.78.62-3.36-1.2-3.36-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 7.02c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
	</svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		<path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
	</svg>
);

const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		<path d="M6.94 8.5H3.56V19h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3Zm15.19 10.04c0-3.16-1.69-4.63-3.94-4.63-1.82 0-2.63 1-3.09 1.7V8.5h-3.38V19h3.38v-5.2c0-1.37.26-2.7 1.96-2.7 1.67 0 1.69 1.56 1.69 2.79V19h3.38v-5.96Z" />
	</svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		<path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.84L7.08 4.13H5.12l11.96 15.64Z" />
	</svg>
);

const socialLinks = [
	{
		label: "Email",
		href: "mailto:xiling.zhao@mail.utoronto.ca",
		icon: EnvelopeIcon,
	},
	{ label: "GitHub", href: "https://github.com/Teinble", icon: GitHubIcon },
	{
		label: "Instagram",
		href: "https://www.instagram.com/willzhao86/",
		icon: InstagramIcon,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/xilingzhao/",
		icon: LinkedInIcon,
	},
	{ label: "X (@Teinble)", href: "https://x.com/Teinble", icon: XIcon },
];

const InfoContainer = ({ nightMode: _nightMode }: { nightMode: boolean }) => {
	const [currentImage, setCurrentImage] = useState(0);
	const images = ["/profile1.JPG", "/profile2.JPG", "/profile3.JPG"];

	return (
		<aside className="flex w-1/4 flex-col gap-4 max-md:w-full max-md:flex-row">
			<div className="relative mx-auto w-[90%] max-md:w-[40%]">
				<img
					src={images[currentImage]}
					alt={`Xiling Zhao profile ${currentImage + 1} of ${images.length}`}
					className="aspect-square w-full rounded-[15px] border border-gray-800 object-cover p-0.5 shadow-sm max-md:rounded-full dark:border-white"
				/>
				<button
					type="button"
					onClick={() =>
						setCurrentImage((currentImage - 1 + images.length) % images.length)
					}
					className="absolute left-0 top-1/2 grid size-[30px] -translate-y-1/2 place-items-center rounded-full bg-white/70 text-gray-800 hover:bg-white dark:bg-black/70 dark:text-white"
					aria-label="Previous profile photo"
				>
					<ChevronLeftIcon className="size-4" />
				</button>
				<button
					type="button"
					onClick={() => setCurrentImage((currentImage + 1) % images.length)}
					className="absolute right-0 top-1/2 grid size-[30px] -translate-y-1/2 place-items-center rounded-full bg-white/70 text-gray-800 hover:bg-white dark:bg-black/70 dark:text-white"
					aria-label="Next profile photo"
				>
					<ChevronRightIcon className="size-4" />
				</button>
			</div>
			<div className="flex flex-col gap-4 max-md:flex-1 max-md:gap-2">
				<div className="flex items-center gap-2">
					<h2 className="text-2xl font-bold max-md:text-base">
						Xiling (Will) Zhao
					</h2>
					<p className="font-bold text-gray-500 max-md:text-xs">He/Him</p>
				</div>
				<p className="font-medium max-md:text-[0.7rem]">
					{education.graduate.short} @ University of Toronto
				</p>
				<p className="font-medium max-md:text-[0.7rem]">
					{education.undergraduate.short} @ University of Toronto
				</p>
				<div className="flex flex-col gap-2 text-sm max-md:flex-row max-md:flex-wrap max-md:gap-2 max-md:text-[0.6rem]">
					<p className="flex items-center gap-2 font-bold text-gray-500">
						<AcademicCapIcon className="size-4" /> University of Toronto
					</p>
					<p className="flex items-center gap-2 font-bold text-gray-500">
						<MapPinIcon className="size-4" /> Toronto, ON
					</p>
					{socialLinks.map(({ label, href, icon: Icon }) => (
						<a
							key={label}
							href={href}
							target={href.startsWith("https://") ? "_blank" : undefined}
							rel={href.startsWith("https://") ? "noreferrer" : undefined}
							className="flex items-center gap-2 font-bold text-gray-500 underline transition-colors hover:text-gray-800 dark:hover:text-gray-200"
						>
							<Icon className="size-4 shrink-0" />
							{label}
						</a>
					))}
				</div>
			</div>
		</aside>
	);
};

export default InfoContainer;
