import { useState } from "react";
import { Link } from "react-router-dom";
import { signupInput } from "tanishqkumar-medium-common";
import { LabelledInput } from "./LabelledInput";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
        <div className="px-10">
          <div className="font-extrabold text-3xl">Create an account</div>
          <div className="text-slate-400">
            {type==="signup"? "Don't have an account" : "Already have an account?" }
            <Link className="pl-2" to={type === "signin" ? "/signup" : "/signin"}>
              {type === "signin" ? "Signup" : "Signin"}
            </Link>
          </div>
        </div>
        <div className="mt-4">
        <LabelledInput
          label="name"
          placeholder="John Doe"
          onChange={(e) => {
            setPostInput({
              ...postInput,
              name: e.target.value,
            });
          }}
        />

        <LabelledInput
          label="Username"
          placeholder="johndoe@abc.com"
          onChange={(e) => {
            setPostInput({
              ...postInput,
              username: e.target.value,
            });
          }}
        />

        <LabelledInput
          label="password"
          type={"password"}
          placeholder="min 6 character"
          onChange={(e) => {
            setPostInput({
              ...postInput,
              password: e.target.value,
            });
          }}
        />
        <button>{type === "signup" ? "Signin" : "Signup"}</button>
        </div>
        </div>
      </div>
    </div>
  );
};
