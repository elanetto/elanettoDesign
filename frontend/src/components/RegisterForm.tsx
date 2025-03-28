import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { REGISTER_URL } from "../constants";


export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post(`${REGISTER_URL}`, {
                username,
                email,
                password,
                avatar,
                role: "customer"
            });
        
            if (response.status === 201) {
                toast.success("Account created! You can now log in 🎉");
                navigate("/login");
            }            
        
        } catch (err) {
            const axiosError = err as AxiosError<{ error?: string }>;
            console.error("Registration error:", axiosError);
            setError(axiosError.response?.data?.error || "Something went wrong. Please try again.");
        }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D26E63] text-center">
            <div className="bg-white p-8 rounded-t-3xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-[#D26E63] mb-2">SIGN UP</h1>

                <form onSubmit={handleRegister} className="space-y-4 text-left">
                    <div>
                        <label className="text-sm">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border-b-2 border-black focus:outline-none p-1"
                            required
                        />
                    </div>
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b-2 border-black focus:outline-none p-1 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">Avatar URL (optional)</label>
                        <input
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full border-b-2 border-black focus:outline-none p-1"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#D26E63] text-white rounded-full py-2 font-semibold"
                    >
                        SIGN UP
                    </button>
                </form>

                <p className="text-sm mt-4">
                    Already a member? <Link to="/login" className="text-[#D26E63]">Login</Link>
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
