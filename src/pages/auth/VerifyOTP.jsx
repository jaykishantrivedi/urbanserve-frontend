import { useRef, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useVerifyEmailMutation, useResendEmailOtpMutation } from "../../redux/authApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { clearTempEmail } from "../../redux/authSlice"

const VerifyOTP = () => {

    const dispatch = useDispatch()
    const tempEmail = useSelector((state)=>state.auth.tempEmail)
    const navigate = useNavigate()

    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [timer, setTimer] = useState(60)

    const [verifyEmail, {isLoading: isVerifying}] = useVerifyEmailMutation()
    const [resendOtp, {isLoading: isResending}] = useResendEmailOtpMutation()

    const inputsRef = useRef([])

    // CountDown for resend OTP
    useEffect(()=>{
        if(timer<=0) return

        const interval = setInterval(()=>{
            setTimer((prev)=>{
                if(prev<1){
                    clearInterval(interval)
                    return 0
                }
                return prev-1
            })
        },1000)
        
        return() => clearInterval(interval)
    },[timer])

    // Handle OTP input change
    const handleChange = (e, index) => {
        const val = e.target.value.replace(/[^0-9]/g, "")
        if(!val) return

        const newOtp = [...otp]
        newOtp[index] = val
        setOtp(newOtp)

        // Move focus to next Index
        if(index<5) inputsRef.current[index+1].focus()
    }

    // Handle backSpace
    const handleKeyDown = (e, index) => {
        if(e.key === "Backspace"){
            const newOtp = [...otp]
            if(newOtp[index]){
                newOtp[index] = ""
                setOtp(newOtp)
            }else if(index>0){
                newOtp[index-1]=""
                setOtp(newOtp)
                inputsRef.current[index-1].focus()
            }
        }
    }

    // Verify OTP
    const handleVerify = async () => {
        const code = otp.join("")
        if(code.length < 6){
            toast.error("Please enter the 6-digit OTP")
            return
        }

        try {
            const res = await verifyEmail({email:tempEmail, otp:code}).unwrap()
            toast.success(res.message || "Email verified successfully!")

            dispatch(clearTempEmail())
            navigate("/signin")
        } catch (error) {
            toast.error(error?.data?.message || "Email Verification Failed" || error.error)
    }
    }

    // Resend OTP
    const handleResend = async() => {
        try {
            await resendOtp({email:tempEmail}).unwrap()
            toast.success("OTP resent successfully!")
            setOtp(new Array(6).fill(""))
            setTimer(60)
            inputsRef.current[0].focus()
        } catch (error) {
            toast.error(error?.data?.message || "Failed to resend OTP" || error.error)
        }
    }

    // Clear tempEmail if user navigates back to login
    const handleBackToLogin = () => {
        dispatch(clearTempEmail())
        navigate("/signin")
    }

    return (
        <div className="bg-slate-200 flex items-center justify-center min-h-screen">
            <div className="relative bg-white rounded-2xl shadow-xl p-10 ">
                <h1 className="font-extrabold text-4xl text-center mb-2 text-indigo-500">Verify OTP</h1>
                <p className="text-lg text-gray-400 text-center">A 6-digit verification code has been sent to</p>
                <p className="text-lg text-gray-400 mb-10 text-center">{tempEmail}</p>

               <div className="flex justify-center mb-7 gap-3 pr-5 pl-5">
                {
                    otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className="w-16 h-16 text-center text-3xl font-bold rounded-xl border-2 outline-none transition-all duration-200 bg-slate-200 border-gray-400"
                            inputMode="numeric"
                        />
                    ))
                }
                </div>

                {/* Verify OTP button */}
                <button 
                    className="bg-slate-300 w-full rounded-lg mt-8 py-4 text-2xl font-bold hover:bg-indigo-500 cursor-pointer border border-gray-400 hover:border-transparent transition-all duration-150"
                    onClick={handleVerify}
                    disabled={isVerifying}
                >
                    { isVerifying ? "Verifying..." : "Verify Code" }
                </button>
                
                <div className="flex items-center justify-between mt-8">
                    <button 
                        className="text-sm font-semibold hover:text-indigo-500 cursor-pointer"
                        onClick={handleResend}
                        disabled={isResending || timer > 0}
                    >
                        {timer > 0 ? `Resend code in ${timer}s` : isResending ? "Sending..." : "Resend Code"}
                    </button>

                    <button 
                        className="text-base font-semibold hover:text-indigo-500 cursor-pointer"
                        onClick={handleBackToLogin}>
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP
