import {AxiosError} from 'axios';
import {ApiError} from './models';

export const buildApiError = (axiosError: AxiosError) => {
	const apiError: ApiError = {
		error: true,
		statusCode: axiosError.status,
		errorMessage: axiosError.code,
	};
	return apiError;
};
