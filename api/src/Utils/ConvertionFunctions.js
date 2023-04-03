function convertToImperialWeight(metricWeight) {
  if (!metricWeight) {
    return '';
  }
  const [minWeight, maxWeight] = metricWeight.split("-");
  const minPounds = Math.round(Number(minWeight) * 2.205);
  const maxPounds = Math.round(Number(maxWeight) * 2.205);
  return `${minPounds} - ${maxPounds}`;
}


function convertToImperialHeight(metricHeight) {
  if (!metricHeight) {
    return '';
  }
  const [minHeight, maxHeight] = metricHeight.split("-");
  const minInches = Math.round(Number(minHeight) / 2.54);
  const maxInches = Math.round(Number(maxHeight) / 2.54);
  return `${minInches} - ${maxInches}`;
}

    

      module.exports = {convertToImperialWeight, convertToImperialHeight}