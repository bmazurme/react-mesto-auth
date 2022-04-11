import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header(props) {
  return (
    <header className="header">
        <a href='/' 
           className="logo" 
           src={logo} alt="Логотип Место">
        </a>
        <NavBar {...props}/>
    </header>
  );
}

export default Header;