import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [businessData, setBusinessData] = useState([]);
  const [getPostalCode, setGetPostalCode] = useState();

  console.log("Looking for postal code...", getPostalCode);

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
    axios
      .get("http://localhost:4000/")
      .then((res) => {
        console.log("Sync data done");
      })
      .catch((error) => console.log(error));
    console.log("Fetching API data");

    await axios.get("http://localhost:4000/fetchCompanies");
  };

  const getAll = async () => {
    await axios
      .get("http://localhost:4000/getAll")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getOne = async () => {
    if (getPostalCode !== "") {
      await axios
        .get(`http://localhost:4000/postal_codes/${getPostalCode}/companies`)
        .then((res) => {
          setBusinessData(res.data)
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Choose a postal code')
    }
  };

  return (
    <div className="App">
      <h1>API Client</h1>
      <p>Press the below button to fetch companies data from the API:</p>
      <button onClick={fetchAPIdata}>Fetch API data</button>
     
      <div>
        <p>Get all data from Mysql DB</p>
        <button onClick={getAll}>Get All</button>
        <h2>OR</h2>
        <label htmlFor="postal-code">
          Select a postal code from the list and press get data:
        </label>
        <select
          name="postal-code"
          onChange={(e) => setGetPostalCode(e.target.value)}
        >
          <option value="" defaultChecked>
            Choose a postal code
          </option>
          {capitalRegionPostalCode.map((postalCode) => {
            return <option value={postalCode}>{postalCode}</option>;
          })}
        </select>
        <button onClick={getOne}>Get data from Mysql DB</button>
      </div>
      <p>Output: </p>
      <div>
        {businessData.map((business)=> {
          return <p>{business.name}</p> 
        })}
      </div>
    </div>
  );
}

export default App;
