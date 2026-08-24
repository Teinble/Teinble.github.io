import { courseNotes } from "../content/portfolio";

const Notes = ({ nightMode: _nightMode }: { nightMode: boolean }) => (
	<div className="mx-auto max-w-[1200px] p-8 max-md:p-4">
		<h1 className="mb-4 text-[2.5rem] font-bold max-md:text-3xl">
			Course Notes
		</h1>
		<p className="mb-4 text-xl leading-relaxed max-md:text-base">
			Most of my notes are on OneNote and the PDF exports are difficult to read.
			For certain courses, I made readable notes and review materials that I
			hope can be helpful to you.
		</p>
		<section>
			{courseNotes.map(({ title, code, description, href, linkLabel }) => (
				<article
					key={code}
					className="mb-6 rounded-lg border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-[#1a1a1a]"
				>
					<h2 className="mb-2 text-xl font-semibold text-blue-600">
						{title}{" "}
						<span className="ml-2 text-base font-normal text-gray-500">
							{code}
						</span>
					</h2>
					<p className="mb-4 leading-relaxed">{description}</p>
					<a
						href={href}
						target="_blank"
						rel="noreferrer"
						className="mt-4 inline-flex rounded border border-blue-600 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
					>
						{linkLabel} →
					</a>
				</article>
			))}
		</section>
	</div>
);

export default Notes;
