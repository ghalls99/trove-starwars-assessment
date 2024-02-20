export interface ApiError {
	error: boolean;
	statusCode: number | undefined;
	errorMessage: string | undefined;
}

export interface People {
	results: {
		name: string;
		films: string[];
		homeworld: string;
	}[];
	next: string | null;
}

export interface Planet {
	name: string;
}

export interface Film {
	title: string;
}
