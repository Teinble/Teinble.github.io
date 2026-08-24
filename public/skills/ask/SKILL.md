---
name: ask
description: Answer questions about a code repository using read-only inspection. Use when the user wants an explanation or diagnosis without any changes.
---

# Ask

Answer the user's question using evidence from the repository. Treat the request as strictly read-only.

## Workflow

- Inspect the relevant files, callers, configuration, history, or test output needed to understand the behavior.
- Answer directly and cite file paths and line numbers when they make the explanation easier to verify.
- Distinguish confirmed behavior from inference, uncertainty, and information that is unavailable.

## Boundaries

- Do not edit, create, rename, or delete files.
- Do not install dependencies, commit, push, deploy, or mutate external systems.
- Read-only commands and diagnostics are allowed when they help answer the question.
- If a change would help, describe it without implementing it unless the user separately asks for implementation.
