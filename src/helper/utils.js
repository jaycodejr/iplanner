// Sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//toastify
import { Slide, toast } from "react-toastify";

const MySwal = withReactContent(Swal);
const toastId = "c556b6fea176";

export const notify = (type = "i", message = "Ooppsss!") => {
  const toastConfig = {
    autoClose: 1000,
    position: "bottom-right",
    toastId,
    transition: Slide,
    theme: "colored",
    hideProgressBar: true,
  };

  switch (type) {
    case "s":
      toast.success(message, toastConfig);
      break;
    case "e":
      toast.error(message, toastConfig);
      break;
    case "w":
      toast.warning(message, toastConfig);
      break;

    default:
      toast.info(message, toastConfig);
  }
};

export const loading = (show) => {
  if (show) {
    MySwal.fire({
      title: <p>Please wait...</p>,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    return;
  }

  MySwal.close();
};

export const confirmation = async (msg) => {
  return await Swal.fire({
    title: msg,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
  });
};
