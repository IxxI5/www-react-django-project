import { FaUser } from "react-icons/fa";
import { Form, InputGroup, Row, Container } from "react-bootstrap";

/**
 * @param {*} values: formik values (form input values)
 * @param {*} errors: formik errors (form input errors)
 * @param {*} handleChange: formik handleChange (internal formik handler)
 * @returns the Username Input Component
 */
function UserName({ values, errors, handleChange }) {
  return (
    <Row className="mb-3">
      {/* vary the container width on different screens e.g. sm, xs, md, lg */}
      <Container className="text-center col-sm-6 col-md-4 col-lg-4">
        <Form.Group controlId="validationFormikUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation size="lg">
            <InputGroup.Text id="inputGroupPrepend">
              <FaUser />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              name="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Container>
    </Row>
  );
}

export default UserName;
