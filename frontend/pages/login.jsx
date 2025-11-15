import { useState } from "react";
import { post } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await post("/auth/login", { email, password });
    console.log(res);
    localStorage.setItem("token", res.access);
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}