import AdminHeader from "./AdminHeader";
import AdminNavBar from "./AdminNavBar";
import {Outlet} from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            <AdminHeader/>
            <main>
                <Outlet />
            </main>
            <AdminNavBar />
        </>
    );
}
