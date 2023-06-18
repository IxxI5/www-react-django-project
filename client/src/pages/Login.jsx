import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Button, Form, Nav, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import AlertMessage from "../components/AlertMessage";
import Username from "../components/Username";
import Password from "../components/Password";
import api from "../access/api";
import * as formik from "formik";
import * as yup from "yup";
import useLogin from "../hooks/useLogin";

/**
 * @returns the Login Page that consists of a complete Login Form
 */
function Login() {
  /**
   * Refer to the Formik component in order to extract (access it from outside) the values object
   */
  const ref = useRef(null);

  const { Formik } = formik;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { user, setLogin } = useLogin({
    username: "",
    password: "",
    loggedin: false,
  });

  /**
   * @returns the username and password from Redux store
   */
  const username = useSelector((state) => state.user.values.username);
  const password = useSelector((state) => state.user.values.password);

  // while typing (toggle), update Redux store
  useEffect(() => {
    setLogin(ref.current.values);
  }, [toggle]);

  /**
   * @description: configuration of the Login Form validation through yup
   */
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  /**
   * @param {*} values: formik values
   * @description: on Login Button press, call the backend web api to login the user
   */
  const loginHandler = (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    setIsLoading(true);

    api
      .login(data)
      .then(() => {
        setStatusCode(200);
        setMessage("Success");

        const obj1 = ref.current.values;
        const obj2 = {
          loggedin: true,
        };

        const merge = { ...obj1, ...obj2 };

        setLogin(merge);
      })
      .then(() => {
        setTimeout(() => {
          navigate("/search");
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
      innerRef={ref}
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        username: username,
        password: password,
        loggedin: false,
      }}
    >
      {({ handleSubmit, handleChange, values, errors, isValid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <div className="App" style={{ marginTop: 3 + "em" }}>
            <h1 className="text-center text-primary font-weight-bold">LOGIN</h1>
          </div>
          <Username
            values={values}
            errors={errors}
            handleChange={(e) => {
              handleChange(e);
              setToggle(!toggle);
            }}
          />
          <Password
            values={values}
            errors={errors}
            handleChange={(e) => {
              handleChange(e);
              setToggle(!toggle);
            }}
          />
          <div>
            <LinkContainer
              to="/register"
              style={{ fontSize: "1rem", display: "inline" }}
            >
              <Nav.Link className="text-primary">Not registered yet?</Nav.Link>
            </LinkContainer>
          </div>
          <Button
            type="submit"
            onClick={() => {
              loginHandler(values);
            }}
            size="lg"
            style={{ marginTop: 2 + "em" }}
            disabled={isLoading}
          >
            Login {isLoading && <Spinner animation="border" variant="light" />}
          </Button>

          {statusCode >= 200 && statusCode <= 299 && (
            <AlertMessage message={message} type={"success"} />
          )}
          {message !== "" && (statusCode > 399 || statusCode === 0) && (
            <AlertMessage message={message} type={"danger"} />
          )}
        </Form>
      )}
    </Formik>
  );
}

export default Login;
