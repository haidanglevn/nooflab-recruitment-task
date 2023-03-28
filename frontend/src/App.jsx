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
          `http://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=1&resultsFrom=0&streetAddressPostCode=${code}&companyRegistrationFrom=2014-02-28`
        )
        .then((res) => {
          console.log(`Result for postal code: ${code}`);
          const results = res.data.results;
          console.log(
            "Sending data to local mysql database: ",
            results
          );
          results.map((company)=> {
            console.log(company)
          })
          console.log("---------------------------------");
        });
    }
  };

  const testPostData = () => {
    const testData = {
      name: "Knowway oy",
      businessId: "3353271-6",
      registrationDate: "2023-03-21",
      companyForm: "OY",
      detailsUri: "http://avoindata.prh.fi/opendata/bis/v1/3353271-6",
    };
    axios
      .post("http://localhost:4000/addCompany", testData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  }

  

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
      <div>
        <button onClick={testPostData}>Test post data</button>
      </div>
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
