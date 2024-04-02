import axios from "axios";
import { useState } from "react";

interface ErrorObject {
  message: string;
  field: string;
}

interface RequestProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body: {
    email: string;
    password: string;
  };
}

export default ({ url, method, body }: RequestProps) => {
  const [errors, setErrors] = useState<ErrorObject[] | null>(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const reponse = await axios[method](url, body);
      return reponse.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ message: "An error occurred", field: "" }]);
      }
      throw error;
    }
  };
  return { doRequest, errors };
};
