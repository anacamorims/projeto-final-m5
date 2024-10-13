import styles from "./ButtonHome.module.css";
import { Link } from "react-router-dom";

export default function ButtonHome({ name: name, to: to}) {
    return (
        <Link to={to}>
            <button className={styles.animated__button}>
                <span>{name}</span>
                <span></span>
            </button>
        </Link>
    )
}