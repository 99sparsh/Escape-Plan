const path = require("path");
const db = require("../config/conn");
const public_dir = path.join(__dirname, "..", "views");

exports.index = (req, res) => {
  return res.sendSuccess(null, { access: 0 });
};
