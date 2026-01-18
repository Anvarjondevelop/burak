//TASK I
// Shunday function yozing, u parametridagi array ichida eng kop
// takrorlangan raqamni topib qaytarsin.
// MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4.

function majorityElement(arr) {
  const count = {};

  for (let num of arr) {
    count[num] = (count[num] || 0) + 1;
  }

  let maxCount = 0;
  let result = null;

  for (let num in count) {
    if (count[num] > maxCount) {
      maxCount = count[num];
      result = Number(num);
    }
  }

  return result;
}

// Test
majorityElement([1, 2, 3, 4, 5, 4, 3, 4]); // 4

//TASK H

// Shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib,
// faqat positive qiymatlarni olib string holatda return qilsin.
//  MASALAN: getPositive([1, -4, 2]) return qiladi "12".

function getIntData(a: number[]): string {
  const filtered = a.filter((n) => n > 0);
  return filtered.join(" ");
}
const data = getIntData([1, 4, 3, 4, 5, -1, -3, 1]);
console.log(data);

//------------------------------------------------------------------------
