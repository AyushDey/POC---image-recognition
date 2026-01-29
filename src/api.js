export async function sendImageToApi({ image, title }) {
  const formData = new FormData();

  formData.append("image", image);     // file
  if (title) {
    formData.append("title", title);   // optional text
  }

  const response = await fetch("https://www.imagereview.com/abc", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json(); // backend response
}
