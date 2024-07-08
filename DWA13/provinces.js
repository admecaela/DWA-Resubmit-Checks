import { names, provinces} from "./data";

console.log("Provinces script loaded");

// 1. Use forEach to console log each name to the console:
names.forEach((name) => {
  console.log(name);
});

// 2. Use forEach to console log each name with a matching province:
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// 3. Use map to turn each province name to all uppercase and log the new array to the console:
const provincesUpperCase = provinces.map((province) => province.toUpperCase());
console.log(provincesUpperCase);

// 4. Create a new array with map that has the amount of characters in each name:
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// 5. Use sort to sort all provinces alphabetically:
const sortedProvinces = provinces.slice().sort();
console.log(sortedProvinces);

// 6. Use filter to remove all provinces that have the word "Cape" in them and return the amount of provinces left:
const filteredProvinces = provinces.filter((province) => !province.includes("Cape"));
console.log(filteredProvinces.length);

// 7. Create a boolean array by using map and some to determine whether a name contains an "S" character:
const containsS = names.map((name) => name.includes("S"));
console.log(containsS);

// 8. Use reduce to turn the above into an object that indicates the province of an individual:
const nameToProvince = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});
console.log(nameToProvince);