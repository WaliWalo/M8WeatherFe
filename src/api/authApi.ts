import Cookies from "js-cookie";
import { IUser } from "../types";
export async function login(email: string, password: string) {
  try {
    let credentials = { email, password };
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    await fetch(`${process.env.REACT_APP_BE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    Cookies.remove("loggedIn");
  } catch (error) {
    console.log(error);
  }
}

export const register = async (user: IUser) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error;
  }
};
