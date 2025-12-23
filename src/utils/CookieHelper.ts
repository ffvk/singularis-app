// Cookie Helper Functions

import CookiesExpiire from "../constants/cookiesExpire"; // Import expiration config

export const setCookie = (name: string, value: string, days?: number, hours?: number) => {
  let expirationDays = days ?? CookiesExpiire.cookieExpirationDays;
  let expirationHours = hours ?? CookiesExpiire.cookieExpirationHours;
  let expires = "";

  const date = new Date();
  if (expirationHours > 0) {
    date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Convert hours to milliseconds
  } else {
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  }
  
  expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; path=/;${expires}`;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, ...cookieValueParts] = cookie.split("="); // Handle cases where "=" exists in the value
    if (cookieName === name) {
      const cookieValue = cookieValueParts.join("="); // Rejoin parts in case "=" was inside the value
      return decodeURIComponent(cookieValue); // Decode it properly
    }
  }
  return null;
};


export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};


export const getUserFromCookie = (): any => {
  let user: any = null;
  const getUserData = getCookie("user");

  if (getUserData) {
    try {
      const decodedUserData = decodeURIComponent(getUserData);
      // console.log("Raw Cookie Data:", decodedUserData); // Debugging step

      user = JSON.parse(decodedUserData); // Properly parse JSON
      // console.log("Parsed User:", user);
      // console.log("Profile Image:", user.profile_image);
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }

  return user;
};