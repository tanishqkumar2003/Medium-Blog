import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "tanishqkumar-medium-common";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
  const [postInput, setPostInput] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput)
        console.log(response);
        const jwt = response.data?.token;
        localStorage.setItem('token', jwt);
        navigate("/blog")
    } catch (e) {
        alert("Error while logging")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">
          {type === "signup" ? "Create an Account" : "Sign In"}
        </h2>
        <p className="text-center text-slate-400 mb-6">
          {type === "signup"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            className="pl-2 text-blue-500 hover:underline dark:text-blue-400"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Signup" : "Signin"}
          </Link>
        </p>

        {type === "signup" ? (
          <LabelledInput
            label="Name"
            placeholder="John Doe"
            onChange={(e) =>
              setPostInput({
                ...postInput,
                name: e.target.value,
              })
            }
          />
        ) : null}

        <LabelledInput
          label="Username"
          placeholder="johndoe@abc.com"
          onChange={(e) =>
            setPostInput({
              ...postInput,
              username: e.target.value,
            })
          }
        />

        <LabelledInput
          label="Password"
          type="password"
          placeholder="min 6 characters"
          onChange={(e) =>
            setPostInput({
              ...postInput,
              password: e.target.value,
            })
          }
        />

        <button onClick={sendRequest} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {type === "signup" ? "Signup" : "Signin"}
        </button>
      </div>
    </div>
  );
};
