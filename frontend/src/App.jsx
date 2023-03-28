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

    await axios.get("http://localhost:4000/fetchCompanies");

    
  };

  /*   const testPostData = () => {
    axios
      .post("http://localhost:4000/addCompany", testData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  const getAll = async () => {
    await axios
      .get("http://localhost:4000/getAll")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const syncDatabase = () => {
    axios
      .get("http://localhost:4000/")
      .then((res) => {
        console.log("Sync data done");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>API Client</h1>
      <div>
        <button onClick={syncDatabase}>Sync Database</button>
      </div>
      <p>Press the below button to fetch companies data from the API:</p>
      <button onClick={fetchAPIdata}>Fetch API data</button>
      <div>
        {businessData.map((business) => {
          return <p>{business.name}</p>;
        })}
      </div>
      {/*     <div>
        <button onClick={testPostData}>Test post data</button>
      </div> */}
      <div>
        <button onClick={getAll}>Get data from Mysql DB</button>
      </div>
      <p>Output: </p>
      {/*       {businessData.map()}
       */}{" "}
    </div>
  );
}

export default App;
