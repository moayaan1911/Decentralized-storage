import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.png";
import { Col, Image, Row } from "react-bootstrap";
function ColorSchemesExample() {
  const address = useAddress();
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={logo}
              roundedCircle
              width={60}
              height={50}
              className="me-3"
            />

            <span className="mt-4 align-center justify-center text-center pl-3">
              <strong>PolyCloud</strong>
            </span>
          </Navbar.Brand>
        </Container>
        <div className="me-4">
          <ConnectWallet />
        </div>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
