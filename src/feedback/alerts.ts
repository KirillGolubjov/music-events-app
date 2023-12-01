import Swal from "sweetalert2";

const errorAlert = async (message: string, title?: string) =>
  Swal.fire({
    icon: "error",
    title: title ? title : "Error",
    text: message,
  });

export const alerts = {
  errorAlert,
};
