const getCeilValue = (prefixArray, randomValue) => {
  var ceilValue = -2;
  for (var i = 0; i < prefixArray.length; ) {
    if (randomValue >= prefixArray[i]) {
      i++;
    } else {
      ceilValue = i;
      break;
    }
  }
  if (ceilValue === -2) return prefixArray.length - 1;

  return ceilValue;
};

const frequencyOffset = (frequency, pitchType = null) => {
  switch (pitchType) {
    case "Green":
      {
        frequency[0] += 2;
        frequency[2] += 2;
        frequency[1] += 5;
        frequency[6] -= 1;
        frequency[5] -= 1;
      }
      break;

    case "Hard":
      {
        frequency[0] -= 1;
        frequency[2] += 2;
        frequency[1] -= 4;
        frequency[6] += 3;
        frequency[5] += 2;
      }
      break;

    case "Wet":
      {
        frequency[0] += 1;
        frequency[2] += 6;
        frequency[1] += 4;
        frequency[6] += 3;
        frequency[5] -= 6;
        frequency[4] += 5;
      }
      break;

    default:
      return frequency;
  }
  return frequency;
};

const RandomWithIndex = (batterIndex, pitchType = null) => {
  const cumulativeSum = (
    (sum) => (value) =>
      (sum += value)
  )(0);
  var arr = [-1, 0, 1, 2, 3, 4, 6];
  var freq = [];
  var prefix = [];

  switch (batterIndex) {
    case -1: {
      freq = [3, 80, 50, 10, 1, 15, 5]; // RG Sharma 156 balls  166
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 0: {
      freq = [3, 70, 45, 14, 0, 12, 2]; //143 balls Shikhar 133
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 1: {
      freq = [3, 91, 50, 16, 1, 17, 2]; //Kohli 177 balls 165
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 2: {
      freq = [4, 80, 45, 16, 1, 10, 5]; //Shreyas 157 balls 150
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 3: {
      freq = [5, 91, 45, 7, 1, 18, 6]; //Pant 149 balls 178
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 4: {
      freq = [5, 91, 40, 5, 1, 12, 7]; //KL R 160 balls 181
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 5: {
      freq = [6, 80, 38, 5, 1, 15, 8]; //Pandya 158 balls 181
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 6: {
      freq = [6, 80, 45, 16, 1, 18, 4]; //Jadeja 165 balls 176
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 8: {
      freq = [9, 100, 15, 8, 1, 18, 6]; //Thakur 144 balls 127
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 7: {
      freq = [9, 100, 25, 15, 1, 18, 2]; //Bhuvi 160 balls 142
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    case 9: {
      freq = [9, 100, 25, 5, 1, 18, 2];
      freq =
        pitchType == null || pitchType === "NORMAL"
          ? freq
          : frequencyOffset(freq, pitchType);
      prefix = freq.map(cumulativeSum);
      let random = Math.floor(Math.random() * prefix[prefix.length - 1]);
      let index_rc = getCeilValue(prefix, random);
      return arr[index_rc];
    }
    default: {
      return 1;
    }
  }
};

export default RandomWithIndex;
