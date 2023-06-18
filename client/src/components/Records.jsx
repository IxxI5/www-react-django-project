import { Dropdown, DropdownButton } from "react-bootstrap";

/**
 * @param {*} records: retrieved by the backend db.sqlite3 database
 * @param {*} onSelect: handler
 * @returns the Records Component
 */
function Records({ record, records, onSelect }) {
  return (
    <>
      <DropdownButton
        variant="dark"
        title={record || "Select Record"}
        size="lg"
        direction="down-centered"
        onSelect={onSelect}
      >
        <Dropdown.Header size="lg">Records</Dropdown.Header>
        {Array.from(records).map((item) => (
          <Dropdown.Item
            key={item.record_id}
            eventKey={`${item.record_id}:${item.title.replaceAll("_", " ")}`}
            size="lg"
          >
            {`${item.record_id
              .toString()
              .padStart(5, "0")}:${item.title.replaceAll("_", " ")}`}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
}

export default Records;
