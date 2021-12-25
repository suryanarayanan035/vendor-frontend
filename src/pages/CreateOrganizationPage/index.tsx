import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

import { createOrganization } from "../../api/CreateOrganizationPage";
import { useInput } from "../../hooks/useInput";
import { IOrganization } from "../../interfaces/Organizations";
import { FormLoadSpinner } from "../../components/FormLoadSpinner";
import "./createorganizationpage.css";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { getUUID } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const validateOrganization = (event: any) => {
  const { value } = event.target;
  if (value.length < 3) {
    return true;
  }
  return false;
};

const validateMobile = (event: any) => {
  const { value } = event.target;
  if (value.length < 10) {
    return true;
  }
  return false;
};

const validateOrganizationMailId = (event: any) => {
  const { value } = event.target;
  if (value.length < 8) {
    return true;
  }
  return false;
};

const validateOrganizationPassword = (event: any) => {
  const { value } = event.target;
  if (value.length < 8) {
    return true;
  }
  return false;
};

const validateAdmin = (event: any) => {
  const { value } = event.target;
  if (value.length < 3) {
    return true;
  }
  return false;
};

export const CreateOrganizationPage = () => {
  const { bind: bindOrganization, error: organizationError } = useInput(
    "",
    validateOrganization
  );
  const { bind: bindPassword, error: passwordError } = useInput(
    "",
    validateOrganizationPassword
  );

  const { bind: bindMailId, error: mailIdError } = useInput(
    "",
    validateOrganizationMailId
  );

  const { bind: bindMobile, error: mobileError } = useInput("", validateMobile);

  const { bind: bindAdmin, error: adminError } = useInput("", validateAdmin);

  const { bind: bindAdminMobile, error: adminMobileError } = useInput(
    "",
    validateMobile
  );
  const { bind: bindAdminMailId, error: adminMailIdError } = useInput(
    "",
    validateOrganizationMailId
  );

  const [vendorLogo, setVendorLogo] = useState<any>();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      console.log("loading");
    } else {
      console.log("loading Completed");
      if (!user) {
        navigate("/login");
      }
    }

    return () => {};
  }, [user]);
  const hanldeFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setVendorLogo(file);
  };
  const handleFormSubmit = async (event: any) => {
    setIsFormSubmitted(true);
    event.preventDefault();
    try {
      if (!organizationError && !passwordError && !mailIdError) {
        const organization: IOrganization = {
          email: bindMailId.value,
          password: bindPassword.value,
          name: bindOrganization.value,
          mobile: bindMobile.value,
          admin: bindAdmin.value,
          adminMobile: bindAdminMobile.value,
          adminEmail: bindAdminMailId.value,
        };
        const storageRef = ref(storage, `vendor_org/${getUUID()}`);
        const uploadTask = await uploadBytesResumable(storageRef, vendorLogo);
        uploadTask.task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            console.log(error);
            setIsFormSubmitted(false);
          },
          async () => {}
        );
        const filePath = await getDownloadURL(storageRef);
        console.log("storagePath", filePath);
        organization["logo"] = filePath;
        const response = await createOrganization(organization);
        console.log(`Response: ${response}`);
        setIsFormSubmitted(false);
        if (!response) {
          alert("Data not saved");
          setIsFormSubmitted(false);
        } else {
          alert("Data saved sucessfully");
          navigate("/list-organizations");
        }
      } else {
        alert("please clear all errors");
        setIsFormSubmitted(false);
      }
    } catch (error) {
      console.error("Error while submitting form", error);
      setIsFormSubmitted(false);
    }
  };
  return (
    <div>
      {isFormSubmitted ? (
        <FormLoadSpinner></FormLoadSpinner>
      ) : (
        <Container className="d-flex align-items-center justify-content-center center-align mb-5 mt-3">
          <Card>
            <h2 className="text-center mt-3 mb-1">Create Organization</h2>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...bindOrganization}
                    name="organization"
                  />
                  {organizationError ? (
                    <Form.Text className="text-danger">
                      Organization name alteast should have 3 characters
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Mail ID</Form.Label>
                  <Form.Control type="email" name="mailId" {...bindMailId} />
                  {mailIdError ? (
                    <Form.Text className="text-danger">
                      Mail Should have atleast 8 characters
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizationMobile"
                    {...bindMobile}
                  />
                  {mobileError ? (
                    <Form.Text className="text-danger">
                      Mobile Cannot be less than 10 characters.
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    {...bindPassword}
                  />
                  {passwordError ? (
                    <Form.Text className="text-danger">
                      Password Should have atleast 8 characters
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Logo</Form.Label>
                  <Form.Control
                    type="file"
                    name="logo"
                    onChange={hanldeFileChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Organization Admin</Form.Label>
                  <Form.Control type="text" name="admin" {...bindAdmin} />
                  {adminError ? (
                    <Form.Text className="text-danger">
                      Admin name cannot be less than 3 characters
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Admin Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="admin"
                    {...bindAdminMailId}
                  />
                  {adminMailIdError ? (
                    <Form.Text className="text-danger">
                      MailCannot be less than 5 characters
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Admin Mobile</Form.Label>
                  <Form.Control
                    type="input"
                    name="adminMobile"
                    {...bindAdminMobile}
                  />
                  {adminMobileError ? (
                    <Form.Text className="text-danger">
                      Mobile Cannot be less than 10 characters.
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100"
                  disabled={organizationError || mailIdError || passwordError}
                >
                  Create Organization
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
};
