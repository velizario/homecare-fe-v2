import { BACKEND_URL } from "./envVariables";

export const getToken = () => {
  const token = localStorage.getItem("token");
  const bearerString = token ? `Bearer ${token}` : null;
  return bearerString;
};


// TODO: use axios for fetching
// axios.get(url).then((response) => response.data);

export const requestToAPI = async (addrPath: string, method: string, body = {}) => {
  const reqObject: RequestInit = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() || "",
    },
    credentials: "include",
  };

  // Add check for POST requests where body is not empty
  if (Object.keys(body).length > 0) reqObject.body = JSON.stringify(body);

  // if (bearerString)
  //   reqObject.headers = { ...reqObject.headers, Authorization: bearerString };

  try {
    const response = await fetch(`${BACKEND_URL}/${addrPath}`, reqObject);
    const data = await response.json();
    console.log("Returned data from API:", data);
    return data;
  } catch (error) {
    console.log(error)
  }
};
