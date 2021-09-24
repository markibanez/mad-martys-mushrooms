import Nav from "react-bootstrap/nav";

export const Footer = () => {
  return (
    <div className="footer">
      <Nav className="justify-content-center fs-5" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/privacypolicy">Privacy Policy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/terms">Terms</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="footer--background"></div>
    </div>
  );
};
