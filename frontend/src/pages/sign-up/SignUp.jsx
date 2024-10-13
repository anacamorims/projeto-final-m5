import style from "../../styles/style-form-default/StyleFormDefault.module.css";
import BackButton from "../../components/back-button/BackButton"
import InputForm from "../../components/input-form/InputForm";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ButtonDefault from "../../components/button-default/ButtonDefault"
import PersonIcon from '@mui/icons-material/Person';


export default function SignUp() {
    return (
        <div className={style.container_form}>
            <BackButton to={"/"} />

            <h1 className={style.title__form}>Sign Up</h1>

            <form>
                <InputForm 
                    label={"Full Name"}
                    type={"text"} 
                    icon={PersonIcon}
                />
                <InputForm 
                    label={"Phone Number"}
                    type={"number"} 
                    icon={PhoneOutlinedIcon}
                />
                <InputForm 
                    label={"Email Adress"}
                    type={"email"} 
                    icon={EmailOutlinedIcon}
                />
                <InputForm  
                    label={"Password"}
                    type={"password"} 
                    icon={LockOutlinedIcon}
                />

                <ButtonDefault name={"Sign In"} />
            </form>
        </div>
    )
}