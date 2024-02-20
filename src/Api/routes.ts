import {Application} from 'express';
import {ApiError} from './models.js';
import {
	getPeopleData,
	getPlanetData,
	getFilmData,
	getProfile,
} from './services.js';

function setupRoutes(app: Application) {
	app.get('/people', async (req, res) => {
		const searchTerm = req.query.searchTerm as string;

		//Validates all special characters
		const regex = /[^a-zA-Z0-9 -]/;

		if (searchTerm.match(regex)) {
			const apiError: ApiError = {
				error: true,
				statusCode: 400,
				errorMessage: 'Please avoid using special characters',
			};

			res.status(apiError.statusCode ?? 500).send(apiError);
			return;
		}
		try {
			const response = await getPeopleData(searchTerm);

			res.send(response);
		} catch (error) {
			const {statusCode} = error as ApiError;
			res.status(statusCode ?? 500).send(error);
		}
	});

	app.get('/profile/:id', async (req, res) => {
		const id = req.params.id;

		try {
			const response = await getProfile(id);

			res.send(response);
		} catch (error) {
			const {statusCode} = error as ApiError;
			res.status(statusCode ?? 500).send(error);
		}
	});

	app.get('/planets/:id', async (req, res) => {
		// Keep as string
		const id = req.params.id;

		try {
			const response = await getPlanetData(id);

			res.send(response);
		} catch (error) {
			const {statusCode} = error as ApiError;
			res.status(statusCode ?? 500).send(error);
		}
	});

	app.get('/films/:id', async (req, res) => {
		const id = req.params.id;
		try {
			const response = await getFilmData(id);

			res.send(response);
		} catch (error) {
			const {statusCode} = error as ApiError;
			res.status(statusCode ?? 500).send(error);
		}
	});
}

export default setupRoutes;
