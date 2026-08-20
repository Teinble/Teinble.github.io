import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("portfolio routes", () => {
	beforeEach(() => {
		window.location.hash = "";
		window.localStorage.clear();
		document.documentElement.classList.remove("dark");
	});

	it("presents the original about page and a semantic project link", () => {
		render(<App />);

		expect(
			screen.getByRole("heading", { name: "About Me" }),
		).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "here" })).toHaveAttribute(
			"href",
			"#/projects/iqbank",
		);
	});

	it("navigates to the work route through the primary navigation", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("link", { name: "My Projects" }));

		expect(
			screen.getByRole("heading", { name: "My Projects" }),
		).toBeInTheDocument();
	});

	it("persists the selected color theme", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(
			screen.getByRole("button", { name: "Switch to dark mode" }),
		);

		expect(document.documentElement).toHaveClass("dark");
		expect(window.localStorage.getItem("theme")).toBe("dark");
	});
});
