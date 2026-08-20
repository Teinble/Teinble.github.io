import {
	ChevronLeftIcon,
	ChevronRightIcon,
	EnvelopeIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const socialLinks = [
	["Email", "mailto:xiling.zhao@mail.utoronto.ca"],
	["Github", "https://github.com/Teinble"],
	["Instagram", "https://www.instagram.com/willzhao86/"],
	["LinkedIn", "https://www.linkedin.com/in/xilingzhao/"],
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
					MScAC 27&apos; @ University of Toronto
				</p>
				<p className="font-medium max-md:text-[0.7rem]">
					Computer Science 25&apos; @ University of Toronto
				</p>
				<div className="flex flex-col gap-2 text-sm max-md:flex-row max-md:flex-wrap max-md:gap-2 max-md:text-[0.6rem]">
					<p className="flex items-center gap-2 font-bold text-gray-500">
						<AcademicCapIcon className="size-4" /> University of Toronto
					</p>
					<p className="flex items-center gap-2 font-bold text-gray-500">
						<MapPinIcon className="size-4" /> Toronto, ON
					</p>
					{socialLinks.map(([label, href]) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 font-bold text-gray-500 underline"
						>
							{label === "Email" && <EnvelopeIcon className="size-4" />}
							{label}
						</a>
					))}
				</div>
			</div>
		</aside>
	);
};

export default InfoContainer;
