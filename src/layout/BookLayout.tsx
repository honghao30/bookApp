import { Outlet } from 'react-router-dom';
import TopUtil from "./TopUtil"
import BottomNav from "./BottomNav"

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