# Important Note

- This repository was created by `create-react-app`. Hence, do not touch `package.json` for any reason.
- Do NOT install any extra library for testing or otherwise. There are already 4 testing libraries installed for you. You can search them and look up their documentations.
  - @testing-library/jest-dom
  - @testing-library/react
  - @testing-library/user-event
  - jest
  - lodash
  - classnames
- Do NOT touch `index.js`, and `setupTests.js` in `src` folder.
- Do NOT touch `public` directory.
- These files are ignored for scoring purposes.
  - App.js
  - index.css
  - logo.svg
  - `public/*` folder
  - serviceWorker.js
- You can use App.js to test your solutions. However, if you do not put your copy back the code in the relevant question folder, we won't be able to test it.
- There are 6 questions (2 JS only + 3 react-based + 1 mock)
  - `abort-promise`, `iter-window` do NOT require any kind of React code. They are JS only.
  - `use-form` is a question based on React hooks. If you do not know hooks, **read about them** and try this question at the last.
- Only files in the <question-name> folder will be used. So ensure that if you create any new files, they are always in the same folder as the question.
- Any styling is ignored.

## Instructions

- Watch this video before starting the test - [How to do this assessment](https://www.youtube.com/watch?v=FkIF8MeKeG8)
- Once you click the link and the assessment repo, you will get a private repo that only you have access to.
- You can now `git clone` the newly created repo on to your computer.
- The question are in the `src` folder and each question has its own folder. The number of folder in the `src` is the number of questions.
- There 3 files (generally) in each folder.
  - An implementation file with a predefined `export` statement.
  - An empty test file.
  - A `README.md` which describes the question. Make sure to read the file carefully.
- You can change the implementation file as you like except changing the `export` statement. If you change the exported name, you will won't be auto-graded.
- In the test file, you are free to write your own tests. Use [jest](https://jestjs.io/). The auto-grader uses jest test cases. Do not change the `import` statement.
- While checking, your test cases will NOT be used. Instead, internal test cases will be used.
  - **So make sure to handle all cases that you can think of.**
- It is recommended that you use ES6 or above features to implement your solutions, where ever applicable.

## How to Submit

- Since this assessment repo is private and only you have access to it, you can push directly to master.
- Once you've done a question, you can commit those changes and push to `master`.
- You can make as many commits as you want.
- **There is no need of making a PR.** Though, you can create a PR and merge it yourself.
- After the deadline, whatever code exists in the `master` branch will be taken as final.
  - Hence, ensure that if you open any PR, you merge it yourself.

## Grading

The code will be graded on the following criteria.  
Each point has equal weight.

- How much readable (for example, using good names)
- How much maintainable it is
- Is formatted and following JS style guides (e.g ESLint) and best-practices
- Is correct (that is, passes all of _our_ tests)
  - **Note-** If your implementation fails ALL of our test cases, it will get a score of 0 irrespective of the rest 3 points.

## Setup command

You can use `npm install` or `yarn install` in the root of the directory to get started.

# Restrictions

- You can look up documentation on the internet, but copying code is prohibited.
  - **If you code is found to contain copied code, you'll fail the complete assessment.**
- You can't install any library apart from already mentioned in the `package.json`
- You are not supposed to modify files like `.babelrc.js`, `package.json` etc.
- You can't use `eval` or the `Function` constructor anywhere in your implementations unless explicitly mentioned in the question's README.
