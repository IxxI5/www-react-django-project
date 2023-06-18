import { GrMail } from "react-icons/gr";
import { Form, InputGroup, Row, Container } from "react-bootstrap";

/**
 * @param {*} values: formik values (form input values)
 * @param {*} errors: formik errors (form input errors)
 * @param {*} handleChange: formik handleChange (internal formik handler)
 * @returns the Email Input Component
 */
function Email({ values, errors, handleChange }) {
  return (
    <Row className="mb-3">
      {/* vary the container width on different screens e.g. sm, xs, md, lg */}
      <Container className="text-center col-sm-6 col-md-4 col-lg-4">
        <Form.Group controlId="validationFormikEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation size="lg">
            <InputGroup.Text id="inputGroupPrepend">
              <GrMail />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Container>
    </Row>
  );
}

export default Email;
