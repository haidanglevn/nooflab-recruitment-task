"use strict";
const express = require("express");
const host = "localhost";
const port = 4000;

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { Sequelize, DataTypes, Model } = require("sequelize");

// Set Up connection to Mysql Database
const sequelize = new Sequelize("companyDB", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});

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

// Post company to db 
const testCompany = {
  businessId: "3353000-8",
  name: "T.Tallberg Oy",
  registrationDate: "2023-03-20",
  companyForm: "OY",
  detailsUri: null,
  addresses: [
    {
      street: "Saukonpaadenranta 20 A 18",
      postCode: "00180",
      city: "HELSINKI",
      registrationDate: "2023-03-20",
      language: "FI",
    },
    {
      street: "Saukonpaadenranta 20 A 18",
      postCode: "00180",
      city: "HELSINKI",
      registrationDate: "2023-03-20",
      language: "FI",
    },
  ],

  businessLines: [
    {
      code: "85510",
      name: "Sports and recreation education",
      registrationDate: "2023-03-20",
      language: "EN",
    },
    {
      code: "85510",
      name: "Urheilu- ja liikuntakoulutus",
      registrationDate: "2023-03-20",
      language: "FI",
    },
    {
      code: "85510",
      name: "Sport- och motionsutbildning",
      registrationDate: "2023-03-20",
      language: "SE",
    },
  ],
  languages: [
    {
      name: "Finnish",
      registrationDate: "2023-03-22",
    },
    {
      name: "Suomi",
      registrationDate: "2023-03-22",
    },
    {
      name: "Finska",
      registrationDate: "2023-03-22",
    },
  ],
};

// Add new company
app.post("/addCompany", (req, res) => {
  console.log(req.body);
  Company.create(testCompany, {
    include: [ Company.Addresses, Company.BusinessLines, Company.Languages],
  })
    .then((res) => {
      console.log("Created successfully a new record: ", testCompany);
    })
    .catch((error) => {
      console.error("Failed to create a new record : ", error);
    });
});

app.listen(port, host, () => console.log(`${host}:${port} is running....`));
