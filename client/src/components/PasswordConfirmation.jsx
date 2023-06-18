import { MdPassword } from "react-icons/md";
import { Form, InputGroup, Row, Container } from "react-bootstrap";

/**
 * @param {*} values: formik values (form input values)
 * @param {*} errors: formik errors (form input errors)
 * @param {*} handleChange: formik handleChange (internal formik handler)
 * @returns the PasswordConfirmation Input Component
 */
function PasswordConfirmation({ values, errors, handleChange }) {
  return (
    <Row className="mb-3">
      {/* vary the container width on different screens e.g. sm, xs, md, lg */}
      <Container className="text-center col-sm-6 col-md-4 col-lg-4">
        <Form.Group controlId="validationFormikPassword2">
          <Form.Label>Password Confirmation</Form.Label>
          <InputGroup hasValidation size="lg">
            <InputGroup.Text id="inputGroupPrepend">
              <MdPassword />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password Confirmation"
              aria-describedby="inputGroupPrepend"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              isInvalid={!!errors.password2}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password2}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Container>
    </Row>
  );
}

export default PasswordConfirmation;
