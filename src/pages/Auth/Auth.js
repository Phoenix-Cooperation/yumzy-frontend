import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import Form from "react-bootstrap/Form";

import { auth, signIn, registerUser, signInWithGoogle, logout} from "../../services/firebase-auth";
import { SigninSchema, SignupSchema, signUpDefaultValues, signInDefaultValues } from "./Schema";
import { isLoggedIn } from "../../api/cache";
import userStore from "../../utils/userStore";

import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as GoogleLogo } from "../../assets/images/google-icon.svg";


const Auth = () => {

  const navigate = useNavigate();

  const CREATE_USER = gql`
    mutation CREATE_USER($username: String!, $email: String!, $id: String!) {
        createUser(username: $username, email: $email, user_id: $id) {
            username
        }
    }
`

  const [isSignup, setIsSignup] = useState(false);
  const [schema, setSchema] = useState();
  const [defaultValues, setDefaultValues] = useState();

  const [registerUserBE, { loading, error }] = useMutation(CREATE_USER)

  useEffect(() => {
    const tempSchema = isSignup ? SignupSchema : SigninSchema;
    const tempDefaultValues = isSignup ? signUpDefaultValues : signInDefaultValues;
    setSchema(tempSchema);
    setDefaultValues(tempDefaultValues)
  }, [isSignup])
    
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  useEffect(() => {
    clearErrors();
    reset()
  }, [isSignup])

  const onSubmit = async data => {
    console.log(data, "data");
    if (isSignup) {
      const { email, password, username } = data;
      const id = await registerUser(email, password, username)
      console.log("id", id)
      registerUserBE({ variables: {username, email, id }})
      userStore.setUser(username)
    } else {
      const { email, password, username } = data;
      const user = signIn(email, password)
      const { photoURL } = user.user;
      userStore.setUser(username, photoURL)
    }
    // const userData = { username: data.username, email: data.email, password: data.password }
  }

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    console.log(user)
    console.log(user.user.displayName, user.user.email, user.user.uid, user.user.photoURL)
    const { displayName, email, uid, photoURL } = user.user
    registerUserBE({ variables: { username: displayName, email, id:uid }})
    userStore.setUser(displayName, photoURL)
  }

  const handleIsSignup = () => {
    setIsSignup(prev => !prev)
  }

  useEffect(() => {
    // console.log(auth.currentUser)
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        userStore.setToken(token)
        isLoggedIn(true);
        navigate("/", { replace: true })
      }
      else {
        userStore.clearUserStore();
        isLoggedIn(false);
      }
    })
  }, [auth])

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
                
        <div className="auth__form_googleLogin">
          <hr className="auth__form_googleLogin_hr"/>
          <span className="auth__form_googleLogin_orSpan">or</span>
          <button 
            className="auth__form_googleLogin_btn"
            onClick={handleGoogleSignIn}
          >
            <span><GoogleLogo className="auth__form_googleLogin_btn_logo"/>Continue with Google</span>
          </button>
        </div>
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

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Auth
