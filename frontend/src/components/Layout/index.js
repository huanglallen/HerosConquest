import NavButtons from "../NavButtons";
import Navigation from "../Navigation";
import "./Layout.css";

const Layout = ({ isLoaded, children }) => {
    return (
        <div className="layout">
            <div className="nav-left">
                <NavButtons />
            </div>
            <div className="content">
                <div className="nav">
                    <Navigation isLoaded={isLoaded} />
                </div>
                <div className="main">
                    {children}
                    </div>
            </div>
        </div>
    )
};

export default Layout;
