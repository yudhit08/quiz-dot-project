import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { categories, difficulty, types } from "../lib/quiz";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { getQuiz } from "../slices/quizSlice";

function Category() {
	const [isSet, setIsSet] = useState(true);
	const [apiData, setApiData] = useState({
		number: 5,
		category: "Any Category",
		difficulty: "Any Difficulty",
		type: "Any Type",
	});

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = () => {
    dispatch(getQuiz(apiData))
    .then(res => {
      console.log(res.payload.results)
      navigate("/play/1")
    })
  }

	function handleChange(event) {
		const { name, value } = event.target;
		if (name === "number" && (value < 1 || value > 50)) {
			setIsSet(false);
		} else {
			setIsSet(true);
		}
		setApiData((prevApiData) => {
			return {
				...prevApiData,
				[name]: value,
			};
		});
	}

	function checkInputValue() {
		if (apiData.number < 1 || apiData.number > 50) {
			return (
				<TextField
					error
					// inputProps={{ type: "number", min: "1", max: "50" }}
					inputProps={{ type: "text" }}
					id="outlined-error-helper-text"
					label="Number of Question"
					value={apiData.number}
					onChange={handleChange}
					helperText="Value must be between 1 and 50"
					name="number"
				/>
			);
		} else {
			return (
				<TextField
					// inputProps={{ type: "number", min: "1", max: "50" }}
					inputProps={{ type: "text" }}
					id="outlined-error-helper-text"
					label="Number of Question"
					value={apiData.number}
					onChange={handleChange}
					helperText="Value must be between 1 and 50"
					name="number"
				/>
			);
		}
	}

	return (
		<>
			<Header />
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				minHeight="100vh"
				flexDirection="column"
				width="100vw"
				maxWidth="40rem"
				gap="2rem"
				margin="0 auto"
        padding="50px"
			>
				<h1>Set your Quiz</h1>
				<FormControl fullWidth>{checkInputValue()}</FormControl>
				<FormControl fullWidth>
					<InputLabel htmlFor="category">Select Category</InputLabel>
					<Select
						name="category"
						id="category"
						value={apiData.category}
						onChange={handleChange}
						input={<OutlinedInput label="Select Category" />}
					>
						{categories.map((categorie) => {
							return (
								<MenuItem
									key={categorie.value}
									value={categorie.value}
								>
									{categorie.text}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel htmlFor="difficulty">
						Select Difficulty
					</InputLabel>
					<Select
						name="difficulty"
						id="difficulty"
						value={apiData.difficulty}
						onChange={handleChange}
						input={<OutlinedInput label="Select Difficulty" />}
					>
						{difficulty.map((difficult) => {
							return (
								<MenuItem
									key={difficult.value}
									value={difficult.value}
								>
									{difficult.text}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel htmlFor="type">Select Type</InputLabel>
					<Select
						name="type"
						id="type"
						value={apiData.type}
						onChange={handleChange}
						input={<OutlinedInput label="Select Type" />}
					>
						{types.map((type) => {
							return (
								<MenuItem key={type.value} value={type.value}>
									{type.text}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<Box display="flex" justifyContent="center" width="100%" flexDirection="column">
					{/* <Link to="/">
						<Fab size="medium" aria-label="back">
							<ArrowBackIcon />
						</Fab>
					</Link> */}
					{/* <Link to={isSet ? "/play-quiz" : ""}> */}
						<Button
              fullWidth
							className="start-btn"
							variant="contained"
              color="success"
							onClick={handleSubmit}
						>
							Start
						</Button>
					{/* </Link> */}
				</Box>
			</Box>
		</>
	);
}

export default Category;
