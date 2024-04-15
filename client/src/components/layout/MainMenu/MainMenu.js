import { useState } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const MainMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">New Wave Festival</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <Link className="nav-link" to={`/`}>Home</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to={`/prices`}>Prices</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to={`/order-a-ticket`}>
                <Button outline color="primary">Order a ticket!</Button>
            </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}

export default MainMenu;