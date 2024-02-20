## Available Scripts

Initialize the environment with

### `npm install`

In the project directory, you can run:

### `npm start`

Starts both the front-end and back-end environments:

Front-End [http://localhost:3000](http://localhost:3000)

Server [http://localhost:5000](http://localhost:5000)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Endpoints

The available endpoints can be found here:

## People - GET

### `/people?searchTerm='your-search-term`

provide a search term relevant to star wars and it will return a character or a list of characters that is most similar to your search

## Planets - GET

### `/planets/:id`

Provide a request with a specified id and it will return the planet details of said id

## Films - GET

### `/films/:id`

Same as planets, make a request with the desired id and it will return the film details.
