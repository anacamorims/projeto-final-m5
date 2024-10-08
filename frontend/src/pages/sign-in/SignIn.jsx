import style from "./SignIn.module.css";
import BackButton from "../../components/back-button/BackButton";
import InputForm from "../../components/input-form/InputForm";
import ButtonDefault from "../../components/default-button/DefaultButton"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export default function SignIn() {
    return (
        <div className={style.container_sign__in}>
            <BackButton to={"/"} />
            
            <h1 className={style.title__sign_in}>Sing In</h1>
            
            <form>
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