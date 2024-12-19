class ErrorResponse extends Error {
    constructor(status, message) {
      super(message); // only use in when a class extend from another class , ensure to inheritace from the parent class.
      this.status = status;
    }
  }
  
  module.exports = ErrorResponse;
  
  
  
  // Error class is limited, it only provide the message and we need the status code in web develop
  