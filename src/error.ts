import {AxiosError} from 'axios';

export interface ApiError {
	error: boolean;
	statusCode: number | undefined;
	errorMessage: string | undefined;
}

export const buildApiError = (axiosError: AxiosError) => {
	const axiosResponse = axiosError.response?.data as ApiError;
	const apiError: ApiError = {
		error: true,
		statusCode: axiosError.response?.status,
		errorMessage: axiosError.response?.status
			? axiosResponse.errorMessage
			: 'We are unable to connect to the server. Please check your internet and try again',
	};
	return apiError;
};
