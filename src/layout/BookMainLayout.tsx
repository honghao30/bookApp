import { Outlet, useLocation } from 'react-router-dom';
import TopUtilMain from "./TopUtilMain"
import BottomNav from "./BottomNav"

const BookMainLayout = () => {
    const location = useLocation();
    return (
        <>
            <TopUtilMain  path={location.pathname} />
            <Outlet/>
            <BottomNav />                  
        </>
    );
};

export default BookMainLayout;