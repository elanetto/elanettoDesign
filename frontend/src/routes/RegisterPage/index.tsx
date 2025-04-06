import RegisterForm from "../../components/RegisterForm";
import { useEffect } from "react";

export default function RegisterPage() {

    useEffect(() => {
            document.title = `Register | elanetto Design`;
        }, []); 

    return (
        <>
            <RegisterForm />
        </>
    )
}