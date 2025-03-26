import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";

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
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            return setError("Please enter a valid email address.");
        }

        try {
            const response = await axios.post<LoginResponse>("/api/users/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/customer/dashboard");
            }
        } catch (err) {
            const axiosError = err as AxiosError;

            if (axiosError.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D26E63] text-center">
            <div className="bg-white p-8 rounded-t-3xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-[#D26E63] mb-2">LOGIN</h1>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b-2 border-black focus:outline-none p-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b-2 border-black focus:outline-none p-1"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#D26E63] text-white rounded-full py-2 font-semibold"
                    >
                        LOGIN
                    </button>
                </form>

                <p className="text-sm mt-4">
                    Not a member? <a href="/signup" className="text-[#D26E63]">Sign up</a>
                </p>

                <div className="flex justify-center mt-4 space-x-4 text-xl">
                    <a href="#" className="hover:text-primary"><FaInstagram /></a>
                    <a href="#" className="hover:text-primary"><FaFacebookF /></a>
                    <a href="#" className="hover:text-primary"><FaPinterest /></a>
                </div>
            </div>
        </div>
    );
}