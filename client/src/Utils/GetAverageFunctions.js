

function getAverageWeightInMetric(weight) {
    if (typeof weight === "object" && weight.metric) {
      const weightArray = weight.metric.split(" - ");
      if (weightArray.length > 1) {
        const weightInKgArray = weightArray.map((w) => parseFloat(w) * 0.453592);
        const averageWeightInKg = (weightInKgArray[0] + weightInKgArray[1]) / 2;
        return Math.round(averageWeightInKg * 10) / 10;
      } else {
        const weightInKg = parseFloat(weight.metric) * 0.453592;
        return Math.round(weightInKg * 10) / 10;
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

  module.exports = {getAverageLifeSpan, getAverageWeightInMetric}