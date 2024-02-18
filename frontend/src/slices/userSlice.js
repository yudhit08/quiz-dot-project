import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

export const userSignup = createAsyncThunk(
	"user/signup",
	async ({ username, email, password }) => {
		const response = await axios.post(
			"http://localhost:5000/api/user/signup",
			{ username, email, password }
		);
		return response.data;
	}
);

export const userLogin = createAsyncThunk(
	"user/login",
	async ({ email, password }) => {
		const response = await axios.post(
			"http://localhost:5000/api/user/login",
			{ email, password }
		);
		return response.data;
	}
);

export const userValidate = createAsyncThunk("user/auth", async () => {
  const token = localStorage.getItem('QUIZ_USER_TOKEN')

	const response = await axios.post(
		"http://localhost:5000/api/user/auth",
		{},
		{
			headers: {
				"x-access-token": token,
			},
		}
	);

	return response.data;
});

const userEntity = createEntityAdapter({
	selectId: (user) => user.id,
});

const userSlice = createSlice({
	name: "user",
	initialState: userEntity.getInitialState,
	extraReducers: (builder) => {
		builder
			.addCase(userSignup.fulfilled, (state, action) => {
				// userEntity.setOne(state, action.payload);
        return action.payload
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				// userEntity.setOne(state, action.payload);
        return action.payload
			})
			.addCase(userValidate.fulfilled, (state, action) => {
				return action.payload
			});
	},
});

export const userSelectors = userEntity.getSelectors((state) => state.user);
export default userSlice.reducer;
