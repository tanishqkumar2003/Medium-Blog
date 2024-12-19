import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "tanishqkumar-medium-common";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const [emailExistError, setEmailExistError] = useState<boolean>(false);

  const [postInput, setPostInput] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    let response ;
    try {
        response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput)
        // console.log(response);
        const jwt = response.data.token;
        const username = JSON.parse(response.config.data).username;
        const id = response.data.payload.id;
        const name = response.data.user.name;
        // console.log(response.data.user.name);
        
        localStorage.setItem('username', username)
        localStorage.setItem('token', jwt);
        localStorage.setItem('id',id)
        localStorage.setItem("name", name);
       
        navigate("/blogs")
        
    } catch (e) {
      if (response?.data.error) {
         setEmailExistError(true);
      } 
      if(!response?.data){
        setError(true);
        // console.log(error);    
      }
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
        {emailExistError && (
          <div
            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Danger</span>
            <div>
              <span className="font-medium">
                An account is already registered with this email address
              </span>
            </div>
          </div>
        )}

        {error && (
          <div
            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Danger</span>
            <div>
              <span className="font-medium">
                Unable to log in. Ensure that these requirements are met:
              </span>
              <ul className="mt-1.5 list-disc list-inside">
                <li>At least 10 characters (and up to 100 characters)</li>
                <li>At least one lowercase character</li>
                <li>
                  Inclusion of at least one special character, e.g., ! @ # ?
                </li>
              </ul>
            </div>
          </div>
        )}

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

        <button
          onClick={sendRequest}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {type === "signup" ? "Signup" : "Signin"}
        </button>
      </div>
    </div>
  );
};
