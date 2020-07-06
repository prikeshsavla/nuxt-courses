import { helpers } from "vuelidate/lib/validators";

export const supportedFileType = (value) => {
  const allowedFormats = ["jpg", "jpeg", "png"];


  if (!helpers.req(value)) return true;

  const extension = value.split(".").pop();

  return allowedFormats.includes(extension);
};
