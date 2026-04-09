import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { setCredentials } from "../../redux/authSlice"
import { useGoogleAuthMutation, useSignInMutation } from "../../redux/authApi"
import { toast } from "react-toastify"

import logo from "../../assets/logo.png"
import googleIcon from "../../assets/googleIcon.svg"
import eyeClose1 from "../../assets/eyeClose1.svg"
import eyeOpen1 from "../../assets/eyeOpen1.svg"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../utils/firebase"

const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signIn, { isLoading: isSignInLoading}] = useSignInMutation()
    const [googleAuth, { isLoading: isGoogleAuthLoading }] = useGoogleAuthMutation()

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await signIn({ email, password }).unwrap()

            dispatch(setCredentials(res))
            if (res.user?.role === "provider") {
                navigate("/provider/dashboard")
            } else if (res.user?.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }
        } catch (error) {
            toast.error(error?.data?.message || error?.error || "Login failed. Please try again later" )
        }
    }

    const handleGoogleAuth = async () => {
        try {
            const result=await signInWithPopup(auth,new GoogleAuthProvider);
            const res=await googleAuth({name: result.user.displayName, email: result.user.email, pfpUrl: result.user.photoURL}).unwrap()
            
            dispatch(setCredentials(res))
            if (res.user?.role === "provider") {
                navigate("/provider/dashboard")
            } else if (res.user?.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }
            toast.success("User authenticated successfully")
        } catch (error) {
             toast.error(error?.data?.message || error?.error || "Login failed. Please try again later" )
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="flex items-center gap-3 ">
                    {/* logo */}
                    <img src={logo} alt="logo" className="h-25 w-25 mb-2" />
                    {/* text */}
                    <h1 className="text-4xl font-extrabold text-indigo-500 tracking-tight">UrbanServe</h1>
                </div>
                <p className="text-gray-500 text-base font-medium">Welcome, please login to your dashboard</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-10">

                <form onSubmit={handleSubmit}>

                    <div className="mb-6">
                        <label
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm bg-white"
                        />
                    </div>

                    <div className="mb-6">

                        <label className="block text-sm font-semibold text-gray-700 mb-2" >Password</label>
                        <div className="relative">
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white transition-all focus:border-transparent"
                            type={showPassword?"text":"password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)} />

                             <button 
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 hover:cursor-pointer transition-all"
                                onClick={()=>setShowPassword(!showPassword)}
                                type="button">
                                <img 
                                    className="h-5 w-5" 
                                    src={showPassword?eyeClose1:eyeOpen1} 
                                    alt="toggle-password" 
                                />
                            </button>
                    </div>
                    </div>

                    <button
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg transition-all duration-150 text-sm tracking-wide disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        type="submit"
                        disabled={isSignInLoading}
                    >
                        {isSignInLoading ? "Signing In" : "Sign In"}
                    </button>

                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">or continue with</span>
                    <div className="flex-1 h-px bg-gray-400" />
                </div>
                <button 
                    className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-150 text-sm font-semibold text-gray-700 shadow-sm cursor-pointer"
                    onClick = {handleGoogleAuth}
                    disabled = {isGoogleAuthLoading}
                    >
                    <img className="w-5 h-5" src={googleIcon} alt="google-img" />
                        { isGoogleAuthLoading ? "Loading..." : "Sign In with Google"}
                    </button>

                <div className="flex justify-between items-center mt-5">
                    <Link
                        to="/signup"
                        className="text-sm text-gray-500 hover:text-indigo-600 transition font-medium"
                    >
                        Create Account
                    </Link>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
