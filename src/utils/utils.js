export const emailValidation = (mailValue) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex?.test(mailValue);
};

export const passwordValidation = (passwordValue) => {
  var regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return regexPassword.test(passwordValue);
};
