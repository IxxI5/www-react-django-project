import { Button, useAccordionButton } from "react-bootstrap";

/**
 *
 * @param {*} children
 * @param {*} eventKey
 * @returns the CustomToggle Accordion React Component
 */
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <Button type="button" variant="link" size="lg" onClick={decoratedOnClick}>
      <span style={{ fontSize: "1.2" + "em" }}>{children}</span>
    </Button>
  );
}

export default CustomToggle;
