import { Outlet } from 'react-router-dom';
import TopUtilMain from "../books/TopUtilMain"
import BottomNav from "../books/BottomNav"

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