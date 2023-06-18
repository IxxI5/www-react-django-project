import { Card, Table } from "react-bootstrap";

/**
 * @param {*} articles: data object
 * @param {*} k: publication date
 * @returns a single Article Component (single date) that consists of a list of article sources
 */
function Article({ articles, k }) {
  return (
    <Card.Body style={{ fontSize: "0.8" + "em" }}>
      <Table striped bordered hover variant="primary" size="sm">
        <thead>
          <tr>
            <th>Source - Title</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(articles[k]).map((article, i) => (
            <tr key={i}>
              <td style={{ textAlign: "left" }}>
                <a
                  href={article.url}
                  target="_blank"
                  style={{ color: "black" }}
                >
                  <b>{article.sourceName}</b> - {article.title}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  );
}

export default Article;
