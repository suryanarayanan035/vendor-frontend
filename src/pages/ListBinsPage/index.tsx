import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

import { IOrganizationCard } from "../../interfaces/Bins";
import { fetchOrganizations } from "../../api/ListBinsPage";
import "./listbinspage.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListBinsPage = () => {
  const [organizations, setOrganizations] = useState<any>([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const abortController = new AbortController();
    const fetch = async () => {
      try {
        const response = await fetchOrganizations(abortController.signal);
        console.log(response.organizations);
        if (!response) {
          console.error("Can't fetch data");
        } else {
          console.log(Object.values(response.organizations));
          setOrganizations(Object.values(response.organizations));
        }
      } catch (error) {
        console.log("Unable to fetch data");
        setOrganizations([]);
      }
    };
    if (loading) {
      console.log("Loading");
    } else {
      console.log("Completed loading");
      if (!user) {
        abortController.abort();
        return navigate("/login");
      } else {
        console.log("inside else in listbinspage");
        fetch();
      }
    }

    // return () => {
    //   abortController.abort();
    // };
  }, [user, loading]);
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
