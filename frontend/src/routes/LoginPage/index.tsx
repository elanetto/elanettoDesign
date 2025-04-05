import LoginForm from "../../components/LoginForm";
import { useEffect } from "react";

export default function LoginPage() {

    useEffect(() => {
        document.title = `Login | elanetto Design`;
    }, []); 

    return (
       <LoginForm/>
    )
}