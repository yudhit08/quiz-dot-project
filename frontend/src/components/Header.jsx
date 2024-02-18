import { Avatar, Box, Chip } from "@mui/material";
import { useSelector } from "react-redux";

const Header = () => {
	const user = useSelector((state) => state.user);
	const { username, score } = user;

	return (
		<Box
			display="flex"
			width="100%"
			padding="20px 50px"
			position="fixed"
      alignItems="center"
      justifyContent="flex-end"
			top="0"
			zIndex="1000"
      borderBottom="1px solid #eeeeee30"
      bgcolor="#212121"
		>
			<Box display="flex" alignItems="center" gap="20px">
				<Avatar>{username.split("")[0].toUpperCase()}</Avatar>
        <Chip label={score ? score : "0"} />
			</Box>
		</Box>
	);
};

export default Header;
