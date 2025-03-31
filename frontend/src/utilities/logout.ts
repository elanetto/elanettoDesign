import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

export default function logout(navigate: NavigateFunction) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  toast.success("Logged out successfully!");
  navigate("/login");
}
