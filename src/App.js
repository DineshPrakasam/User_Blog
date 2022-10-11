import logo from "./logo.svg";
import "./App.css";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Api from "./Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";

function App() {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    dob: Yup.string().required("Date Of Birth is required"),
    phoneNumber: Yup.number()
      .typeError("Enter valid number")
      .required("Phone Number is required"),
    assembly: Yup.string().required("Assembly is required"),
  });

  const navigate = useNavigate();

  const createUser = (values, { resetForm }) => {
    console.log("values", values);
    const role = "user";
    Api.post("/api/v1/user/create", {
      name: values.name,
      dob: values.dob,
      role: role,
      phoneNumber: values.phoneNumber,
      assembly: values.assembly,
    }).then((res) => {
      console.log("res");
      const message = res?.data?.message;
      const status = res?.data?.status;
      const role = res?.data?.existUser ? res.data?.existUser[0].role : null;
      status === "Created"
        ? toast.success(
            <p
              style={{
                fontSize: 16,
                fontFamily: "Comfortaa",
                color: "black",
                marginBottom: "0px",
              }}
            >
              {message}
            </p>
          )
        : toast.error(
            <p
              style={{
                fontSize: 16,
                fontFamily: "Comfortaa",
                color: "black",
                marginBottom: "0px",
              }}
            >
              {message}
            </p>
          );
      if (res?.data?.existUser) {
        if (role === "admin") {
          navigate("user/list");
        }
      }
      resetForm({ values: "" });
    });
  };
  return (
    <div className="App">
      <div className="App-header">
        <Container>
          <Row>
            <Col
              lg={5}
              md={6}
              sm={12}
              className=" px-5 py-3 m-auto shadow -sm rounded-lg mb-4 login-box"
            >
              <Formik
                validationSchema={schema}
                initialValues={{
                  name: "",
                  dob: "",
                  phoneNumber: "",
                  assembly: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  createUser(values, { resetForm });
                }}
              >
                {(formik) => {
                  const {
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    errors,
                    touched,
                  } = formik;
                  return (
                    <div>
                      <ToastContainer
                        autoClose={3000}
                        hideProgressBar={true}
                        pauseOnHover={false}
                        toastClassName="toastRequestSuccess"
                        bodyClassName="toastBody"
                        closeButton={false}
                      />
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <h4 className="d-flex justify-content-center mb-2 login-label">
                            Log In
                          </h4>
                          <Col md="12">
                            <Form.Group
                              className="form-input"
                              style={{ marginRight: 20, width: "100%" }}
                            >
                              <Form.Label className="form-label">
                                Name{" "}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Name"
                              />
                            </Form.Group>
                          </Col>
                          <p className="error">
                            {errors.name && touched.name && errors.name}
                          </p>
                          <Col md="12">
                            <Form.Group
                              className="form-input"
                              style={{ marginRight: 20, width: "100%" }}
                            >
                              <Form.Label className="form-label">
                                Date Of Birth{" "}
                              </Form.Label>
                              <Form.Control
                                type="date"
                                name="dob"
                                id="dob"
                                value={values.dob}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Date Of Birth"
                              />
                            </Form.Group>
                          </Col>
                          <p className="error">
                            {errors.dob && touched.dob && errors.dob}
                          </p>

                          <Col md="12">
                            <Form.Group
                              className="form-input"
                              style={{ marginRight: 20, width: "100%" }}
                            >
                              <Form.Label className="form-label">
                                Phone Number{" "}
                              </Form.Label>
                              <Form.Control
                                type="phoneNumber"
                                name="phoneNumber"
                                id="phoneNumber"
                                maxLength={10}
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Phone Number"
                              />
                            </Form.Group>
                          </Col>
                          <p className="error">
                            {errors.phoneNumber &&
                              touched.phoneNumber &&
                              errors.phoneNumber}
                          </p>
                          <Col md="12">
                            <Form.Group
                              className="form-input"
                              style={{ marginRight: 20, width: "100%" }}
                            >
                              <Form.Label className="form-label">
                                Assembly
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="assembly"
                                id="assembly"
                                value={values.assembly}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Assembly"
                              />
                            </Form.Group>
                          </Col>
                          <p className="error">
                            {errors.assembly &&
                              touched.assembly &&
                              errors.assembly}
                          </p>
                          <Col md="12" className="text-align-center my-3">
                            <button className="login-button" type="submit">
                              submit
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
