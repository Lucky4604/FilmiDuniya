import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Divider,
	List,
	ListItemText,
	ListSubheader,
	ListItemIcon,
	Box,
	CircularProgress,
	useTheme,
	ListItemButton,
} from '@mui/material';

import { GenreImg, LinkContainer, StyledLink } from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectCategory } from '../../features/categorySlice';
import genreIcons from '../../assets/genres';

const categories = [
	{ label: 'Popular', value: 'popular' },
	{ label: 'Top Rated', value: 'top_rated' },
	{ label: 'Upcoming', value: 'upcoming' },
];

const redLogo =
	'https://fontmeme.com/permalink/220908/9652145963b1be734d1c669a4a796984.png';
const blueLogo =
	'https://fontmeme.com/permalink/220908/9952ba03b491dc2d3cc31e751f752590.png';

const Sidebar = ({ setMobileOpen }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const categoryId = useSelector((state) => state.currentCategory);
	const { data, isFetching } = useGetGenresQuery();

	useEffect(() => {
		setMobileOpen(false);
	}, [categoryId, setMobileOpen]);

	const clickHandler = (heading, label, id) => {
		const labelId = label.replace(/\s/g, '-');
		navigate(`/${heading}/${labelId}`);
		dispatch(selectCategory(id));
	}

	return (
		<>
			<LinkContainer onClick={() => navigate('/')}>
				<img
					src={theme.palette.mode === 'light' ? redLogo : blueLogo}
					alt='FilmiDuniya Logo'
				/>
			</LinkContainer>
			<Divider />
			<List>
				<ListSubheader>Categories</ListSubheader>
				{categories.map(({ label, value }) => (
					<StyledLink onClick={() => clickHandler('categories', label, value)} key={value}>
						<ListItemButton>
							<ListItemIcon>
								<GenreImg src={genreIcons[label.toLowerCase()]} />
							</ListItemIcon>
							<ListItemText primary={label} />
						</ListItemButton>
					</StyledLink>
				))}
			</List>
			<Divider />
			<List>
				<ListSubheader>Genres</ListSubheader>
				{isFetching ? (
					<Box display={'flex'} justifyContent={'center'}>
						<CircularProgress />
					</Box>
				) : (
					data.genres.map(({ name, id }) => (
						<StyledLink onClick={() => clickHandler('genre', name, id)} key={name}>
							<ListItemButton>
								<ListItemIcon>
									<GenreImg src={genreIcons[name.toLowerCase()]} />
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItemButton>
						</StyledLink>
					))
				)}
			</List>
		</>
	);
};

export default Sidebar;
