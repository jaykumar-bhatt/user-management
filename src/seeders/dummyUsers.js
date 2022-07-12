const consola = require("consola");
const connection = require("../config/connection");
const Users = require("../model/user");
connection.connectDb();

const seedUsers = [
  new Users({
    username: "jay",
    name: "Jay",
    email: "jay@gmail.com",
    password: "$2b$10$rgn9HJMWNvED3SoK1M0cSes1DCl01c1RrqhOb6FFNMBdLZYVPdzla", //12345
    age: 22,
  }),
  new Users({
    username: "sanket",
    name: "Sanket",
    email: "sanket@gmail.com",
    password: "$2b$10$rgn9HJMWNvED3SoK1M0cSes1DCl01c1RrqhOb6FFNMBdLZYVPdzla", //12345
    age: 21,
  }),
  new Users({
    username: "bhargav",
    name: "Bhargav",
    email: "Bhargav@gmail.com",
    password: "$2b$10$rgn9HJMWNvED3SoK1M0cSes1DCl01c1RrqhOb6FFNMBdLZYVPdzla", //12345
    age: 21,
  }),
  new Users({
    username: "lav",
    name: "Lav",
    email: "lav@gmail.com",
    password: "$2b$10$rgn9HJMWNvED3SoK1M0cSes1DCl01c1RrqhOb6FFNMBdLZYVPdzla", //12345
    age: 21,
  }),
  new Users({
    username: "dhaval",
    name: "Dhaval",
    email: "dhaval@gmail.com",
    password: "$2b$10$rgn9HJMWNvED3SoK1M0cSes1DCl01c1RrqhOb6FFNMBdLZYVPdzla", //12345
    age: 21,
  }),
];

const craeteData = async () => {
  try {
    await Users.bulkSave(seedUsers);
    consola.success("Seed successfully.");
    connection.disconnectDb();
  } catch (error) {
    consola.error(error);
    connection.disconnectDb();
  }
};

craeteData();
