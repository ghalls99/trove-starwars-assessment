import expressSetup from './express.config.js';
import setupRoutes from './routes.js';

import cors from 'cors';

const app = expressSetup();

app.use(cors());

setupRoutes(app);

app.listen(5000, () => {
	console.log('server listening on port 5000');
});
