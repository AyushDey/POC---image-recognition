// mockApi.js

const DB = [
  { label: "Bottle", confidence: "92%", price: 40 },
  { label: "Snack", confidence: "85%", price: 25 },
  { label: "Medicine", confidence: "78%", price: 65 },
  { label: "Electronics", confidence: "81%", price: 999 },
];

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
