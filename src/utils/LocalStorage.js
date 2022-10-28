export const setAccessToken = (accessToken) => {
    localStorage.setItem("token", accessToken);
  };
  
  export const getAccessToken = () => {
    return localStorage.getItem("token");
  };
  
  export const removeAccessToken = () => {
    return localStorage.removeItem("token");
  };
  