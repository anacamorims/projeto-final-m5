import styles from "./CardHome.module.css";
import { Box, Fab } from "@mui/material";

export default function CardHome({ icon: Icon, title, description}) {
    return (
        <ul className={styles.container__cards}>
            <li className={styles.cards}>
                <Box sx={{ "& > :not(style)": { mb: 1.5} }}>
                    <Fab sx={{ boxShadow: "none", background: "transparent" }} aria-label="to-back" size="medium">
                    {Icon && <Icon />}
                    </Fab>
                </Box>
                <h3>{title}</h3>
                <p>{description}</p>
            </li>
        </ul>
    )
}