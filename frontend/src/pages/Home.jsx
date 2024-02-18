import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHighScore } from "../slices/highScoreSlice";
import { PlayArrowRounded } from "@mui/icons-material";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
	const user = useSelector((state) => state.user);
	const { username, score } = user;
	const [highScore, sethighScore] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHighScore()).then((res) => {
			// console.log(res.payload);
			sethighScore(res.payload);
		});
	}, []);

	useEffect(() => {
		console.log(user);
	}, []);

	return (
		<>
			<Header />
			<Box
				display="flex"
				justifyContent="center"
				minHeight="100vh"
				marginTop="20px"
				alignItems="center"
				flexWrap="wrap"
				padding="50px"
				gap="50px"
			>
				<Box
					width="80vw"
					maxWidth="500px"
					alignItems="center"
					display="flex"
					flexDirection="column"
					bgcolor="grey.900"
					padding="20px"
					borderRadius="20px"
				>
					<Typography
						fontSize="2.5rem"
						fontWeight="600"
						textAlign="center"
					>
						Welcome {username}
					</Typography>
					<Box>
						<Typography fontSize="1.5rem" fontWeight="500">
							High Score {score ? score : "0"}
						</Typography>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						gap="20px"
						width="100%"
						marginTop="40px"
					>
						<Link
							to="/play"
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							<Button
								variant="contained"
								color="success"
								fullWidth
								startIcon={<PlayArrowRounded />}
								sx={{ color: "white", fontWeight: "600" }}
							>
								Play
							</Button>
						</Link>
					</Box>
				</Box>
				<Box
					alignItems="center"
					display="flex"
					flexDirection="column"
					bgcolor="grey.900"
					padding="20px"
					borderRadius="20px"
					width="30rem"
					maxWidth="500px"
				>
					<Box
						marginBottom="30px"
						borderBottom="1px solid #ffffff30"
						width="100%"
						paddingBottom="20px"
					>
						<Typography
							fontWeight="bold"
							fontSize="1.5rem"
							letterSpacing="1px"
							textAlign="center"
						>
							Leaderboard
						</Typography>
					</Box>
					<TableContainer>
						<Table>
							{/* <TableHead>
							<TableRow>
								<TableCell align="center">Username</TableCell>
								<TableCell align="center">Score</TableCell>
							</TableRow>
						</TableHead> */}
							<TableBody>
								{highScore &&
									highScore.map((score) => {
										return (
											<TableRow
												key={score._id}
												sx={{
													backgroundColor:
														score.username ===
														username
															? "#7e57c2"
															: "",
													borderRadius: "20px",
													border: "none",
													outline: "none",
												}}
											>
												<TableCell align="center">
													{score.username}
												</TableCell>
												<TableCell align="center">
													{score.highscore}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</>
	);
};

export default Home;
