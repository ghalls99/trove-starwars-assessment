import {buildUrl} from './helpers.js';
import axios, {AxiosError} from 'axios';
import {People, Planet, Film, ApiError} from './models.js';
import {buildApiError} from './error.js';

/**
 *
 * @param searchTerm
 * @returns - returns people of search query
 */
export const getPeopleData = async (searchTerm: string): Promise<People> => {
	try {
		const params = {
			method: 'get',
			url: buildUrl(`/people/?search=${searchTerm}`),
		};
		const response = await axios(params);
		return response.data;
	} catch (error) {
		throw buildApiError(error as AxiosError);
	}
};

export const getProfile = async (id: string): Promise<Object> => {
	try {
		const params = {
			method: 'get',
			url: buildUrl(`/people/${id}`),
		};
		const response = await axios(params);
		return response.data;
	} catch (error) {
		throw buildApiError(error as AxiosError);
	}
};

/**
 *
 * @param id
 * @returns - returns planets of specific ids
 */

export const getPlanetData = async (id: string): Promise<Planet | ApiError> => {
	try {
		const params = {
			method: 'get',
			url: buildUrl(`planets/${id}`),
		};
		const response = await axios(params);
		return response.data;
	} catch (error) {
		throw buildApiError(error as AxiosError);
	}
};

/**
 *
 * @param id
 * @returns - returns films of specific ids
 */
export const getFilmData = async (id: string): Promise<Film | ApiError> => {
	try {
		const params = {
			method: 'get',
			url: buildUrl(`films/${id}`),
		};
		const response = await axios(params);
		return response.data;
	} catch (error) {
		throw buildApiError(error as AxiosError);
	}
};
