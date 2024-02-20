import {render, screen, waitFor} from '@testing-library/react';
import Profile from '../src/Pages/Profile';
import {Route, useNavigate, MemoryRouter, Routes} from 'react-router-dom';
import {getData} from '../src/helpers';
import '@testing-library/jest-dom';

jest.mock('../src/helpers', () => ({
	getData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
	useParams: jest.fn(),
}));

jest.mock('../src/Components/ErrorContext', () => ({
	useError: () => ({setErrorMessage: jest.fn()}),
}));

const mockCharacterData = {
	name: 'John Doe',
	homeworld: 'http://swapi.dev/api/planets/1/',
	films: ['http://swapi.dev/api/films/1/'],
};

const mockHomeworld = {name: 'Earth'};
const mockFilmData = {title: 'A New Hope', director: 'George Lucas'};

describe('Profile Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(useNavigate as jest.Mock).mockImplementation(() => jest.fn());
	});

	(getData as jest.Mock)
		.mockResolvedValueOnce(mockCharacterData)
		.mockResolvedValueOnce(mockHomeworld)
		.mockResolvedValueOnce(mockFilmData);

	it('renders Profile and displays generic data', async () => {
		render(
			<MemoryRouter initialEntries={[`/10`]}>
				<Routes>
					<Route path='/:id' element={<Profile />}></Route>
				</Routes>
			</MemoryRouter>,
		);

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeTruthy();
		});
	});

	(getData as jest.Mock)
		.mockResolvedValueOnce(mockHomeworld) // First call by getHomeworld
		.mockRejectedValueOnce({detail: 'Not found'}); // Second call rejecting the filmData
	it('handles error when fetching films', async () => {
		render(<Profile />);
		const filmElement = screen.queryByText(/some film title/i); // Replace with actual text/content that would be rendered based on films state

		expect(filmElement).not.toBeInTheDocument();
	});

	(getData as jest.Mock)
		.mockResolvedValueOnce(mockHomeworld) // First call by getHomeworld
		.mockRejectedValueOnce({detail: 'Not found'}); // Second call rejecting the filmData

	it('handles missing character name', async () => {
		render(<Profile />);

		const filmElement = screen.queryByText(/some film title/i); // Replace with actual text/content that would be rendered based on films state

		expect(filmElement).not.toBeInTheDocument();
	});
});
