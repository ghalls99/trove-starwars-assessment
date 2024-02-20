import React from 'react';
import {useError} from './ErrorContext';

const ErrorBanner: React.FC = () => {
	const {error} = useError();

	if (!error) return null;

	return (
		<div
			style={{
				backgroundColor: '#8f0b14',
				color: 'white',
				padding: '10px',
				margin: '0 auto',
				textAlign: 'center',
				width: '50%',
			}}>
			{error}
		</div>
	);
};

export default ErrorBanner;
