import axios from "axios";
export const testBackendConnection  = async () => {
  try {
    const res = await axios.get("http://localhost:5000/");
    return res.data;
  } catch (err) {
    return "ERROR: " + err.message;
  }
};
