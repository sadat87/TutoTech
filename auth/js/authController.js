// Controller: wires forms to model and handles user actions
document.addEventListener('DOMContentLoaded', () => {
  // Student signup
  const signupStudent = document.getElementById('signup-student');
  if (signupStudent) {
    signupStudent.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(signupStudent).entries());
      const err = UserModel.validateStudentSignup(data);
      if (err) return alert('Error: ' + err);
      alert('Student signup simulated. Check email for verification.');
      signupStudent.reset();
      window.location.href = '/auth/login.html';
    });
  }

  // Teacher signup
  const signupTeacher = document.getElementById('signup-teacher');
  if (signupTeacher) {
    signupTeacher.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(signupTeacher).entries());
      const err = UserModel.validateTeacherSignup(data);
      if (err) return alert('Error: ' + err);
      alert('Teacher signup simulated. Please verify via institutional email.');
      signupTeacher.reset();
      window.location.href = '/auth/login.html';
    });
  }

  // Login forms
  const loginStudent = document.getElementById('login-student');
  if (loginStudent) {
    loginStudent.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login simulated for student.');
      window.location.href = '/index.html';
    });
  }

  const loginTeacher = document.getElementById('login-teacher');
  if (loginTeacher) {
    loginTeacher.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login simulated for teacher.');
      window.location.href = '/index.html';
    });
  }
});
