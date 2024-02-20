import {FC} from 'react';

interface Props {
	imageSource: string;
	films: {
		title: string;
	}[];
}
export const ListFilms: FC<Props> = (props): JSX.Element => {
	return (
		<div className='film-section'>
			<div>
				<div className='film-section-title'>
					<div>
						<img
							className='border-circle'
							src={props.imageSource}
							alt=''
							width={25}
						/>
					</div>
					<p>Featured in</p>
				</div>
			</div>
			<div className='films-grid'>
				{props.films.map((film, index) => (
					<div className='spacing' key={index}>
						{film.title}
					</div>
				))}
			</div>
		</div>
	);
};
