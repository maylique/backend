import { VscAccount } from "react-icons/vsc";
import { HiInboxArrowDown } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";
import "./nav.css"
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi2";



const Nav = () => {

  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/home')
    window.location.reload();
  }
  const goToStorage = () => {
    navigate('/storage')
  }

  return (
    <footer>
      <nav className="navbar navbar-expand navbar-light bg-light navbar-global">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button className="nav-item nav-link" onClick={goToHome}><HiHome /></button>
            <button className="nav-item nav-link" href="#" onClick={goToStorage}><HiOutlineBookmark /></button>
            <button className="nav-item nav-link" href="#"><HiInboxArrowDown /></button>
            <button className="nav-item nav-link" href="#"><VscAccount /></button>
          </div>
        </div>
      </nav>
    </footer>
  );
}

export default Nav;