import Navigation from "../Navigation";
import NavButtons from "../NavButtons";
import "./Layout.css";


const Layout = ({ isLoaded, children }) => {
    return (
        <div className="layout">
            <div className="nav">
                <Navigation isLoaded={isLoaded} />
            </div>
            <div className="layout-bot">
                <div className="nav-left">
                    <NavButtons />
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Layout;
