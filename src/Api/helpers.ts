const BASE_URL = 'https://swapi.dev/api/';

export const buildUrl = (path: string): string => {
	return BASE_URL + path;
};
