
function getAverageWeight(weight) {
  if (typeof weight === "object" && weight.metric) {
    if (weight.metric === "NaN") {
      return 25;
    } else if (weight.metric === "NaN - 8") {
      return 8;
    } else {
      const weightArray = weight.metric.split(" - ") || weight.metric.split(" – ");
      if (weightArray.length > 1) { 
        const averageWeightInKg = (parseFloat(weightArray[0]) + parseFloat(weightArray[1])) / 2;
        return Math.round(averageWeightInKg * 10) / 10;
      } else {
        const weightInKg = parseFloat(weight.metric);
        return Math.round(weightInKg * 10) / 10;
      }
    }
  } else {
    return weight;
  }
}

function getAverageLifeSpan(lifespan) {
    if (!lifespan) {
      return 0;
    }
    const lifespanArray = lifespan.split(" - ");
    if (lifespanArray.length > 1) {
      const lifespanInYearsArray = lifespanArray.map((l) => parseInt(l));
      const averageLifespanInYears = (lifespanInYearsArray[0] + lifespanInYearsArray[1]) / 2;
      return Math.round(averageLifespanInYears * 10) / 10;
    } else {
      return parseInt(lifespan);
    }
  }

  module.exports = {getAverageLifeSpan, getAverageWeight}