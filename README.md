# Movie List App for FanCode (Frontend)

### Made with ❤️ by Siddhant

## Technologies used

* Node
* React
* Vite
* Git
* Typescript

## How to setup

- install git [here](https://git-scm.com/downloads) if you haven't already
- install node [here](https://nodejs.org/dist/v20.10.0/node-v20.10.0.pkg) if you haven't already
  type `npm -v`, `node -v` and `git -v` in your terminal to check if they were installed correctly.(checks the versions of npm, node and git respectively)
- Fork the repo.
- go to your command line and type `git clone <your-repo-link.git> `
- once the repo is cloned to your local, go to the **master** branch
- In the terminal go to the project folder and type `npm install`
- In the same terminal type `npm start`
- Voila! your vite server is now running on [`localhost:8080`](localhost:8080)

## Additional Info

- You might encounter some errors due to incorrect installation of react-icons.
  - If so, try to install it manually through thterminal : `npm install react-icons @types/react-icons`

## Features (Covered)

1. List of Genre (multi select)
2. Search Bar (debounce implemented to limit the number of API calls)
3. Infinite Scroll (upwards and downwards)
4. Only shows movies till the current year
5. Only shows movies with vote count >= 150
6. Starts with the year 2012 (primary_release_year)


## Features (Not Covered)
1. Authentication and user management.
2. Detailed movie information page.
3. Caching movie data for offline access.
4. Unit and integration tests.
5. React Native