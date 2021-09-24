import { Container, Navbar } from "react-bootstrap";

import LogoImg from "../assets/img/logo.png";
import Twitter from "../assets/icons/twitter.svg";
import Discord from "../assets/icons/discord.svg";

export const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
    <Container className="align-items-center">
      <Navbar.Brand href="/" className="d-flex align-items-center">
        <img
          src={LogoImg}
          className="logo"
          alt="Magic Mushroom"
        />{" "}
        Mad Martys Mushrooms
      </Navbar.Brand>
      <Navbar.Text className="justify-content-end">
        <a href="https://twitter.com/0madmarty">
          <img
            src={Twitter}
            className="icon icon-twitter d-inline-block me-2"
            alt="Magic Mushroom Twitter"
          />
        </a>
        <a href="https://discord.gg/NK8Mtgts">
          <img
            src={Discord}
            className="icon icon-discord d-inline-block"
            alt="Magic Mushroom Discord "
          />
        </a>
      </Navbar.Text>
    </Container>
  </Navbar>
);
