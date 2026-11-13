import type { PortfolioPhoto } from "../content/portfolio";

const ExperiencePhotos = ({
	photos,
	sidebar = false,
}: {
	photos: PortfolioPhoto[];
	sidebar?: boolean;
}) => (
	<section aria-label="Event photos" className={sidebar ? "" : "mt-6"}>
		<h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
			Event photos
		</h2>
		<div className={sidebar ? "grid gap-5" : "grid gap-4 md:grid-cols-2"}>
			{photos.map((photo) => (
				<figure key={photo.src} className="min-w-0">
					<a
						href={photo.src}
						target="_blank"
						rel="noreferrer"
						aria-label={`Open photo: ${photo.caption}`}
						className="block focus-visible:outline-2 focus-visible:outline-offset-4"
					>
						<img
							src={photo.src}
							alt={photo.alt}
							width={photo.width}
							height={photo.height}
							loading="lazy"
							decoding="async"
							className="h-auto w-full rounded-sm"
						/>
					</a>
					<figcaption className="mt-2 text-xs leading-5">
						{photo.caption}
					</figcaption>
				</figure>
			))}
		</div>
	</section>
);

export default ExperiencePhotos;
