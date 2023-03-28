"use strict";
const express = require("express");
const host = "localhost";
const axios = require('axios')
const port = 4000;
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { Sequelize, DataTypes, Model } = require("sequelize");

// Set Up connection to Mysql Database
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// Define the model of table
class Company extends Model {}
Company.init(
  {
    businessId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyForm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detailsUri: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "company",
  }
);

class Address extends Model {}
Address.init(
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "address",
  }
);

class BusinessLine extends Model {}
BusinessLine.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "businessLine",
  }
);

class Language extends Model {}
Language.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    registrationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "language",
  }
);

// Associations
Company.Addresses = Company.hasMany(Address);
Address.Company = Address.belongsTo(Company, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Company.BusinessLines = Company.hasMany(BusinessLine);
BusinessLine.Company = BusinessLine.belongsTo(Company, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Company.Languages = Company.hasMany(Language);
Language.Company = Language.belongsTo(Company, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Get
app.get("/", (req, res) => {
  sequelize
    .sync()
    .then(() => {
      console.log("Sync table successfully!");
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
});

app.get("/getAll", async (req, res) => {
  try {
    // query Sequelize for data
    const companies = await Company.findAll();
    // send data to frontend
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(companies));
  } catch (err) {
    console.error("Error querying MySQL:", err);
    res.status(500).send("Error retrieving data from database");
  }
});

app.get("/postal_codes/:code/companies", async(req,res)=> {
  console.log(req.params.code);
  const result = await Company.findAll({
    where: {
      postalCode: req.params.code
    }
  })
  res.send(result)
});

app.get("/fetchCompanies", async (req, res) => {
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

  for (const code of capitalRegionPostalCode) {
    const companyData = await axios
      .get(
        `http://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=20&resultsFrom=0&streetAddressPostCode=${code}&companyRegistrationFrom=2014-02-28`
      )
      .then((res) => {
        console.log(`Result for postal code: ${code}`);
        const results = res.data.results;
        console.log("---------------------------------");
        return results;
      })
    await addCompanies(companyData, code)
  }
  res.end();
});

// function to add companies
const addCompanies = async (companies, code) => {
  console.log("Companies :", companies)
  const companiesWithPostalCode = companies.map((company)=> {
    return {...company, postalCode : code}
  })
  await Company.bulkCreate(companiesWithPostalCode, {
    include: [Company.Addresses, Company.BusinessLines, Company.Languages],
  })
    .then((res) => {
      console.log("Created successfully a new record: ", companies);
    })
    .catch((error) => {
      console.error("Failed to create a new record : ", error);
    });
};

app.listen(port, host, () => console.log(`${host}:${port} is running....`));
