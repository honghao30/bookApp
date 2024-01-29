import { Outlet } from 'react-router-dom';
import TopUtilMain from "./TopUtilMain"
import BottomNav from "./BottomNav"

const BookMainLayout = () => {
    return (
        <>
            <TopUtilMain />
            <Outlet/>
            <BottomNav />                  
        </>
    );
};

export default BookMainLayout;