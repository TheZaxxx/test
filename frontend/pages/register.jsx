import { useState } from "react";
import { post } from "../utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await post("/auth/register", { email, password });
    console.log(res);
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}