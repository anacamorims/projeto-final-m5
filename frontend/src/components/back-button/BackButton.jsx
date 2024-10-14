import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


export default function BackButton({ to }) {
    return (
        <Link to={to}>
            <Box sx={{ "& > :not(style)": { m: 1.5 } }}>
                <Fab sx={{ background: "#F4EFFE", boxShadow: "none" }} aria-label="to-back" size="medium">
                    <ChevronLeftIcon />
                </Fab>
            </Box>
        </Link>
    )
}

