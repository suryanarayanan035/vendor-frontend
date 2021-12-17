import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import "./footer.css";
export const Footer = () => {
  return (
    <Container
      className="footer"
      fluid
      style={{
        backgroundColor: "lightgreen",
      }}
    >
      <Row>
        <Col className="mt-3 mb-1 right-margin-style">
          <Image
            className="footer-brand-image"
            src="https://firebasestorage.googleapis.com/v0/b/test-f8201.appspot.com/o/wywlogo-removebg.png?alt=media&token=dca92949-6eb4-4df6-8187-6ed20117a2ae"
          ></Image>

          <h3>Meridian SPICKTECH</h3>
          <div>Site No.13B-Cheran Coperative indutrial Estate</div>
          <div>Vadavalli Road,Kalpanayakanpalayam</div>
          <div>Coimbatore - 641108</div>
        </Col>
        <Col className="mt-3 mb-1 right-margin-style text-center my-auto d-flex justify-content-center align-items-center">
          <div>
            <div>
              <h4>Contact Info</h4>
              <div>
                <strong>Mobile: </strong> 9842480767
              </div>
            </div>
            <strong>Website:</strong> www.watchyourwaste.in
          </div>
        </Col>
        <Col className="mt-3 mb-1 text-center">
          <Image
            className="footer-brand-image"
            src="https://firebasestorage.googleapis.com/v0/b/test-f8201.appspot.com/o/srec_footer_logo-removebg-preview.png?alt=media&token=fc64b566-d791-4b52-85c4-b8e4dcd7b883"
          ></Image>
          <div className="powered-by">
            Powered By Sri Ramakrishna Engineering College
          </div>
        </Col>
      </Row>
    </Container>
  );
};
