"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import toast from "react-hot-toast";

import { authCredential } from "../Auth/AuthenticateUser";
import ButtonFilled from "../../../common/ButtonFilled";
import LoginSchema from "../schemas/LoginSchrema";
import PasswordInputField from "@/common/PasswordInputField";
import RegisterNav from "../components/RegisterNav";
import TextInputField from "../../../common/TextInputField";

const page = () => {
  const router = useRouter();

  const [userExist, setUserExist] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const authUser = (values) => {
    authCredential.forEach((user) => {
      if (
        user.email.toLocaleLowerCase() === values.email.toLocaleLowerCase() &&
        user.password.toLocaleLowerCase() ===
          values.password.toLocaleLowerCase()
      ) {
        setUserExist(true);
        router.push(`/register/login?email=${values.email}`)
        toast.success("Successfully Logged In");
      } else {
        setUserExist(false);
        toast.error("Please Sign Up First");
      }
    });
  };
  const { values, handleChange, touched, errors, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: async (values, { resetForm }) => {
        authUser(values);
        userExist && router.push("/")
        
        resetForm();
      },
    });
    console.log(userExist);


  return (
    <>
      <div className="relative flex items-center justify-center w-full min-h-screen overflow-y-hidden">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-4 pt-0 pb-6 space-y-4 overflow-hidden bg-gray-100 border border-gray-200 rounded-md animate-moveUp drop-shadow-lg sm:mx-0 md:mx-4 md:my-8"
        >
          <div className="flex items-center justify-center pb-1 text-6xl text-cyan-700"></div>
          <div className="pb-2">
            <h2 className="text-2xl font-bold text-center uppercase text-nutral2">
              Sign in
            </h2>
          </div>

          <TextInputField
            label="Email"
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter your email"
            errors={errors.email}
            touched={touched.email}
            values={values.email}
          />
          <PasswordInputField
            label="Password"
            type="pasword"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter your password"
            errors={errors.password}
            touched={touched.password}
            values={values.password}
          />

          <div className="w-full pt-8 md:pt-10">
            <ButtonFilled
              btnLebel="sign in"
              btnType="submit"
              classNames="w-full cursor-pointer rounded-md bg-primary/90 px-8 py-2 text-base font-semibold capitalize text-natural3 transition-all duration-200 ease-out hover:bg-primary"
            />
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-nutral2 md:text-base">
                Don't have any account?{" "}
              </p>
              <span>
                <RegisterNav registerRoute="/register" registerType="sign up" />
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
