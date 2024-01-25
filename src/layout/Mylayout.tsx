import { Outlet } from 'react-router-dom';
import Footer from "./Footer"
import MyHeader from "./MyHeader"
import Nav from "./Nav"

const Layout = () => {
    return (
        <>
            <MyHeader />
            <Outlet/>
            <Nav />                  
        </>
    );
};

export default Layout;