import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { userValidate } from "../slices/userSlice";

const PrivateRoute = ({ redirectPath = "/login" }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		dispatch(userValidate())
			.then((result) => {
				if (result.payload) {
					setIsAuth(true);
				} else {
					setIsAuth(false);
					navigate(redirectPath);
				}
			})
			.catch(() => {
				navigate(redirectPath);
			});
	}, [location.pathname]);

	return <>{isAuth && <Outlet />}</>;
};

PrivateRoute.propTypes = {
	redirectPath: PropTypes.string,
};

export default PrivateRoute;
