import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "react-bootstrap/Form";

import { ReactComponent as Logo } from "../../assets/images/Logo.svg";


const SignupSchema = yup.object().shape({
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

const SigninSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required("your email is required"),
    password: yup
        .string()
        .min(8, "password should have at least 8 characters")
        .required("password is required"),
});

const Auth = () => {


    const [isSignup, setIsSignup] = useState(false);
    const [schema, setSchema] = useState();

    useEffect(() => {
        const tempSchema = isSignup ? SignupSchema : SigninSchema;
        setSchema(tempSchema);
    }, [isSignup])
    
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        clearErrors();
    }, [isSignup])

    const onSubmit = async data => {
        console.log(data, "data");
        // const userData = { username: data.username, email: data.email, password: data.password }
    }

    const handleIsSignup = () => {
        setIsSignup(prev => !prev)
    }

    console.log(isSignup);
    return (
        <div className="auth">
            <div className="auth__form">
                <div className="auth__form_logo">
                    <Logo className="auth__form_logo_img"/>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group>
                        <Form.Control className="auth__form_input" {...register("email")} type="email" placeholder="Email Address"/>
                        <p className="auth__form_error" >{errors.email?.message}</p>
                    </Form.Group>

                    {isSignup && (
                        <Form.Group>
                            <Form.Control className="auth__form_input" {...register("username")} type="text" placeholder="Username"/>
                            <p className="auth__form_error" >{errors.username?.message}</p>
                        </Form.Group>
                    )}

                    <Form.Group>
                        <Form.Control className="auth__form_input" {...register("password")} type="password" placeholder="Password"/>
                        <p className="auth__form_error" >{errors.password?.message}</p>
                    </Form.Group>
                
                    {isSignup && (
                        <Form.Group>
                            <Form.Control className="auth__form_input" {...register("confirmPassword")} type="password" placeholder="Re-enter password"/>
                            <p className="auth__form_error" >{errors.confirmPassword?.message}</p>
                        </Form.Group>
                    )}

                    <button className="auth__form_btn" type="submit">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </button>

                </Form>
            </div>
            
            <div className="auth__handler">
                {isSignup ? (
                    <p>Already have an account? 
                        <span 
                            className="auth__handler_toggle"
                            onClick={handleIsSignup}> 
                                &nbsp;Sign In
                        </span>
                    </p>) : (
                    <p>New to yumzy? 
                        <span 
                            className="auth__handler_toggle"
                            onClick={handleIsSignup}> 
                                &nbsp;Sign Up
                        </span>
                    </p>)
                }
            </div>
        </div>
    )
}

export default Auth
