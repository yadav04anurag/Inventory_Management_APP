const validator = require('validator');

module.exports = {
  validateRegisterInput: (data) => {
    const errors = {};
    
    if (!validator.isAlphanumeric(data.username)) {
      errors.username = 'Username must be alphanumeric';
    }
    
    if (!validator.isStrongPassword(data.password, { 
      minLength: 8, 
      minLowercase: 1, 
      minUppercase: 1, 
      minNumbers: 1, 
      minSymbols: 1 
    })) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and symbol';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }
};