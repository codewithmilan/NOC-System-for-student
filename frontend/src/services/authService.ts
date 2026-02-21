import API from "./api";

export const loginUser = async (data: any) => {
  const response = await API.post("/student/login", data);
  return response.data;
};
