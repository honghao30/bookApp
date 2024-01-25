import LoginForm from "../components/_member/Login";

const Intro: React.FC = () => {    
    return (
        <div className="login__page">
            <div className="logo-center">
                <h1>진리 도서관</h1>
            </div>
            <LoginForm />
        </div>
    );
};

export default Intro;