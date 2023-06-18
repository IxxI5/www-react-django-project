import { Accordion, Button, Table, useAccordionButton } from "react-bootstrap";
import CustomToggle from "./CustomToggle";
import Article from "./Article";
import Card from "react-bootstrap/Card";

/**
 * @param {*} articles: data object having its content grouped by date
 * @returns a list of Accordion like Articles Component
 */
function Articles({ articles }) {
  if (!articles) return null;

  const ks = Object.keys(articles).filter((item) => {
    return isNaN(Date.parse(item)) === false;
  });

  return (
    // reminder: when using map apply keys.map((k, i) => (..html..)) and not keys.map((k, i) => {..html..}). The later will not render

    <Accordion className="mt-5">
      {ks.map((k, i) => (
        <Card
          style={{
            backgroundColor: "black",
            borderColor: "darkblue",
          }}
          key={i}
        >
          <Card.Header>
            <CustomToggle eventKey={i}>{k}</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={i}>
            <Article articles={articles} k={k} />
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}

export default Articles;
