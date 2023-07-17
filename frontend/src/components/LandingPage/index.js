import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import "./LandingPage.css";

const LandingPage = () => {
    const { setModalContent } = useModal();

    const handleLogin = () => {
        setModalContent(<LoginFormModal />)
    };
    const handleSignup = () => {
        setModalContent(<SignupFormModal />)
    };
    return (
        <div>
            hi
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    )
};

export default LandingPage;
