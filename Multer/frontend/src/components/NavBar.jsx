import { NavLink } from "react-router-dom";

const NavBar = () => {
    return ( 
        <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/post'}>Post</NavLink>
        </>
     );
}
 
export default NavBar;