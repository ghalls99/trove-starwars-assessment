import express, {Application} from 'express';

const expressSetup = (): Application => {
	const app = express();
	return app;
};

export default expressSetup;
