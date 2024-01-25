import { Outlet } from 'react-router-dom';
import Footer from "./Footer"
import Header from "./Header"
import Nav from "./Nav"

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet/>
            <Nav />
            <Footer />        
        </>
    );
};

export default Layout;