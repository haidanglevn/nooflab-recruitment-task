import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [businessData, setBusinessData] = useState([]);
  const capitalRegionPostalCode = [
    "02100",
    "00140",
    "00930",
    "00710",
    "01730",
    "00500",
    "01760",
    "01690",
    "00510",
    "00180",
  ];
  const fetchAPIdata = async () => {
    console.log("Fetching API data");

    for (const code of capitalRegionPostalCode) {
      await axios
        .get(
          `http://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=20&resultsFrom=0&streetAddressPostCode=${code}&companyRegistrationFrom=2014-02-28`
        )
        .then((res) => {
          console.log(`Result for postal code: ${code}`);
          console.log(res.data.results);
          console.log("---------------------------------");
        });
    }
    /* capitalRegionPostalCode.map((code) => {
      axios
        .get(
          `http://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=2&resultsFrom=0&streetAddressPostCode=${code}&companyRegistrationFrom=2014-02-28`
        )
        .then((res) => {
          console.log(`Result for postal code: ${code}`);
          console.log(res.data.results);
          console.log("---------------------------------");
        });
    }); */
  };
  useEffect(() => {
    axios.get("http://localhost:4000").then((res) => {
      console.log("backend connected");
    });
  }, []);

  return (
    <div className="App">
      <h1>API Client</h1>
      <p>Press the below button to fetch companies data from the API:</p>

      <button onClick={fetchAPIdata}>Fetch API data</button>
      <div>
        {businessData.map((business) => {
          return <p>{business.name}</p>;
        })}
      </div>
      <p>Output: </p>
{/*       {businessData.map()}
 */}    </div>
  );
}

export default App;
