import Modal from "react-bootstrap/Modal";

/**
 *
 * @param {*} message: the modal message
 * @param {*} type: text-success (green color text) or text-danger (red color text)
 * @returns the AlertMessage Modal Window Component (success or error)
 */
function AlertMessage({ message, type }) {
  const modalColor = `App bg-${type}`;
  return (
    <Modal show="true">
      <Modal.Body className={modalColor}>
        <strong className="text-light">{message}!</strong>
      </Modal.Body>
    </Modal>
  );
}

export default AlertMessage;
