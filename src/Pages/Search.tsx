import {useState} from 'react';
import {getData, extractIdFromUrl} from '../helpers';
import AsyncSelect from 'react-select/async';
import '../Styles/Search.css';
import {useNavigate} from 'react-router-dom';
import {ApiError} from '../error';
import {Character, CharacterResponse, AsyncSelectList} from '../models';
import {useError} from '../Components/ErrorContext';

const Search = () => {
	const {setErrorMessage} = useError();
	const navigate = useNavigate();
	const [people, setPeople] = useState<Character[]>([]);

	/**
	 *
	 * @param inputValue - input provided by the user
	 * @returns - Returns a list of the most relevent characters using the search term the user specified
	 */
	const searchForPerson = async (
		inputValue: string,
	): Promise<AsyncSelectList[]> => {
		setErrorMessage('');
		if (!inputValue.trim()) return []; // Return empty if input is empty or only whitespace

		try {
			const response: CharacterResponse = await getData(
				`/people?searchTerm=${inputValue}`,
			);
			setPeople(response.results);
			// Map results to { value, label } format
			return response.results.map((character: Character) => ({
				value: character.name,
				label: character.name,
			}));
		} catch (error) {
			const {errorMessage} = error as ApiError;
			setErrorMessage(errorMessage ?? 'unable to connect to server');

			return []; // Return empty array in case of error
		}
	};

	/**
	 *
	 * @param selectedOption
	 */

	const navigateToProfile = (selectedOption: AsyncSelectList | null) => {
		if (selectedOption !== null) {
			const foundPerson = people.find(
				(person) => person.name === selectedOption.value,
			);

			if (foundPerson) {
				const id = extractIdFromUrl(foundPerson.url);
				navigate(`/profile/${id}`);
			}
		}
	};

	/**
	 *
	 * @param inputValue - input provided by the user
	 * @param callback - loadOptions uses the callback to populate the select component with the requested data
	 */
	const loadOptions = (
		inputValue: string,
		callback: (options: AsyncSelectList[]) => void,
	) => {
		setErrorMessage(''); // Clearing existing errors
		searchForPerson(inputValue)
			.then((options) => {
				callback(options); // Use the options from searchForPerson
			})
			.catch(() => {
				callback([]); // In case of error, provide an empty array to ensure the UI doesn't break
			});
	};

	return (
		<div>
			<div className='container'>
				<div className='center'>
					<div className='title'>
						<h1>Star Wars Character Finder</h1>
					</div>
					<AsyncSelect
						className='select'
						cacheOptions
						loadOptions={loadOptions}
						onChange={(selectedOption) => {
							// Handle selection
							navigateToProfile(selectedOption);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Search;
