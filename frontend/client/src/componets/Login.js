import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css_files/showProduct.css";
import AnimatePage from "../animation/AnimatePage";
import { setActiveState } from "../feautres/userSlice";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const serverRootUrl = "http://localhost:8082";

  // State to handle form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send JSON object to the backend
      const response = await axios.post(serverRootUrl + "/client/auth/sign-in", {
        username,
        password,
      });
  
      // Save sessionId to localStorage
      const { session, user } = response.data.data; // Assuming sessionId is part of the `session` object
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);
      localStorage.setItem("sessionId", session.sessionId); // Save sessionId to localStorage
  
      // Dispatch successful login data
      dispatch(
        setActiveState({
          userName: user.username,
          userEmail: user.email,
        })
      );
  
      // Navigate to the home page
      navigate("/");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };
  

  return (
    <section className="bg-gray-100 bg-gradient-to-br font-['Cairo']">
      <AnimatePage>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-white">
                {t("signIn")}
              </h1>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("username")}
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ologn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-blue-400 to-sky-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                >
                  {t("login")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </AnimatePage>
    </section>
  );
};

export default Login;
