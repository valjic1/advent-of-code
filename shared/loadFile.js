var fs = require("fs");

const readFileSync = ({ path, encoding = "utf-8" }) => {
  try {
    const file = fs.readFileSync(path, { encoding });
    return file;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

module.exports = {
  readFileSync,
};
