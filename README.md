# Personal website

## Agent configuration

Personal skills and global instructions live in [Teinble/agent-config](https://github.com/Teinble/agent-config).
`vendor/agent-config` is a Git submodule pinned to the version used by this site.

```sh
git submodule update --init --recursive
npm install
npm run dev
```

Edit skill content and personal registry metadata in the submodule, commit and
push there first, then commit the new submodule pointer in this repository.
To consume an upstream update:

```sh
git submodule update --remote vendor/agent-config
npm test
npm run build
git add vendor/agent-config
git commit -m "chore: update agent configuration"
```

`public/skills/` is generated before development, tests, and builds. Do not edit it.
Third-party recommendations remain in `src/content/agentSkills.ts`.
The website does not install global instructions or report machine deployment state.

## Original scaffold documentation

## Deployment branches

Vercel builds source from `main`. `npm run deploy` publishes the already-built
`dist` directory to `gh-pages` for GitHub Pages. That output branch has no Node
dependencies and must not be built by Vercel.

Both `vercel.json` and `public/vercel.json` disable Vercel deployments for
`gh-pages`; the latter is copied into `dist` by Vite. Keep these settings in sync.
The Setup page links directly to the maintained Brewfile in `Teinble/dotfiles`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
