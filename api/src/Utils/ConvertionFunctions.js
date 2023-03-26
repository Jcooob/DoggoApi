    function convertToImperialWeight(metricWeight) {
        if (!metricWeight) {
            return '';
          }

        const [minWeight, maxWeight] = metricWeight.split("-");
        const minPounds = Number(minWeight) * 2.205;
        const maxPounds = Number(maxWeight) * 2.205;
        const minWeightStr = `${minPounds.toFixed(2)}`;
        const maxWeightStr = `${maxPounds.toFixed(2)}`;
        return `${minWeightStr} - ${maxWeightStr}`;
    }

    
    function convertToImperialHeight(metricHeight) {
        if (!metricHeight) {
          return '';
        }
      
        const [minHeight, maxHeight] = metricHeight.split("-");
        const minInches = Number(minHeight) / 2.54;
        const maxInches = Number(maxHeight) / 2.54;
        const minFeet = Math.floor(minInches / 12);
        const maxFeet = Math.floor(maxInches / 12);
        const minRemainderInches = Math.round(minInches % 12);
        const maxRemainderInches = Math.round(maxInches % 12);
        const minHeightStr = `${minFeet}'${minRemainderInches}"`;
        const maxHeightStr = `${maxFeet}'${maxRemainderInches}"`;
        return `${minHeightStr} - ${maxHeightStr}`;
      }

      module.exports = {convertToImperialWeight, convertToImperialHeight}