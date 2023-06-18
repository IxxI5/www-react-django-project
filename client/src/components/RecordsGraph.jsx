import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // required => otherwise throws excp
import Mission from "../components/Mission";
import Articles from "../components/Articles";
import { Accordion } from "react-bootstrap";

Chart.register(...registerables); // required => all the components you're going to use

/**
 * @returns the Records in an Accordion Table like structure plus a Chart
 */
function RecordsGraph({ data, mission = true }) {
  const ks = Object.keys(data.content).filter((item) => {
    return isNaN(Date.parse(item)) === false;
  });

  const urlsCount = ks.map((k, i) => {
    return Array.from(data.content[k]).length;
  });

  const title = data.title.toString().replaceAll("_", " ");

  const textArray = title.split(":");
  const text = textArray[textArray.length - 1];

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (xDatapoint) => {
            return xDatapoint.raw;
          },
          label: (yDatapoint) => {
            return "URLs Count: " + yDatapoint.raw;
          },
        },
      },
    },
  };

  return (
    <div className="App" style={{ marginTop: 3 + "em" }}>
      {mission && <Mission />}
      {title !== "none" && (
        <Accordion>
          <Accordion.Item eventKey="0" className="text-primary">
            <Accordion.Header style={{ fontSize: 0.8 + "em" }}>
              {title}
            </Accordion.Header>
            <Accordion.Body>
              <Articles articles={data.content} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}

      <Line
        datasetIdKey="id"
        data={{
          labels: ks,
          datasets: [
            {
              id: 1,
              label: "Occurence in the News of the Text: " + text,
              data: urlsCount,
            },
          ],
        }}
        options={options}
        style={{ padding: 1 + "rem", width: 50 + "%", margin: 1 + "em" }}
      />
    </div>
  );
}

export default RecordsGraph;
