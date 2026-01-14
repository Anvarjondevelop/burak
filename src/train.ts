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
