module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      if (error instanceof Error && error.message) {
        console.log(error.message);
        next(error.message); // Pass the error message if available
      } else {
        console.log("55555555555555555555555555");
        return res.status(500).json({
          error: error,
        }); // Otherwise, pass the entire error object
      }
    });
  };
};
