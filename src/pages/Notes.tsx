const notes = [
	[
		"Introduction to Artificial Intelligence",
		"CSC384 2025W",
		"The final exam in my term was quite different and more difficult than previous years. I made a compact cheat sheet for review.",
		"/assets/CSC384.pdf",
		"View Cheat Sheet I made →",
	],
	[
		"Introduction to Linguistics: Sentence",
		"LIN102 2025W",
		"A very interesting breadth course with many definitions to remember. I made a Q&A sheet for midterm and final review.",
		"/assets/LIN102.pdf",
		"View Q&A Sheet I made →",
	],
	[
		"Introduction to Graph Theory",
		"MAT332 2024W",
		"Definition practice sheets I made for final review after working through the course concepts and proofs.",
		"/assets/MAT332.pdf",
		"View Practices →",
	],
	[
		"Operating System",
		"CSC369 2023F",
		"Cheat-sheet notes for one of the most difficult courses I took at U of T. Start the assignments seriously early!",
		"/assets/CSC369.pdf",
		"View Notes →",
	],
] as const;

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
			{notes.map(([title, code, description, href, label]) => (
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
						{label}
					</a>
				</article>
			))}
		</section>
	</div>
);

export default Notes;
