import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../src/Pages/Search';
import {getData} from '../src/helpers';
import {useNavigate} from 'react-router-dom';

jest.mock('../src/helpers', () => ({
	getData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
}));

beforeEach(() => {
	jest.clearAllMocks();

	(useNavigate as jest.Mock).mockImplementation(() => jest.fn());
});

describe('Search Component', () => {
	(getData as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

	it('handles errors gracefully in loadOptions', async () => {
		render(<Search />);

		userEvent.type(screen.getByRole('combobox'), 'Luke');

		expect(await screen.findByText('No options')).toBeTruthy();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
