import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Quiz from "./pages/Quiz";
import Category from "./pages/Category";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
  typography: {
    allVariants: {
      fontFamily: "Quicksand"
    }
  }
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<Home />} />
            <Route path="/play/:number" element={<Quiz />} />
            <Route path="/play" element={<Category />} />
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
