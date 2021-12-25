import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { createBin } from "../../api/CreateBinPage";
import { fetchOrganizations } from "../../api/ListBinsPage";
import { auth } from "../../firebase";
import { useInput } from "../../hooks/useInput";

const validateMacId = (e: any) => {
  const { value } = e.target;
  if (!value || value?.length < 10) {
    return true;
  }
  return false;
};

const validateOrganization = (e: any) => {
  const { value } = e.target;
  if (!value || value?.length < 1) {
    return true;
  }
  return false;
};

const validateBinName = (e: any) => {
  const { value } = e.target;
  if (!value || value?.length < 1) {
    return true;
  }
  return false;
};

const CreateBinPage = () => {
  const binHeights: { [key: string]: number } = {
    "25": 48,
    "30": 68,
    "50": 70,
  };
  const emptySpaces: { [key: string]: number } = {
    "25": 26,
    "30": 32,
    "50": 46,
  };
  const { bind: bindMacId, error: macIdError } = useInput("", validateMacId);
  const { bind: bindBinName, error: binNameError } = useInput(
    "",
    validateBinName
  );
  const { bind: bindVolume } = useInput("25");
  const { bind: bindNoOfRacks } = useInput("45");
  const [organizations, setOrganizations] = useState<any[]>([]);
  const { bind: bindOrganization, error: organizationError } = useInput(
    "",
    validateOrganization,
    "select"
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const selectOrganizationRef = useRef<HTMLSelectElement>(null);
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const selectedOrganization =
      selectOrganizationRef.current?.selectedOptions[0].value;
    if (!(macIdError && organizationError)) {
      const data = {
        macId: bindMacId.value,
        volume: bindVolume.value,
        noOfRacks: bindNoOfRacks.value,
        binHeight: binHeights[bindVolume.value],
        emptySpace: emptySpaces[bindVolume.value],
        organization: selectedOrganization,
        bin1: "0",
        bin2: "0",
        bin3: "0",
        var1: "Food waste",
        var2: "Cans and plastic",
        var3: "Non-Recyclable waste",
        binname: bindBinName.value,
        batterylevel: "",
        location: "",
        model: "3X25",
      };
      console.log(data);
      const response = await createBin(data);
      if (!response) {
        alert("Data not saved");
      } else {
        alert("data saved successfully");
      }
    } else {
      setIsSubmitDisabled(true);
    }
  };
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      console.log("loading");
    } else {
      if (user) {
        const fetch = async () => {
          const response = await fetchOrganizations();
          if (!response) {
            setOrganizations([]);
          } else {
            const organizations: any = Object.values(response.organizations);
            setOrganizations(organizations);
          }
        };
      } else {
        navigate("/login", { replace: true });
      }
    }
    return () => {};
  }, [user, loading]);
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>MAC ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter MAC ID"
                {...bindMacId}
              />
              {macIdError ? (
                <Form.Text className="text-muted">
                  MAC ID cannot be less than 10 characters
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bin Volume</Form.Label>
              <Form.Select name="volume" {...bindVolume}>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bin Height</Form.Label>
              <Form.Control
                type="text"
                name="binHeight"
                value={binHeights[bindVolume.value]}
                disabled={true}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Empty Space</Form.Label>
              <Form.Control
                type="text"
                name="emptySpace"
                value={emptySpaces[bindVolume.value]}
                disabled={true}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>No of Racks</Form.Label>
              <Form.Select {...bindNoOfRacks}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bin Name</Form.Label>
              <Form.Control
                type="text"
                name="binName"
                {...bindBinName}
              ></Form.Control>
              {binNameError ? (
                <Form.Text className="text-muted text-danger">
                  Bin name cannot be empty
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Organization</Form.Label>
              <Form.Select
                ref={selectOrganizationRef}
                name="organization"
                placeholder="Enter Organization"
                {...bindOrganization}
              >
                {organizations.map((organization: any) => {
                  console.log(organization.organizationId);
                  return (
                    <option
                      selected
                      value={organization.email}
                      key={organization.organizationId}
                    >
                      {organization.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit" disabled={isSubmitDisabled}>
              Create Bin
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBinPage;
