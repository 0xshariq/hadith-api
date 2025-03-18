class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  // Error Middleware
  export const errorMiddleware = (error, req, res, next) => {
    console.error("Error Middleware:", error.message);
  
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "An unexpected error occurred. Please try again.",
    });
  };
  
  export default ErrorHandler;