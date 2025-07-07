import Logo from "../../assets/Logo.png"
import "./Navbar.css"
const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="left">
                    <div className="Logoimg"><img src={Logo}></img></div>
                    <div className="LogoName"><h3>FlashDoc</h3></div>
                </div>
            </div>
        </>
    );
}

export default Navbar
