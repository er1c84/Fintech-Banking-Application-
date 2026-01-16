//trim data
export const trimData = (obj) => {
  const newObj = {};
  for (let key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      newObj[key] = typeof obj[key] === "string" ? obj[key].trim() : obj[key];
    }
  }
  return newObj;
};