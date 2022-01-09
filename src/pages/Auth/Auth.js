import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
      .string()
      .required("your name is required"),
    email: yup
      .string()
      .email()
      .required("your email is required"),
    password: yup
      .string()
      .required("password is required"),
    confirmPassword: yup
      .string()
      .required("confirm password is required")
      .when("password", {
        is: password => (password && password.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
      })
  });
  
const Auth = () => {

      
    return (
        <div>
            
        </div>
    )
}

export default Auth
