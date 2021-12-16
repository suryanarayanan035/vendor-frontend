import { v4 } from "uuid";
export const objToarray = (dict: any) => {
  let arr = [];
  for (let key in dict) {
    if (dict.hasOwnProperty(key)) {
      arr.push([key, dict[key]]);
    }
  }
  return arr;
};

export const getUUID = () => {
  return v4();
};
