import { Box, Button, Typography } from "@mui/material";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

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
  const navigate = useNavigate()
	const location = useLocation();

	const [numberQuiz, setNumberQuiz] = useState(location.pathname.split("/")[2] - 1);
	const [datas, setDatas] = useState({});

	useEffect(() => {
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

		console.log(quiz.results[numberQuiz].question);
		console.log(datas);
	}, [location.pathname]);

  const handleSubmit = () => {
    setNumberQuiz(prevNumber => parseInt(prevNumber, 10) + 1)
    navigate(`/play/${numberQuiz}`)
  }

	return (
		<>
			<Header />
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				minHeight="100vh"
			>
				<Box>{datas?.question}</Box>
				<Box>
          {datas?.options?.map((option, i) => {
            return (
              <Typography key={i}>{option}</Typography>
              )
          })}
        </Box>
        <Button onClick={handleSubmit}>
          Next
        </Button>
			</Box>
		</>
	);
};

export default Quiz;
