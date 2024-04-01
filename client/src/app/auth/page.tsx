"use client";

import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const reponse = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(reponse.data);
    } catch (error) {
      setErrors(error.reponse.data);
      Window.prototype.alert(error.reponse.data);
    }
  };

  return (
    <form
      action=""
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-8 items-center justify-center pt-10"
    >
      <h1>Sign Up</h1>
      <div className="flex flex-col  gap-2 items-center justify-center">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          className="border-gray-500 rounded-xl bg-blue-300 p-3 w-80"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          className="border-gray-500 rounded-xl bg-blue-300 p-3 w-80"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="border-gray-500 rounded-xl bg-blue-500 p-3"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
