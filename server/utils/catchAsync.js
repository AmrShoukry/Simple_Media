module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      if (error instanceof Error && error.message) {
        next(error.message); // Pass the error message if available
      } else {
        return res.status(500).json({
          error: error,
        }); // Otherwise, pass the entire error object
      }
    });
  };
};
