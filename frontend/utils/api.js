export const API = "http://localhost:5000/api";

export const post = async (url, body) => {
  const res = await fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
};