import React, {createContext, useContext, useState, ReactNode} from 'react';
import {ErrorContextState} from '../models';

const ErrorContext = createContext<ErrorContextState>({
	error: null,
	setErrorMessage: () => {},
});

export function useError() {
	return useContext(ErrorContext);
}

interface ErrorProviderProps {
	children: ReactNode;
}

// Wrapper for error handling
export const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
	const [error, setError] = useState<string | null>(null);

	const setErrorMessage = (message: string) => {
		setError(message);
	};

	return (
		<ErrorContext.Provider value={{error, setErrorMessage}}>
			{children}
		</ErrorContext.Provider>
	);
};
