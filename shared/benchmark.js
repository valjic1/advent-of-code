const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6;

const benchmark = (method) => {
  const time = process.hrtime();
  console.log("method result:", method());
  const diff = process.hrtime(time);
  console.log(
    `Benchmark took ${
      (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS
    } milliseconds`
  );
};

module.exports = {
  benchmark,
};
