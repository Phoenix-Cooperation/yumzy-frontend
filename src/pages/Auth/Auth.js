import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        console.log("errors", errors);
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

                <Logo className="auth__form-logo"/>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group>
                        <Form.Control className="auth__form-input--special" {...register("email")} type="email" placeholder="Email Address"/>
                        <p className="auth__form-error" >{errors.email?.message}</p>
                    </Form.Group>

                    {isSignup && (
                        <Form.Group>
                            <Form.Control className="auth__form-input" {...register("username")} type="text" placeholder="Username"/>
                            <p className="auth__form-error" >{errors.username?.message}</p>
                        </Form.Group>
                    )}

                    <Form.Group>
                        <Form.Control className="auth__form-input" {...register("password")} type="password" placeholder="Password"/>
                        <p className="auth__form-error" >{errors.password?.message}</p>
                    </Form.Group>
                
                    {isSignup && (
                        <Form.Group>
                            <Form.Control className="auth__form-input" {...register("confirmPassword")} type="password" placeholder="Re-enter password"/>
                            <p className="auth__form-error" >{errors.confirmPassword?.message}</p>
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit">
                    Submit
                    </Button>

                </Form>
            </div>
            
            <div className="auth__handler" onClick={handleIsSignup}>
                {isSignup ? (<p>Already have an account? Sign In</p>): (<p>New to yumzy? Sign Up</p>)}
            </div>
        </div>
    )
}

export default Auth
