export const formatPrice = (cents) => {
  const price = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
  return price;
};

export const getUniqueValues = (products, value) => {
  const categories = products.flatMap((product) => product?.[value]);
  const unique = [...new Set(categories)];
  return unique;
};

export const getIds = (products) => {
  return products.map((product) => product.id);
};

export const getOverlapping = (arrays) => {
  const output = [];
  const cntObj = {};
  let array, item, cnt;
  // for each array passed as an argument to the function
  for (let i = 0; i < arrays.length; i++) {
    array = arrays[i];
    // for each element in the array
    for (let j = 0; j < array.length; j++) {
      item = "-" + array[j];
      cnt = cntObj[item] || 0;
      // if cnt is exactly the number of previous arrays,
      // then increment by one so we count only one per array
      if (cnt == i) {
        cntObj[item] = cnt + 1;
      }
    }
  }
  // now collect all results that are in all arrays
  for (item in cntObj) {
    if (cntObj.hasOwnProperty(item) && cntObj[item] === arrays.length) {
      output.push(item.substring(1));
    }
  }
  return output;
};
