import { toast } from "react-toastify";

const useToaster = () => {
const successToaster = (message) => {
    toast.success(message || "Operation successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

const errorToaster = (message) => {
    toast.error(message || "An error occurred!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return { successToaster, errorToaster };
};
export default useToaster;