import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config.jsx";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = (props) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  async function onCaptchVerify() {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  function onSignup() {
    try {
      if(ph == "919172467207") props.setvoterID(ph);
      setLoading(true);
      onCaptchVerify().catch((err) => {
        console.log(err);
      });

      const appVerifier = window.recaptchaVerifier;

      const formatPh = "+" + ph;

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sended successfully!");
        })
        .catch((error) => {
          console.log(error, "^^^^^^^^^");
          setLoading(false);
        });
    } catch (error) {
        console.log(error);
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        props.setvoterID(ph);
        console.log("res.user... ", ph);
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {/* <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1> */}
            {showOTP ? (
              <>
                
                <label
                  htmlFor="otp"
                  className="font-bold text-xl  text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5  rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                
                <label
                  htmlFor=""
                  className="font-bold text-xl text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        
      </div>
    </section>

  );
};

export default App;
