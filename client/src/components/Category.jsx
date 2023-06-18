import { Form, Dropdown, DropdownButton } from "react-bootstrap";

/**
 *
 * @param {*} category: everything, business, entertainement, general, health, science, sports, technology
 * @param {*} onSelect: handler
 * @returns the Category Component
 */
function Category({ category, onSelect }) {
  return (
    <>
      <Form.Label style={{ marginBottom: 0.05 + "em" }}>Category</Form.Label>
      <DropdownButton
        variant="dark"
        title={category.charAt(0).toUpperCase() + category.slice(1)}
        size="lg"
        direction="down-centered"
        onSelect={onSelect}
      >
        <Dropdown.Header size="lg">News</Dropdown.Header>
        <Dropdown.Item eventKey="everything" size="lg">
          Everything
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header size="lg">Headlines</Dropdown.Header>
        <Dropdown.Item eventKey="business" size="lg">
          Business
        </Dropdown.Item>
        <Dropdown.Item eventKey="entertainment">Entertainment</Dropdown.Item>
        <Dropdown.Item eventKey="general">General</Dropdown.Item>
        <Dropdown.Item eventKey="health">Health</Dropdown.Item>
        <Dropdown.Item eventKey="science">Science</Dropdown.Item>
        <Dropdown.Item eventKey="sports">Sports</Dropdown.Item>
        <Dropdown.Item eventKey="technology">Technology</Dropdown.Item>
      </DropdownButton>
    </>
  );
}

export default Category;
