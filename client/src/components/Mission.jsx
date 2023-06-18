import { Alert } from "react-bootstrap";

/**
 *
 * @returns the Mission Statement React Component
 */
function Mission() {
  return (
    <Alert variant="primary" style={{ padding: 1 + "rem" }}>
      <Alert.Heading>
        <h1>Mission</h1>
      </Alert.Heading>
      <p style={{ fontSize: 1.5 + "rem" }}>
        The evolution of the World Wide Web enables us to have access to an
        enormous amount of data through our PC, Mobile and Tablet devices. An
        important part of the data traffic has to do with all kind of News and
        Headlines. The idea behind this web application is a search engine that
        allows to explore the occurence of words in the daily News, aiming to
        unearth obvious or even hidden trends behind the actual events.
      </p>
      <hr />
      <p className="mb-0">
        <strong>Words Wide Web</strong>
      </p>
    </Alert>
  );
}

export default Mission;
