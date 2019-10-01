const path = require("path");
const db = require("../config/conn");
const public_dir = path.join(__dirname, "..", "views");

exports.index = (req, res) => {
  return res.sendSuccess(null, { access: 0 });
};

exports.addquestion = (req, res) => {
  return res.sendFile(path.join(public_dir, "addquestion.html"));
};

exports.addhint = (req, res) => {
  return res.sendFile(path.join(public_dir, "addhint.html"));
};
