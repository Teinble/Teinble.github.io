import { Link } from "react-router-dom";

const skills = {
	"Programming Languages": [
		"Python",
		"Java",
		"C",
		"TypeScript",
		"PostgreSQL",
		"HTML/CSS",
	],
	"Frameworks and Libraries": [
		"React",
		"React Native",
		"Tailwind CSS",
		"DeepEval",
		"LangChain",
		"HuggingFace",
		"Django",
		"PyTorch",
		"Numpy",
		"Scipy",
		"Scikit-learn",
		"Pandas",
		"Streamlit",
	],
	Tools: [
		"LATEX",
		"Git",
		"Linux",
		"Docker",
		"Anaconda",
		"Prisma",
		"Figma",
		"Selenium",
		"BeautifulSoup",
	],
};

const sectionTitle =
	"mb-4 flex items-center gap-2 text-[1.8rem] font-bold max-md:text-2xl";
const cardClass =
	"mb-8 rounded-lg border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-[#1a1a1a]";

const About = ({ nightMode: _nightMode }: { nightMode: boolean }) => (
	<div className="mx-auto max-w-[1200px] p-8 max-md:p-4">
		<h1 className="mb-4 text-[2.5rem] font-bold max-md:text-4xl">About Me</h1>
		<section className="mb-8">
			<p>
				Hello! My name is Xiling, you can also call me <strong>Will</strong>!
			</p>
			<p>
				I was born in Beijing, China. I came to Canada to pursue my studies in
				2019.
			</p>
			<p>Let&apos;s collaborate and code the future together!</p>
		</section>

		<section className="mb-8">
			<h2 className={sectionTitle}>🎓 Education</h2>
			<div className="mb-6">
				<h3 className="mb-2 text-xl font-semibold">
					University of Toronto, St. George
				</h3>
				<p className="mb-2 italic">
					Master of Applied Science in Computer Science (Sep 2025 - July 2027)
				</p>
				<p className="mb-2 italic">
					Honours Bachelor of Science in Computer Science (Sep 2021 - June 2025)
				</p>
				<p className="my-1 text-gray-500">cGPA: 3.94/4.00</p>
				<p className="my-1 text-gray-500">
					Achievements: Dean&apos;s List Scholar x 4
				</p>
				<p className="my-1 text-gray-500">
					Courses Taken: Natural Language Processing, Operating System, Neural
					Nets and Deep Learning, Computer Networks, Algorithm Design &amp;
					Analysis, Software Engineering, Introduction to Databases, and more.
				</p>
			</div>
		</section>

		<section className="mb-8">
			<h2 className={sectionTitle}>💼 Work Experience</h2>
			<div className={cardClass}>
				<h3 className="mb-2 text-xl font-semibold text-blue-600">
					<a
						href="https://iqbank.teach.cs.toronto.edu"
						target="_blank"
						rel="noreferrer"
					>
						IQBank
					</a>
				</h3>
				<p className="mb-2 text-lg font-medium">Founder</p>
				<p className="mb-4 text-sm text-gray-500">May 2025 - Present</p>
				<ul className="list-disc space-y-2 pl-6 leading-6">
					<li>
						Led a team of <strong>8</strong> developers in architecting and
						building a full-stack educational platform from scratch, currently
						serving <strong>400+</strong> students for collaborative exam
						preparation and peer-to-peer learning.
					</li>
					<li>
						Implemented single-click question creation directly on PDF exams
						using coordinate-based positioning, making question annotation{" "}
						<strong>10x faster</strong> than traditional form-based input
						methods.
					</li>
					<li>
						Orchestrated feature development and task delegation, implementing
						Biome, Husky, and GitHub Actions workflows for type-checking and
						testing.
					</li>
					<li>
						Developed an engagement tracking dashboard that helps professors
						identify and promote top contributors as “Junior TAs.”
					</li>
					<li>
						More details about the project can be found{" "}
						<Link to="/projects/iqbank" className="text-blue-600 underline">
							here
						</Link>
						.
					</li>
				</ul>
			</div>
			<div className={cardClass}>
				<h3 className="mb-2 text-xl font-semibold text-blue-600">
					Beijing Xiaomi Mobile Software Co., Ltd.
				</h3>
				<p className="mb-2 text-lg font-medium">Software Engineer Intern</p>
				<p className="mb-4 text-sm text-gray-500">May 2024 - Aug 2024</p>
				<ul className="list-disc space-y-2 pl-6 leading-6">
					<li>
						Engineered the IoT department&apos;s first Large Language Model
						evaluation system, adopted by a team of over 10 engineers,
						integrating DeepEval for metrics collection and LangChain for
						judging RAG models.
					</li>
					<li>
						Generated and evaluated <strong>5,000</strong> test cases from
						official IoT developer documentation to assess RAG system
						performance across six dimensions.
					</li>
				</ul>
			</div>
		</section>

		<section className="mb-8">
			<h2 className={sectionTitle}>🎯 Research Interests</h2>
			<div className="mb-8">
				<h3 className="mb-4 text-xl font-semibold text-gray-500">
					Primary Focus: Computational Linguistics &amp; NLP
				</h3>
				<p className="mb-6 leading-relaxed">
					Driven by my passion for creating AI systems that accurately
					understand and generate human language, my primary research interest
					lies in{" "}
					<strong className="text-blue-600">Computational Linguistics</strong>{" "}
					and{" "}
					<strong className="text-blue-600">
						Natural Language Processing (NLP)
					</strong>
					. This interest has been cultivated through previous coursework,
					projects, and internship experiences.
				</p>
				<p className="mb-6 leading-relaxed">
					While transformer models like ChatGPT have significantly advanced NLP,
					barriers such as high computational costs and limited resources still
					prevent underfunded enterprises from leveraging these technologies.
					I&apos;m passionate about making NLP technologies more efficient and
					scalable.
				</p>
			</div>
			<div className="mb-8">
				<h3 className="mb-4 text-xl font-semibold text-gray-500">
					Secondary Focus: Software Engineering
				</h3>
				<p className="leading-relaxed">
					My secondary interest is in full-stack software engineering,
					particularly software reliability, testing, and fault tolerance.
					I&apos;ve developed expertise in system robustness and maintainability
					while leading the IQBank team.
				</p>
			</div>
		</section>

		<section className="mb-8">
			<h2 className={sectionTitle}>✨ Skills</h2>
			{Object.entries(skills).map(([category, items]) => (
				<div key={category} className="mb-8">
					<h3 className="mb-4 mt-6 text-xl font-semibold text-gray-500">
						{category}
					</h3>
					<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 max-md:grid-cols-2 max-md:gap-2">
						{items.map((item) => (
							<div
								key={item}
								className="rounded border border-gray-200 bg-white px-4 py-2 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-[#1a1a1a]"
							>
								{item}
							</div>
						))}
					</div>
				</div>
			))}
		</section>

		<section className="mb-8">
			<h2 className={sectionTitle}>🎉 Hobbies</h2>
			<ul className="space-y-2">
				<li>🏂 Snowboarding</li>
				<li>🏋️ Fitness</li>
				<li>📺 Watching TV Shows (Better Call Saul is my favorite!)</li>
				<li>🍳 Cooking</li>
			</ul>
		</section>
	</div>
);

export default About;
