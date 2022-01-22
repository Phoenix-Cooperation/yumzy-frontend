import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required("your name is required"),
  email: yup
    .string()
    .email()
    .required("your email is required"),
  password: yup
    .string()
    .min(8, "password should have at least 8 characters")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    })
});


export const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("your email is required"),
  password: yup
    .string()
    .min(8, "password should have at least 8 characters")
    .required("password is required"),
});

export const signUpDefaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const signInDefaultValues = {
  email: "",
  password: "",
}