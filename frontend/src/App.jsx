import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [businessData, setBusinessData] = useState([]);
  const [getPostalCode, setGetPostalCode] = useState();
  const [response, setResponse] = useState();

  // To sync once everytime frontend is loaded
  useEffect(() => {
    axios
      .get("http://localhost:4000/")
      .catch((error) => console.log(error));
  }, []);

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
    await axios.get("http://localhost:4000/fetchCompanies").then((res) => {
      setResponse(
        "Companies data is ready and stored in database! Step 2 is ready. "
      );
    });
  };

  const getAll = async () => {
    await axios
      .get("http://localhost:4000/getAll")
      .then((res) => {
        setBusinessData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getOne = async () => {
    if (getPostalCode !== "") {
      await axios
        .get(`http://localhost:4000/postal_codes/${getPostalCode}/companies`)
        .then((res) => {
          setBusinessData(res.data);
        })
        .catch((err) => console.log(err));
    } 
  };

  return (
    <div className="App">
      <h1>PRH API Client</h1>
      <main>
        <div className="step1">
          <h2>Step 1: Fetch companies data from the PRH API </h2>
          <p>Press the below button to
            fetch data for postal codes: 02100, 00140, 00930, 00710, 01730, 00500,
            01760, 01690, 00510, 00180
          </p>
          <button onClick={fetchAPIdata}>Fetch API data</button>
          <h2>Output: </h2>
          <div className="output">{response ? <p>{response}</p> : ""}</div>
        </div>

        <div className="step2">
          <h2>Step 2: Read data from local MySQL database</h2>
          <p>Get all data from Mysql DB</p>
          <button onClick={getAll}>Get All</button>
          <h2>OR</h2>
          <label htmlFor="postal-code">
            Select a postal code from the list and press get data:
          </label>
          <br />
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
          </select>{" "}
          <br />
          <p></p>
          <button onClick={getOne}>Get data</button>
          <h2>GET request: </h2>
          {getPostalCode === undefined ? (
            <p>GET /postal_codes/[CODE]/companies</p>
          ) : (
            <p>GET {`/postal_codes/${getPostalCode}/companies`}</p>
          )}
          <h2>Output in table: </h2>
          <div>
            <table>
              <thead>
                <tr key={"header"}>
                  <th>Business ID</th>
                  <th>Name</th>
                  <th>Registration Date</th>
                  <th>Company Form</th>
                  <th>Postal Code</th>
                </tr>
              </thead>
              <tbody>
                {businessData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.businessId}</td>
                    <td>{item.name}</td>
                    <td>{item.registrationDate}</td>
                    <td>{item.companyForm}</td>
                    <td>{item.postalCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2>Output in JSON format: </h2>
          <div className="output">
            {businessData.length > 0 ? (
              <div>
                {businessData.map((business) => {
                  return <p>{JSON.stringify(business)}</p>;
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
