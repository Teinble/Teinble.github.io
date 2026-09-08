import assert from "node:assert/strict";
import { cpSync, readFileSync, rmSync } from "node:fs";

const source = new URL("../vendor/agent-config/", import.meta.url);
const registry = JSON.parse(
	readFileSync(new URL("registry.json", source), "utf8"),
);
assert.ok(registry.length > 0, "Initialize the agent-config submodule first");
for (const skill of registry) {
	assert.match(skill.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
	const content = readFileSync(
		new URL(`skills/${skill.id}/SKILL.md`, source),
		"utf8",
	);
	assert.ok(content.startsWith(`---\nname: ${skill.id}\n`));
}
const output = new URL("../public/skills/", import.meta.url);
rmSync(output, { recursive: true, force: true });
cpSync(new URL("skills/", source), output, { recursive: true });
