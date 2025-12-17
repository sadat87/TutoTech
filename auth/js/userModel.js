// Simple client-side user model (no backend) - stores form data and validates
const UserModel = (function () {
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return {
    validateStudentSignup(data) {
      if (!data.firstName || !data.lastName) return 'Missing name';
      if (!validateEmail(data.email)) return 'Invalid email';
      if (!data.password || data.password.length < 8) return 'Weak password';
      return null;
    },
    validateTeacherSignup(data) {
      if (!data.name) return 'Missing name/title';
      if (!validateEmail(data.email)) return 'Invalid email';
      return null;
    }
  };
})();
