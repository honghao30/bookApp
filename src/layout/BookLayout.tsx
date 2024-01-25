import { Outlet } from 'react-router-dom';
import TopUtil from "../books/TopUtil"
import BottomNav from "../books/BottomNav"

const Layout = () => {
    return (
        <>
            <TopUtil />
            <Outlet/>
            <BottomNav />                  
        </>
    );
};

export default Layout;