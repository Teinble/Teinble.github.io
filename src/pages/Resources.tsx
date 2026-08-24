import { terminalDocuments } from "../content/portfolio";

const resourceIds = ["dotfiles", "mac-setup", "linux-setup", "tools"] as const;

const Resources = () => (
	<div className="mx-auto max-w-[1200px] p-8 max-md:p-4">
		<h1 className="mb-3 text-[2.5rem] font-bold max-md:text-3xl">
			Setup &amp; Resources
		</h1>
		<p className="mb-7 max-w-3xl leading-7 text-gray-500">
			The portable setup notes and tools shown in Terminal mode—presented here
			in the original website style.
		</p>
		<div className="grid gap-4 lg:grid-cols-2">
			{resourceIds.map((id) => {
				const resource = terminalDocuments[id];
				return (
					<article
						key={id}
						className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-[#1a1a1a]"
					>
						<h2 className="text-xl font-semibold text-blue-600">
							{resource.title}
						</h2>
						<p className="my-3 leading-6 text-gray-500 dark:text-gray-300">
							{resource.intro}
						</p>
						{resource.sections.map((section) => (
							<section key={section.heading} className="mt-4">
								<h3 className="mb-1.5 font-semibold">{section.heading}</h3>
								{section.body && <p className="leading-6">{section.body}</p>}
								{section.items && (
									<ul className="list-disc space-y-1 pl-5 text-sm leading-6">
										{section.items.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								)}
								{section.links?.map((link) => (
									<a
										key={link.href}
										href={link.href}
										target="_blank"
										rel="noreferrer"
										className="font-medium text-blue-600 underline"
									>
										{link.label}
									</a>
								))}
							</section>
						))}
					</article>
				);
			})}
		</div>
	</div>
);

export default Resources;
