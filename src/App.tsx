import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import './App.css';
import logo from './logo.svg';
import ImageCard from './components/ImageCard';
import { client } from './client';
import Image from './types/Image';
import FeaturedImage from './components/FeaturedImage';
import { sortImages } from './utils/sortImage';

const useStyles = makeStyles((theme) => ({
	centerPerfectly: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	main: {
		marginTop: '2rem',
	},
	secondSection: {
		margin: '2rem 0',
	},
	button: {
		margin: '2rem 0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

function App(): ReactElement {
	const styles = useStyles();
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState<Image[]>([]);
	const [pictureOfTheDay, setPictureOfTheDay] = useState<Image>({
		date: '',
		explanation: '',
		title: '',
		url: '',
	});
	const [lastFetchedDay, setLastFetchedDay] = useState<string>('');
	const [loadingMore, setLoadingMore] = useState(false)

	useEffect(() => {
		const today: string = new Date().toJSON().split('T')[0];

		const thirtyDays: string = new Date(new Date().setDate(new Date().getDate() - 30))
			.toJSON()
			.split('T')[0];

		client
			.get<Image[]>('', { params: { start_date: thirtyDays, end_date: today } })
			.then((data) => {
				const images = data.data;
				const featuredImage = images.find((img) => img.date === today);
				sortImages(images);
				setPictureOfTheDay({
					date: featuredImage?.date,
					explanation: featuredImage?.explanation,
					title: featuredImage?.title,
					url: featuredImage?.url,
				});
				setImages(images);
				setLastFetchedDay(thirtyDays);
			})
			.finally(() => setLoading(false));
	}, []);

	const loadMoreContent = useCallback(async () => {
		const prevThirty:string = new Date(new Date(lastFetchedDay).setDate(new Date(lastFetchedDay).getDate() - 30))
			.toJSON()
			.split('T')[0];
			setLoadingMore(true)

			client
			.get<Image[]>('', { params: { start_date: prevThirty, end_date: lastFetchedDay } })
			.then((data) => {
				let allData = data.data;
				sortImages(allData);
				allData.shift();
				setImages([...images, ...allData]);
				setLastFetchedDay(prevThirty);
			})
			.finally(() => setLoadingMore(false));
		}, 
		[lastFetchedDay, images]
	);

	return (
		<Container className={styles.main}>
			{loading ? (
				<div className={styles.centerPerfectly}>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
			) : (
				<React.Fragment>
					<Typography variant="h4" gutterBottom>
						Featured Image
					</Typography>

					<FeaturedImage featured={pictureOfTheDay} />

					<Typography
						variant="h5"
						gutterBottom
						className={styles.secondSection}
					>
						Images
					</Typography>
					<Grid container spacing={3}>
						{images?.map((image) => (
							<Grid key={image.date as string} item xs={12} md={4} sm={6}>
								<ImageCard imageData={image} />
							</Grid>
						))}
					</Grid>
					<div className={styles.button}>
						{
							loadingMore ? <img src={logo} className="loading-logo" alt="logo" style={{width: '3rem'}} /> : null
						}
						<Button
							color="primary"
							variant="contained"
							onClick={loadMoreContent}
						>
							Load More
						</Button>
					</div>
				</React.Fragment>
			)}
		</Container>
	);
}

export default App;
