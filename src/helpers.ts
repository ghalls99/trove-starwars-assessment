// Front end helpers
import axios, {AxiosError} from 'axios';
import {ApiError, buildApiError} from './error';

const BASE_URL = 'http://localhost:5000';

export const buildUrl = (parameters: string): string => {
	return BASE_URL + parameters;
};

export const getData = async <T>(parameter: string): Promise<T> => {
	try {
		const response = await axios.get(buildUrl(parameter));

		return response.data;
	} catch (error) {
		const apiError: ApiError = buildApiError(error as AxiosError);
		throw apiError;
	}
};

/**
 *
 * @param url
 * @returns
 */
export const extractIdFromUrl = (url: string) => {
	// Remove the trailing slash if it exists
	const trimmedUrl = url.endsWith('/') ? url.slice(0, -1) : url;

	// Split the URL by slashes and take the last part
	const parts = trimmedUrl.split('/');
	return parts[parts.length - 1];
};
