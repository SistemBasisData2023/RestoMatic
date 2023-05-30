// class CustomerMiddleware {
export const validateEmailPass = async (req, res, next) => {
  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,25}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
  const unameRegex = /^[A-Za-z0-9_]{6,15}$/;

  const { name, email, password } = req.body;
  if (
    !passRegex.exec(password) ||
    !emailRegex.exec(email) ||
    !unameRegex.exec(name)
  ) {
    return res.status(400).json({
      message: "Invalid input data",
    });
  }
  next();
};
// }
