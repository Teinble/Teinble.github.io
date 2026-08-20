const Footer = ({ nightMode: _nightMode }: { nightMode: boolean }) => (
	<footer className="flex justify-around border-t border-gray-200 p-1.5 text-center text-[0.7rem] text-gray-800 dark:border-gray-700 dark:text-gray-100">
		<p>© {new Date().getFullYear()} Xiling Zhao. All rights reserved.</p>
		<p>Last updated: August 20, 2026</p>
	</footer>
);

export default Footer;
