document.addEventListener('DOMContentLoaded', function() {
  // Password toggle
  document.querySelectorAll('.toggle-password').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const input = btn.parentElement.querySelector('input');
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      btn.innerText = isHidden ? '🙈' : '👁️';
    });
  });

  // Validation
  const form = document.getElementById('profile-form');
  const fields = {
    name: document.getElementById('full-name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirm: document.getElementById('confirm-password')
  };
  const errors = {
    name: document.getElementById('full-name-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    confirm: document.getElementById('confirm-password-error')
  };

  // Simulate taken email for demo
  const takenEmails = ['john@doe.com', 'test@example.com'];

  function validateName() {
    const value = fields.name.value.trim();
    if (!value) {
      errors.name.textContent = 'Full name is required.';
      fields.name.setAttribute('aria-invalid', 'true');
      return false;
    }
    errors.name.textContent = '';
    fields.name.removeAttribute('aria-invalid');
    return true;
  }

  function validateEmail() {
    const value = fields.email.value.trim();
    // Correct email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      errors.email.textContent = 'Email is required.';
      fields.email.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (!emailPattern.test(value)) {
      errors.email.textContent = 'Enter a valid email address.';
      fields.email.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (takenEmails.includes(value.toLowerCase())) {
      errors.email.textContent = 'Email is already taken';
      fields.email.setAttribute('aria-invalid', 'true');
      return false;
    }
    errors.email.textContent = '';
    fields.email.removeAttribute('aria-invalid');
    return true;
  }

  function validatePassword() {
    const value = fields.password.value;
    if (!value) {
      errors.password.textContent = 'Password is required.';
      fields.password.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (value.length < 8) {
      errors.password.textContent = 'Password must be at least 8 characters.';
      fields.password.setAttribute('aria-invalid', 'true');
      return false;
    }
    errors.password.textContent = '';
    fields.password.removeAttribute('aria-invalid');
    return true;
  }

  function validateConfirm() {
    const value = fields.confirm.value;
    if (!value) {
      errors.confirm.textContent = 'Please confirm your password.';
      fields.confirm.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (value !== fields.password.value) {
      errors.confirm.textContent = 'Passwords do not match.';
      fields.confirm.setAttribute('aria-invalid', 'true');
      return false;
    }
    errors.confirm.textContent = '';
    fields.confirm.removeAttribute('aria-invalid');
    return true;
  }

  // Profile completeness
  const checklist = [
    { id: 'check-name', validate: validateName },
    { id: 'check-email', validate: validateEmail },
    { id: 'check-password', validate: validatePassword },
    { id: 'check-confirm', validate: validateConfirm }
  ];

  function updateCompleteness() {
    let completed = 0;
    checklist.forEach(item => {
      const li = document.getElementById(item.id);
      if (item.validate()) {
        li.classList.add('completed');
        li.innerHTML = li.textContent; // Remove <s>
        completed++;
      } else {
        li.classList.remove('completed');
        li.innerHTML = `<s>${li.textContent}</s>`;
      }
    });
    const percent = Math.round((completed / checklist.length) * 100);
    document.getElementById('progress-value').textContent = percent + '%';
    const circle = document.getElementById('progress-circle');
    circle.setAttribute('aria-valuenow', percent);
    circle.style.setProperty('--progress', percent);
  }

  // Real-time validation
  Object.values(fields).forEach(input => {
    input.addEventListener('input', updateCompleteness);
    input.addEventListener('blur', updateCompleteness);
  });

  // On submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    updateCompleteness();
    if (checklist.every(item => item.validate())) {
      alert('Profile updated successfully!');
      form.reset();
      updateCompleteness();
    }
  });

  // Initial completeness
  updateCompleteness();
});