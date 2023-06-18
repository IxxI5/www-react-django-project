import RecordsGraph from "../components/RecordsGraph";
import testData from "../methods/testdata.json";

/**
 * @returns the Home Page
 */
function Home() {
  return <RecordsGraph data={testData} />;
}

export default Home;
