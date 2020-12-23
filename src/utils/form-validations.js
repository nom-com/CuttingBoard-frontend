export const validateUsername = username => {
  return username.length >= 8;
};

export const validatePassword = password => {
  return password.length >= 5;
};

export const validateEmail = email => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const validateFirstname = firstname => {
  return firstname.length >= 1;
};

export const validateLasname = lastname => {
  return lastname.length >= 1;
};
