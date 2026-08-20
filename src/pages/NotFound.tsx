import { Link } from "react-router-dom";

const NotFound = ({ nightMode: _nightMode }: { nightMode: boolean }) => (
	<div className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-center justify-center p-8 text-center">
		<h1 className="m-0 text-9xl font-bold leading-none text-blue-600 max-md:text-7xl">
			404
		</h1>
		<h2 className="my-4 text-3xl font-bold">Page Not Found</h2>
		<p className="mb-8 max-w-xl text-xl text-gray-500">
			Oops! The page you&apos;re looking for doesn&apos;t exist or has been
			moved. Let&apos;s get you back on track.
		</p>
		<Link
			to="/"
			className="inline-flex rounded bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
		>
			← Back to Home
		</Link>
	</div>
);

export default NotFound;
