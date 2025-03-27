import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import MobileNavbar from "./MobileNavBar";
import MobileHeader from "./MobileHeader";

export default function Layout() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!isMobile && <Header />}
            {isMobile && <MobileHeader />}

            <main>
                <Outlet />
            </main>

            {!isMobile && <Footer />}
            {isMobile && <MobileNavbar />}
        </>
    );
}
