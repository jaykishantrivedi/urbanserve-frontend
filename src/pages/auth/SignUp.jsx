import { useSignUpMutation } from "../../redux/authApi"
import { useDispatch } from "react-redux"
import { setCredentials, setTempEmail } from "../../redux/authSlice"
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { useGoogleAuthMutation } from "../../redux/authApi"

import logo from "../../assets/logo.png"
import eyeOpen1 from "../../assets/eyeOpen1.svg"
import eyeClose1 from "../../assets/eyeClose1.svg"
import googleIcon from "../../assets/googleIcon.svg"
import { toast } from "react-toastify"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../utils/firebase"

const SignUp = () => {

    const dispatch = useDispatch()
    const [signUp, {isLoading: isSignUpLoading}] = useSignUpMutation()
     const [googleAuth, { isLoading: isGoogleAuthLoading }] = useGoogleAuthMutation()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [acceptedTerms, setAcceptedTerms] = useState(false)

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!acceptedTerms) {
            toast.error("You must accept Terms & Conditions")
            return
        }

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match")
            return
        }

        try {
            const res= await signUp({
                name : formData.name,
                email: formData.email,
                password: formData.password
            }).unwrap()

            dispatch(setTempEmail(res.email))
            toast.success("signup successful")
            navigate("/verifyOTP-email")
        } catch (error) {
            console.error(error)
            toast.error(error?.data?.message || "signup failed" || error?.error)
        }
    }

     const handleGoogleAuth = async () => {
        try {
            const result=await signInWithPopup(auth,new GoogleAuthProvider);
            const res=await googleAuth({name: result.user.displayName, email: result.user.email, pfpUrl: result.user.photoURL}).unwrap()
            
            dispatch(setCredentials(res))
            navigate("/")
            toast.success("User authenticated successfully")
        } catch (error) {
             toast.error(error?.data?.message || error?.error || "Login failed. Please try again later" )
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 px-4">

            {/* Header */}
            <div className="mb-8 text-center">
                <div className="flex justify-center items-center gap-3">
                    <img src={logo} alt="logo" className="h-25 w-25 mb-2" />
                    <h1 className="text-4xl text-indigo-500 font-extrabold tracking-tight">UrbanServe</h1>
                </div>
                <p className="text-base text-gray-500 font-medium">Create your own account in one single step</p>
            </div>


            <form 
                className="bg-white rounded-lg shadow-md w-full max-w-lg p-10"
                onSubmit={handleSubmit}>
                

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="">Name</label>
                    <input 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder-gray-400 text-gray-700 text-sm bg-white focus:border-transparent" 
                        type="text" 
                        placeholder="Enter your full name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="">Email</label>
                    <input 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder-gray-400 text-gray-700 text-sm bg-white focus:border-transparent" 
                        type="email" 
                        placeholder="Enter your full email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="">Password</label>
                    <div className="relative">
                        <input 
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder-gray-400 text-gray-700 text-sm bg-white focus:border-transparent" 
                            type={showPassword?"text":"password"} 
                            placeholder="Choose a strong password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required/>
                        <button 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 hover:cursor-pointer transition-all"
                            onClick={()=>setShowPassword(!showPassword)}
                            type="button">
                            <img 
                                className="h-5 w-5" 
                                src={showPassword?eyeClose1:eyeOpen1} 
                                alt="toggle-password" />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="">Confirm Password</label>
                    <div className="relative">
                        <input 
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder-gray-400 text-gray-700 text-sm bg-white focus:border-transparent" 
                            type={showConfirmPassword?"text":"password"} 
                            placeholder="Enter again your chosen password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required/>
                        <button 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 hover:cursor-pointer transition-all"
                            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                            type="button">
                            <img 
                                className="h-5 w-5" 
                                src={showConfirmPassword?eyeClose1:eyeOpen1} 
                                alt="toggle-confirm-password" />
                        </button>
                    </div>
                </div>

                {/* terms and conditions */}
                <div className="flex items-start mt-1 mb-5 gap-2">
                    <div 
                        onClick={() => setAcceptedTerms(!acceptedTerms)}
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0
                        ${acceptedTerms ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"}`}
                        >
                            {acceptedTerms && (
                                <span className="text-white text-xs font-bold">✓</span>
                            )}
                        </div>
                    <span className="text-sm text-gray-400 font-medium leading-snug">
                        I agree to UrbanServe's{" "}
                        <Link
                            to="/terms"
                            target="_blank"
                            className="text-indigo-500 hover:text-indigo-700 underline underline-offset-2 font-semibold"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Terms &amp; Conditions
                        </Link>
                        {" "}and{" "}
                        <Link
                            to="/privacy"
                            target="_blank"
                            className="text-indigo-500 hover:text-indigo-700 underline underline-offset-2 font-semibold"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Privacy Policy
                        </Link>
                    </span>
                </div>

                {/* create account button */}
                <button 
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg transition-all duration-150 text-sm tracking-wide disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    type="submit"
                    disabled={isSignUpLoading}
                    >
                        {isSignUpLoading ? "Creating Account..." : "Create Account"}
                    </button>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">or continue with</span>
                    <div className="flex-1 h-px bg-gray-400" /></div>
                <button 
                    className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-150 text-sm font-semibold text-gray-700 shadow-sm cursor-pointer"
                    disabled={isGoogleAuthLoading}
                    onClick={handleGoogleAuth}>
                    <img 
                        className="w-5 h-5" 
                        src={googleIcon} 
                        alt="google-img" 
                    />
                    { isGoogleAuthLoading ? "Loading..." : "Sign In with Google"}
                    </button>
                
                <div className="mt-5 text-center">
                     <Link
                        to="/signin"
                        className="text-base font-medium hover:text-indigo-500"
                    >
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp
