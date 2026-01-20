// J-TASK

// Shunday function yozing, u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin.
// MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan".

function findLongestWord(str: string): string {
  const words: string[] = str.split(" ");
  let longest: string = "";

  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }

  return longest;
}

console.log(findLongestWord("I come from Bukhara"));

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
