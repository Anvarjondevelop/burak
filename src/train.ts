// ZD-TASK

// Shunday function yozing, uni number, array va number parametrlari bolsin va berilgan 1-parametr numberga teng indexni array ichidan topib 3-parametrdagi raqam bilan almashtirib yangilangan arrayni qaytarsin.
// MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2].
// function changeNumberInArray(
//   index: number,
//   arr: number[],
//   newValue: number
// ): number[] {
//   arr[index] = newValue;
//   return arr;
// }
// console.log(changeNumberInArray(1, [1, 3, 7, 2], 2));
// ZC-TASK

// Shunday function yozing, uni number parametri bolsin va function qabul parametrni selsiy miqdori sifatida qabul qilib uni farenhitga ozgartirib bersin.
// MASALAN: celsiusToFahrenheit(0) return 32.

// function celsiusToFahrenheit(celsius: number): number {
//   return (celsius * 9) / 5 + 32;
// }
// console.log(celsiusToFahrenheit(0));
// console.log(celsiusToFahrenheit(25));

// ZB-TASK

// Shunday function yozing, uni 2 ta number parametri bolsin va berilgan sonlar arasidan random raqam return qilsin.
// MASALAN: randomBetween(30, 50) return 45.

// function randomBetween(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // misol
// console.log(randomBetween(30, 50));

// Y-TASK

// Shunday function yozing, uni 2 ta array parapetri bolsin. Function ikkala arrayda ham ishtirok etgan qiymatlarni bir arrayda qaytarsin.
// MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3].
// function findIntersection(arr1: number[], arr2: number[]): number[] {
//   const set2 = new Set(arr2);
//   const result: number[] = [];

//   for (const item of arr1) {
//     if (set2.has(item) && !result.includes(item)) {
//       result.push(item);
//     }
//   }

//   return result;
// }

// console.log(findIntersection([1, 2, 3], [3, 2, 0]));
// X-TASK

// Shunday function yozing, uni object va string parapetrlari bolsin.
// Function string parametri object ichida necha marotaba takrorlanganligini qaytarsin (nested object bolsa ham sanasin).
//  MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2.

// function countOccurrences(obj: any, key: string): number {
//   let count = 0;

//   for (const k in obj) {
//     if (k === key) {
//       count++;
//     }

//     if (typeof obj[k] === "object" && obj[k] !== null) {
//       count += countOccurrences(obj[k], key);
//     }
//   }

//   return count;
// }

// const data = {
//   model: "Bugatti",
//   steer: {
//     model: "HANKOOK",
//     size: 30,
//   },
// };

// console.log(countOccurrences(data, "model"));

// W-TASK
//Shunday function yozing, uni array va number parametrlari bolsin.
// Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin.
// MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]].

// function chunkArray(arr: number[], size: number): number[][] {
//   const result: number[][] = [];

//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }

//   return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

// V-TASK

// Shunday function yozing, uni string parametri bolsin va stringdagi harf va
// u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin.
// MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}.

// function countChars(str: string): Record<string, number> {
//   const result: Record<string, number> = {};

//   for (const char of str) {
//     if (result[char]) {
//       result[char]++;
//     } else {
//       result[char] = 1;
//     }
//   }

//   return result;
// }

// console.log(countChars("Anvarjon"));

// U-TASK

// Shunday function yozing, uni number parametri bolsin va 0 dan
// berilgan parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini
//  return qilsin. MASALAN: sumOdds(9) return 4; sumOdds(11) return 5.

// function sumOdds(n: number): number {
//   return Math.floor(n / 2);
// }

// console.log(sumOdds(9));
// console.log(sumOdds(11));

// T-TASK

// Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin va ikkala arraydagi
// sonlarni tartiblab bir arrayda qaytarsin.
// MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]) return [0,3,4,4,6,30,31].

// function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
//   return [...arr1, ...arr2].sort((a, b) => a - b);
// }

// const result1 = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
// console.log(result1);

// const result2 = mergeSortedArrays([1, 2, 5], [0, 3, 7]);
// console.log(result2);

// const result3 = mergeSortedArrays([], [2, 4, 6]);
// console.log(result3);

// const result4 = mergeSortedArrays([1, 2, 3], []);
// console.log(result4);

// S-TASK

// Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin
// va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin.
// MASALAN: missingNumber([3, 0, 1]) return 2.

// function missingNumber(nums: number[]): number {
//   const n: number = nums.length;

//   const expectedSum: number = (n * (n + 1)) / 2;
//   const actualSum: number = nums.reduce(
//     (sum: number, num: number) => sum + num,
//     0
//   );

//   return expectedSum - actualSum;
// }

// console.log(missingNumber([3, 0, 1]));
// R-TASK

// Shunday function yozing, u string parametrga ega bolsin.
// String "1+2" holatda pass qilinganda string ichidagi sonlar yigindisini
// number holatda qaytarsin.
//  MASALAN: calculate("1+3") return 4.

// function calculate(expression: string): number {
//   const parts = expression.split("+");
//   const a = Number(parts[0]);
//   const b = Number(parts[1]);

//   return a + b;
// }

// calculate("1+2");

// Q-TASK

// Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object,
// ikkinchisi string. Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin. MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true;
// hasProperty({name: "BMW", model: "M3"}, "year") return false.
// function hasProperty(obj: Record<string, unknown>, key: string): boolean {
//   return typeof obj[key] !== "undefined";
// }
// const hasProperty1 = hasProperty({ name: "BMW", model: "M3" }, "model");
// console.log(hasProperty1);
// const hasProperty2 = hasProperty({ name: "BMW", model: "M3" }, "year");
// console.log(hasProperty2);

// P-TASK

// Shunday function yozing, u object qabul qilsin va arrayni object
// arrayga otkazib arrayni qaytarsin.
//  MASALAN: objectToArray({a: 10, b: 20}) return [["a", 10], ["b", 20]].

// function objectToArray<T extends Record<string, any>>(
//   obj: T
// ): [keyof T, T[keyof T]][] {
//   return Object.entries(obj) as [keyof T, T[keyof T]][];
// }

// const result = objectToArray({ a: 10, b: 20 });

// console.log(result);

//O-TASK

//Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin. MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45.

// function calculateSumOfNumbers(arr) {
//   let sum = 0;

//   for (const item of arr) {
//     if (typeof item === "number") {
//       sum += item;
//     }
//   }

//   return sum;
// }

// calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
// natija: 45

// N-TASK

// Shunday function yozing, u string qabul qilsin va string palindrom yani
// togri oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini
// aniqlab boolean qiymat qaytarsin.
// MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.

// function palindromCheck(str: string): boolean {
//   const reversed = str.split("").reverse().join("");
//   return str === reversed;
// }

// console.log(palindromCheck("Bob"));
// console.log(palindromCheck("Adam"));

// M-TASK

// Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin
// va array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni
// kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
// MASALAN:
// getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].

// function getSquareNumbers(arr: number[]): { number: number; square: number }[] {
//   return arr.map((num) => ({
//     number: num,
//     square: num * num,
//   }));
// }

// const result1 = getSquareNumbers([1, 2, 3]);
// console.log(result1);

// L-TASK

// Shunday function yozing, u string qabul qilsin v
// a string ichidagi hamma sozlarni chappasiga yozib
// va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
// MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc".

// function reverseSentence(str: string): string {
//   return str
//     .split(" ")
//     .map((word: string) => word.split("").reverse().join(""))
//     .join(" ");
// }

// reverseSentence("I like developing");

// K-TASK

// Shunday function yozing, u string qabul qilsin va string ichidagi
//  unli harflar sonini qaytarsin. MASALAN: countVowels("string") return 1.

// function UnliHarflar(a: string): number {
//   let count = 0;
//   const unli = "aeiou";

//   for (let i of a.toLowerCase()) {
//     if (unli.includes(i)) {
//       count++;
//     }
//   }

//   return count;
// }
// const result = UnliHarflar("Assalomu alaykum");
// console.log(result);

// J-TASK

// Shunday function yozing, u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin.
// MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan".

// function findLongestWord(str: string): string {
//   const words: string[] = str.split(" ");
//   let longest: string = "";

//   for (const word of words) {
//     if (word.length > longest.length) {
//       longest = word;
//     }
//   }

//   return longest;
// }

// console.log(findLongestWord("I come from Bukhara"));

/*Project Standards:
- Logging standards
- Naming standards:
  function, method,variable =>  camelCase    = goHome
  class => Pascal                            = MemberServices
  folder,file => kebab-kebab                      = kebab-kebab
  css class name => snake_snake

-Error handling:

 */
/**API REQUESTS:
 * TYPE >
 * Eng ko'p ishlatilanadigan API :
 *
 * Traditional API
 * REST API
 * GrapgQL API
 *
 * METHOD > GET | POST
 *
 * STRUCTURE > header | body
 */

/* Validation:
 Fronted validation
 Backend validation
 Database validation
 */

//TASK I
// Shunday function yozing, u parametridagi array ichida eng kop
// takrorlangan raqamni topib qaytarsin.
// MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4.

// function majorityElement(arr: number[]): number | null {
//   const count: Record<number, number> = {};

//   for (const num of arr) {
//     count[num] = (count[num] || 0) + 1;
//   }

//   let maxCount: number = 0;
//   let result: number | null = null;

//   for (const num in count) {
//     if (count[num] > maxCount) {
//       maxCount = count[num];
//       result = Number(num);
//     }
//   }

//   return result;
// }

// // Test
// const result = majorityElement([1, 2, 3, 4, 5, 4, 3, 5]);
// console.log(result);

//TASK H

// Shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib,
// faqat positive qiymatlarni olib string holatda return qilsin.
//  MASALAN: getPositive([1, -4, 2]) return qiladi "1,2".

// function getIntData(a: number[]): string {
//   const filtered = a.filter((n) => n >= 0);
//   return filtered.join(" ");
// }
// const data = getIntData([1, 4, 3, 4, 5, -1, -3, 1]);
// console.log(data);

//------------------------------------------------------------------------
