import {useState, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {FaFacebookF, FaInstagram, FaPinterest} from "react-icons/fa";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {Link} from "react-router-dom";
import {LOGIN_URL} from "../constants";

interface User {
    id: number;
    username: string;
    email: string;
    role: "customer" | "admin";
    avatar?: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (email.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (password.trim().length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        return newErrors;
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setTouched({email: true, password: true});
            return;
        }
        setErrors({});

        try {
            const response = await axios.post<LoginResponse>(`${LOGIN_URL}`, {
                email,
                password,
            });

            const {token, user} = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));


            navigate("/account");

        } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response?.status === 401) {
                setErrors({form: "Invalid email or password."});
            } else {
                setErrors({form: "Something went wrong. Please try again."});
            }
        }
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({...prev, [field]: true}));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D26E63] text-center">
            <div className="bg-white p-8 rounded-t-3xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-[#D26E63] mb-2">LOGIN</h1>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                        <label className="text-sm">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleBlur("email")}
                            className={`w-full border p-2 rounded focus:outline-none ${touched.email && errors.email ? "border-red-500" : "border-black"}`}
                        />
                        {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-sm">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => handleBlur("password")}
                                className={`w-full border p-2 pr-10 rounded focus:outline-none ${touched.password && errors.password ? "border-red-500" : "border-black"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff/> : <FiEye/>}
                            </button>
                        </div>
                        {touched.password && errors.password &&
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {errors.form && <p className="text-red-500 text-sm mt-1">{errors.form}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#D26E63] text-white rounded-full py-2 font-semibold"
                    >
                        LOGIN
                    </button>
                </form>

                <p className="text-sm mt-4">
                    Not a member? <Link to="/register" className="text-[#D26E63]">Sign up</Link>
                </p>

                <div className="flex justify-center mt-4 space-x-4 text-xl">
                    <a href="#" className="hover:text-primary"><FaInstagram/></a>
                    <a href="#" className="hover:text-primary"><FaFacebookF/></a>
                    <a href="#" className="hover:text-primary"><FaPinterest/></a>
                </div>
            </div>
        </div>
    );
}
