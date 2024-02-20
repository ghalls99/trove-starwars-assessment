export interface Character {
	name: string;
	homeworld: string;
	films: string[];
	url: string;
}

export interface CharacterResponse {
	results: Character[];
}

export interface AsyncSelectList {
	value: string;
	label: string;
}

export interface FilmData {
	title: string;
	director: string;
}

export interface Planet {
	name: string;
}

export interface ErrorContextState {
	error: string | null;
	setErrorMessage: (message: string) => void;
}
