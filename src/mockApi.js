// mockApi.js

const DB_2 = [
  { label: "Bottle", confidence: "92%", price: 40 },
  { label: "Snack", confidence: "85%", price: 25 },
  { label: "Medicine", confidence: "78%", price: 65 },
  { label: "Electronics", confidence: "81%", price: 999 },
];

const DB = {
  class: "Tuile_a_Douille",
  confidence: 0.7698,
  matches: [
    {
      class: "Tuile_Chatiere",
      score: 0.764
    },
    {
      class: "MBC20",
      score: 0.6919
    },
    {
      class: "PL5H20",
      score: 0.6553
    },
    {
      class: "BC20",
      score: 0.6549
    },
    {
      class: "BC10",
      score: 0.6467
    }
  ]
}

export function processImage({ image, title }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = DB[Math.floor(Math.random() * DB.length)];

      resolve({
        success: true,
        input: { title: title || null },
        result: random,
        message: "Image processed successfully",
      });
    }, 1500);
  });
}
