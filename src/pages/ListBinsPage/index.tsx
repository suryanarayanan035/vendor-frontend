import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

import { IOrganizationCard } from "../../interfaces/Bins";
import { fetchOrganizations } from "../../api/ListBinsPage";
import "./listbinspage.css";

const ListBinsPage = () => {
  const [organizations, setOrganizations] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchOrganizations();
        console.log(response.organizations);
        if (!response) {
          setOrganizations([]);
        } else {
          console.log(Object.values(response.organizations));
          setOrganizations(Object.values(response.organizations));
        }
      } catch (error) {
        console.log("Unable to fetch data");
        setOrganizations([]);
      }
    };
    fetch();
  }, []);
  return (
    <Container>
      <Row>
        {organizations.length > 0
          ? organizations.map((organization: IOrganizationCard) => {
              return (
                <Col md={6} lg={4} sm={12} key={organization.organizationId}>
                  <Card className="mb-3">
                    <Card.Img
                      variant="top"
                      className="bin-card-img"
                      src={organization.logo}
                    ></Card.Img>
                    <Card.Body>
                      <Card.Title className="mb-2 card-title">
                        {organization.name}
                      </Card.Title>
                      <Card.Text>
                        Organization Id:&nbsp;
                        <strong> {organization.organizationId}</strong>
                        <br />
                        Organization: &nbsp;<strong>{organization.name}</strong>
                        {/* <br />
                        No of Bins Sold: &nbsp;
                        <strong>{organization.noOfBinsSold}</strong>
                        <br /> */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : "No bins sold"}
      </Row>
    </Container>
  );
};

export default ListBinsPage;
