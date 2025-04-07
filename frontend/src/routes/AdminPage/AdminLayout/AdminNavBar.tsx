import {FaHome, FaPlusCircle, FaBox, FaCog, FaChartPie} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function AdminNavBar() {
    return (
        <div className="fixed bottom-0 w-full bg-white p-4 flex justify-around items-center shadow-lg">
            <Link to="/admin">
                <FaHome size={28} />
            </Link>
            <FaChartPie size={28} />
            <Link to="/admin/add-new-product">
                <FaPlusCircle size={40} className="bg-black text-white rounded-full p-2" />
            </Link>
            <FaBox size={28} />
            <FaCog size={28} />
        </div>
    );
}
