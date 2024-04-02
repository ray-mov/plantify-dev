"use client";

import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
  });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
    Router.push("/");
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
        {errors && (
          <div>
            {errors.map((error, index) => (
              <ul key={index}>
                <li>{error.message}</li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
