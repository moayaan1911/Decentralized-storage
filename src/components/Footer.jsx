import { useAddress } from "@thirdweb-dev/react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function TextLinkExample() {
  const address = useAddress();
  return (
    <Navbar bg="primary" variant="dark" className={"mt-4"}>
      <Container>
        <Navbar.Brand href="">
          Built by{" "}
          <a
            className=""
            href="https://linktr.ee/ayaaneth"
            rel="noreferrer"
            target="_blank"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <i class="fa-brands fa-ethereum fa-beat"></i>
            moayaan.eth
            <i class="fa-brands fa-ethereum fa-beat"></i>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a
              className=""
              href="https://youtu.be/Adh9l1aLv_o"
              rel="noreferrer"
              target="_blank"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Video Demo
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
