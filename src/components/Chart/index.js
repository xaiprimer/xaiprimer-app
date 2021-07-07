export { default } from './Chart';

d3.csv("./data.csv").then(function(data) {
    console.log(data[0]);
  });