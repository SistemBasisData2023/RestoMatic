export const buildResponse = (data: any, message?: string): any => {
  return {
    status: data != null ? "success" : "error",
    message: message || "",
    data: data || {},
  };
};
