## Movies Search App
- Built with CRA

### Setup
- Clone the repository - https://github.com/janavianand/movies_search.git
- Create `.env` file in root directory and save credentials as below
```
REACT_APP_MOVIEDB_BASE_URL = enter the movie DB base URL
REACT_APP_MOVIEDB_API_KEY = enter the api key for movie DB

```
- in command line run
  - `npm install`
  - `npm run start_rewired`

### To run tests

- `npm run test`

### To run automated tests

- Start the server - `npm run start_rewired`
- Then run the below commands to start the automated tests
  - `npm run scenarios_chrome`
  - `npm run scenarios_safari`
  - `npm run scenarios_firefox`
  #### Note
  - Inorder to run the test in different browsers, the browser must be installed or available locally

### Extras
- Updates Query string in URL
- Can load a search page with query string in URL - http://localhost:3000/search/movies?qs=the
- Automated Tests
- Movie Card Popup

### Challenges

- Since I have built similar apps before, it was smooth. What took some time was making it responsive.

### To Do

- Add more test
- Handle errors and error page
- More presentable UI
- Dockerize the app
- ES lint and prettier setup

