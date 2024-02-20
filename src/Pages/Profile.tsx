import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getData, extractIdFromUrl} from '../helpers';
import {BarLoader} from 'react-spinners';
import {ListFilms} from '../Components/ListFilms';
import videoCamera from '../Img/video-camera.png';
import venus from '../Img/venus.png';
import '../Styles/Profile.css';
import {Character, FilmData, Planet} from '../models';
import {useError} from '../Components/ErrorContext';
import {useParams} from 'react-router';

const Profile = () => {
	const {setErrorMessage} = useError();
	const navigate = useNavigate();
	const [homeworld, setHomeworld] = useState('');
	const [films, setFilms] = useState<FilmData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [profile, setProfile] = useState<Character>({
		name: '',
		homeworld: '',
		films: [],
		url: '',
	});

	const {id} = useParams();

	useEffect(() => {
		const getProfile = async (id: string | undefined) => {
			setErrorMessage('');
			try {
				const response: Character = await getData(`/profile/${id}`);

				setProfile(response);
			} catch (error) {
				setErrorMessage('Unable to find character');
				setHomeworld('');
			}
		};

		getProfile(id);
	}, [id]);

	useEffect(() => {
		const fetchHomeworldAndFilms = async () => {
			if (!profile.homeworld) return;
			try {
				await getHomeworld();
				await getAllFilmData();
			} catch (error) {
				setErrorMessage('Unable to get profile data');
			} finally {
				setIsLoading(false);
			}
		};

		fetchHomeworldAndFilms();
	}, [profile]);

	const getHomeworld = async (): Promise<void> => {
		setErrorMessage(''); // Clearing any existing errors
		try {
			const id = extractIdFromUrl(profile.homeworld);

			const response: Planet = await getData(`/planets/${id}`);

			setHomeworld(response.name);
		} catch (error) {
			setErrorMessage('Unable to find homeworld');
			setHomeworld('');
		}
	};

	const getAllFilmData = async (): Promise<void> => {
		setErrorMessage(''); // Clearing any existing errors
		try {
			const filmPromises = profile.films.map(async (filmUrl) => {
				const id = extractIdFromUrl(filmUrl);

				const film: FilmData = await getData(`/films/${id}`);
				return film;
			});

			// Using promise to get all films at once
			const filmsData: FilmData[] = await Promise.all(filmPromises);

			if (filmsData.length === 0) {
				throw new Error('could not find filmData');
			}

			setFilms(filmsData);
		} catch (error) {
			setErrorMessage('Unable to find requested films');
			setFilms([{title: '', director: ''}]);
		}
	};

	return (
		<div className='container'>
			{isLoading ? (
				<div className='center'>
					<BarLoader />
				</div>
			) : (
				<div className='center'>
					<div className='profile'>
						<div className='title-section'>
							<h1 style={{marginBottom: '0', marginTop: '0'}}>
								{profile.name}
							</h1>
							<div style={{display: 'flex'}}>
								<img src={venus} width={25} height={25} alt='venus icon' />
								<p
									style={{
										marginTop: '0',
										fontSize: '24px',
										paddingLeft: '10px',
									}}>
									<em>{homeworld} </em>
								</p>
							</div>
						</div>
						<ListFilms films={films} imageSource={videoCamera} />
					</div>
					<button
						className='primary-button'
						onClick={() => {
							navigate('/');
						}}>
						Find more People
					</button>
				</div>
			)}
		</div>
	);
};

export default Profile;
