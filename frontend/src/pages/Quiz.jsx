import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { startTimer } from "../slices/timerSlice";

function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * arr.length);
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

function decodeHtml(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}

const Quiz = () => {
	const quiz = useSelector((state) => state.quiz);
	const timer = useSelector((state) => state.timer);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const [numberQuiz, setNumberQuiz] = useState(
		location.pathname.split("/")[2] - 1
	);
	const [datas, setDatas] = useState({});

	useEffect(() => {
		if (numberQuiz === 0) {
			dispatch(startTimer(2));
		}
		async function getDataApi() {
			setDatas({
				question: decodeHtml(quiz.results[numberQuiz].question),
				answer: decodeHtml(quiz.results[numberQuiz].correct_answer),
				options: shuffleArray(
					quiz.results[numberQuiz].incorrect_answers.concat(
						quiz.results[numberQuiz].correct_answer
					)
				),
				id: nanoid(),
			});
		}
		getDataApi();
		console.log("timer: ", timer);

		console.log(quiz.results[numberQuiz].question);
		console.log(datas);
	}, [location.pathname]);

	const handleSubmit = () => {
		setNumberQuiz((prevNumber) => parseInt(prevNumber, 10) + 1);
		navigate(`/play/${numberQuiz}`);
	};

	return (
		<>
			<Header />
			<Grid
        container
				alignItems="center"
				justifyContent="center"
        justifyItems="center"
				padding="50px"
				marginTop="100px"
				minHeight="100vh"
				// gridTemplateColumns="repeat(4, 1fr)"
				// gridTemplateRows="repeat(2, 1fr)"
        columnSpacing={2}
			>
				<Grid
          item
          xs={12}
					width="100%"
					height="100%"
					bgcolor="#ffffff20"
					padding="20px"
					borderRadius="20px"
					fontSize="2rem"
					fontWeight="500"
					gridArea="1/1/2/5"
					textAlign="center"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					{datas?.question}
				</Grid>
				{datas?.options?.map((option, i) => {
					return (
						<Grid
              item
              xs={12}
              md={3}
							key={i}
							alignItems="center"
							justifyContent="center"
              bgcolor="#ffffff20"
              height="100%"
              borderRadius="20px"
              padding="20px"
              onClick={handleSubmit}
              sx={{cursor: "pointer"}}
						>
							<Typography>{option}</Typography>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};

export default Quiz;
