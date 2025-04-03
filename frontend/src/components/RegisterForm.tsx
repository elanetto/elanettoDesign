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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[A-Za-z0-9_-]{3,}$/.test(username)) {
      newErrors.username = "Username must be at least 3 characters and contain only letters, numbers, hyphens, or underscores.";
    }

    if (email.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    return newErrors;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ username: true, email: true, password: true });
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(`${REGISTER_URL}`, {
        username,
        email,
        password,
        avatar,
        role: "customer",
      });

      if (response.status === 201) {
        toast.success("Account created! You can now log in 🎉");
        navigate("/login");
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ error?: string }>;
      console.error("Registration error:", axiosError);
      setErrors({ form: axiosError.response?.data?.error || "Something went wrong. Please try again." });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D26E63] text-center">
      <div className="bg-white p-8 rounded-t-3xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#D26E63] mb-2">SIGN UP</h1>

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          <div>
            <label className="text-sm">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              className={`w-full border p-2 rounded focus:outline-none ${touched.username && errors.username ? "border-red-500" : "border-black"}`}
            />
            {touched.username && errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

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
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {touched.password && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm">
              Avatar URL <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full border p-2 rounded border-black focus:outline-none"
            />
          </div>

          {errors.form && <p className="text-red-500 text-sm mt-1">{errors.form}</p>}

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
