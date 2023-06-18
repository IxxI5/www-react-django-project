import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Username from "../components/Username";
import Email from "../components/Email";
import Password from "../components/Password";
import PasswordConfirmation from "../components/PasswordConfirmation";
import AlertMessage from "../components/AlertMessage";
import api from "../access/api";
import * as formik from "formik";
import * as yup from "yup";

/**
 * @returns the Register Page that consists of a complete Register Form
 */
function Register() {
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * @description: Instantiate the Formik wrapper Component (around the Form) that automatically handles the state and values of the Form
   */
  const { Formik } = formik;

  /**
   * @description: configuration of the Register Form validation through yup
   */
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email is not valid"),
    password: yup.string().required("Password is required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation is required"),
  });

  /**
   *
   * @param {*} values: formik values
   * @description: on Register Button press, call the backend web api to Register the user
   */
  const registerHandler = (values) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      password2: values.password2,
    };

    setIsLoading(true);

    api
      .register(data)
      .then((res) => {
        setStatusCode(res.status);
        setMessage(res.statusText);
      })
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setMessage(error.message);
        setStatusCode(400);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setStatusCode(0);
          setMessage("");
        }, 2000);
      });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        username: "",
        email: "",
        password: "",
        password2: "",
        isValid: false,
      }}
    >
      {({ handleSubmit, handleChange, values, errors, isValid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <div className="App" style={{ marginTop: 3 + "em" }}>
            <h1 className="text-center text-primary font-weight-bold">
              REGISTER
            </h1>
          </div>
          <Username
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Email values={values} errors={errors} handleChange={handleChange} />
          <Password
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <PasswordConfirmation
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Button
            type="submit"
            onClick={() => {
              registerHandler(values);
            }}
            size="lg"
            style={{ marginTop: 2 + "em" }}
            disabled={isLoading || !isValid}
          >
            Register
            {isLoading && <Spinner animation="border" variant="light" />}
          </Button>
          {statusCode >= 200 && statusCode <= 299 && (
            <AlertMessage message={message} type="success" />
          )}
          {message !== "" && (statusCode > 399 || statusCode === 0) && (
            <AlertMessage message={message} type="danger" />
          )}
        </Form>
      )}
    </Formik>
  );
}

export default Register;
