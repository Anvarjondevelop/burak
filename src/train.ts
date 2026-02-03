//O-TASK

//Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin. MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45.

function calculateSumOfNumbers(arr) {
  let sum = 0;

  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }

  return sum;
}

calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
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
