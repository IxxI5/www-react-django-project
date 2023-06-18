import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import api from "../access/api";

/**
 *
 * @returns the NavigationBar Component
 */
function NavigationBar() {
  const isLoggedin = useSelector((state) => state.user.values.loggedin);
  const username = useSelector((state) => state.user.values.username);

  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
        <Container className="ml-5">
          <Navbar.Brand>
            <LinkContainer to="/">
              <img src={logo} alt="logo.png" width={100} height={25} />
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="ml-5 justify-content-end"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/" className="ml-5">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search" className="ml-5">
                <Nav.Link>Word Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/history" className="ml-5">
                <Nav.Link>History</Nav.Link>
              </LinkContainer>
              {isLoggedin ? (
                <LinkContainer to="/" className="ml-5">
                  <>
                    <Nav.Link>
                      <RiLogoutBoxLine
                        className="ml-5"
                        onClick={() => api.logout()}
                      />
                      {username.length > 4
                        ? String(username).substring(0, 4) + "..."
                        : username}
                    </Nav.Link>
                  </>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login" className="ml-5">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
