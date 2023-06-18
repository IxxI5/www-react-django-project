import { Form } from "react-bootstrap";

/**
 *
 * @param {*} params
 * @returns the Calendar Component
 */
function Calendar({ label, name, value, min, max, onChange }) {
  return (
    <div>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="date"
        name={name}
        onChange={onChange}
        min={min}
        max={max}
        value={value}
        size="lg"
      />
    </div>
  );
}

export default Calendar;
