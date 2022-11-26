var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const Users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("12345", salt),
    isAdmin: true,
  },
  {
    name: "user",
    email: "user@admin.com",
    password: bcrypt.hashSync("12345", salt),
  },
  {
    name: "Rajat",
    email: "rajat@admin.com",
    password: bcrypt.hashSync("12345", salt),
  },
  {
    name: "Kunal",
    email: "kunal@admin.com",
    password: bcrypt.hashSync("12345", salt),
  },
];

module.exports = Users;
