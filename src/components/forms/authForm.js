


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, sendOtp, verifyOtp, resetPassword } from "@/store/features/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Mail, Lock, ShieldCheck, CornerUpLeft, Key, Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, otpSent } = useSelector((state) => state.auth);
  const [mode, setMode] = useState("login"); // login or reset
  const [step, setStep] = useState("credentials"); // credentials, otp, or resetPassword
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sanitization function
  const sanitizeInput = (input) => {
    return input.replace(/[<>{}]/g, "").trim();
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password);
  };

  // Handle login submission
  const handleLogin = async () => {
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      toast.error("invalid email");
      return;
    }
    if (!validatePassword(sanitizedPassword)) {
      toast.error("invalid password");
      return;
    }

    try {
      await dispatch(login({ email: sanitizedEmail, password: sanitizedPassword })).unwrap();
      toast.success("send");
      setStep("otp");
    } catch (err) {
      toast.error("login failed");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      toast.error("invalid otp");
      return;
    }

    try {
      await dispatch(verifyOtp({ email, otp: code })).unwrap();
      if (mode === "login") {
        toast.success("login success");
        router.push("/dashboard");
      } else {
        toast.success("otp verified");
        setStep("resetPassword");
      }
    } catch (err) {
      toast.error("otp failed");
    }
  };

  // Handle password reset request
  const handleResetPasswordRequest = async () => {
    const sanitizedEmail = sanitizeInput(email);
    if (!validateEmail(sanitizedEmail)) {
      toast.error("invalid email");
      return;
    }

    try {
      await dispatch(sendOtp(sanitizedEmail)).unwrap();
      toast.success("send");
      setStep("otp");
    } catch (err) {
      toast.error("otp send failed");
    }
  };

  // Handle password reset submission
  const handleResetPassword = async () => {
    const code = otp.join("");
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      toast.error("invalid otp");
      return;
    }

    const sanitizedNewPassword = sanitizeInput(newPassword);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    if (!validatePassword(sanitizedNewPassword)) {
      toast.error("invalid password");
      return;
    }
    if (sanitizedNewPassword !== sanitizedConfirmPassword) {
      toast.error("passwords mismatch");
      return;
    }

    try {
      await dispatch(resetPassword({ email, password: sanitizedNewPassword, otp: code })).unwrap();
      toast.success("password reset");
      setMode("login");
      setStep("credentials");
      setNewPassword("");
      setConfirmPassword("");
      setOtp(Array(6).fill(""));
    } catch (err) {
      toast.error("reset failed");
    }
  };

  // Handle OTP resend
  const handleResend = async () => {
    setOtp(Array(6).fill(""));
    try {
      await dispatch(sendOtp(email)).unwrap();
      toast.success("send");
    } catch (err) {
      toast.error("resend failed");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Display errors from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Card className="w-full max-w-md p-8 bg-gradient-to-br from-gray-50 to-teal-100 rounded-xl shadow-lg border border-teal-200">
      {step === "credentials" && (
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-center text-teal-800">
            {mode === "login" ? "Sign In" : "Reset Password"}
          </h2>
          <div className="flex items-center border border-teal-400 rounded-lg px-3 py-2 bg-white">
            <Mail className="text-teal-700 mr-2" size={20} strokeWidth={2.5} />
            <Input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(sanitizeInput(e.target.value))}
              type="email"
              className="border-none bg-transparent focus:ring-0 text-gray-900 placeholder-gray-400 text-sm cursor-pointer"
            />
          </div>
          {mode === "login" && (
            <div className="flex items-center border border-teal-400 rounded-lg px-3 py-2 bg-white">
              <Lock className="text-teal-700 mr-2" size={20} strokeWidth={2.5} />
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(sanitizeInput(e.target.value))}
                type={showPassword ? "text" : "password"}
                className="border-none bg-transparent focus:ring-0 text-gray-900 placeholder-gray-400 text-sm cursor-pointer"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="text-teal-700" size={20} strokeWidth={2.5} />
                ) : (
                  <Eye className="text-teal-700" size={20} strokeWidth={2.5} />
                )}
              </button>
            </div>
          )}
          <Button
            onClick={mode === "login" ? handleLogin : handleResetPasswordRequest}
            disabled={loading}
            className="bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm cursor-pointer"
          >
            {loading
              ? mode === "login"
                ? "Validating..."
                : "Requesting OTP..."
              : mode === "login"
              ? "Sign In"
              : "Send OTP"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setMode(mode === "login" ? "reset" : "login")}
            className="text-teal-800 font-medium text-sm rounded-lg cursor-pointer"
          >
            {mode === "login" ? "Forgot Password?" : "Back to Sign In"}
          </Button>
        </div>
      )}

      {step === "otp" && (
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <ShieldCheck className="mx-auto text-teal-700 h-10 w-10" strokeWidth={2.5} />
            <h2 className="text-3xl font-bold text-teal-800">Verify OTP</h2>
            <p className="text-sm text-gray-600">Sent to {email}</p>
          </div>
          <div className="flex justify-center gap-2">
            {otp.map((digit, i) => (
              <Input
                key={i}
                id={`otp-${i}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold border border-teal-400 rounded-lg bg-white text-gray-900 cursor-pointer"
                type="text"
                inputMode="numeric"
              />
            ))}
          </div>
          <Button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={loading}
            className="border border-teal-700 text-teal-700 font-semibold rounded-lg text-sm cursor-pointer"
          >
            Resend OTP
          </Button>
          <Button
            variant="ghost"
            onClick={() => setStep("credentials")}
            className="flex items-center justify-center gap-2 text-sm text-teal-800 font-medium rounded-lg cursor-pointer"
          >
            <CornerUpLeft className="h-4 w-4" strokeWidth={2.5} /> Back to {mode === "login" ? "Sign In" : "Reset"}
          </Button>
        </div>
      )}

      {step === "resetPassword" && (
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-center text-teal-800">
            Set New Password
          </h2>
          <div className="flex items-center border border-teal-400 rounded-lg px-3 py-2 bg-white">
            <Key className="text-teal-700 mr-2" size={20} strokeWidth={2.5} />
            <Input
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(sanitizeInput(e.target.value))}
              type={showNewPassword ? "text" : "password"}
              className="border-none bg-transparent focus:ring-0 text-gray-900 placeholder-gray-400 text-sm cursor-pointer"
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="ml-2 cursor-pointer"
            >
              {showNewPassword ? (
                <EyeOff className="text-teal-700" size={20} strokeWidth={2.5} />
              ) : (
                <Eye className="text-teal-700" size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
          <div className="flex items-center border border-teal-400 rounded-lg px-3 py-2 bg-white">
            <Key className="text-teal-700 mr-2" size={20} strokeWidth={2.5} />
            <Input
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(sanitizeInput(e.target.value))}
              type={showConfirmPassword ? "text" : "password"}
              className="border-none bg-transparent focus:ring-0 text-gray-900 placeholder-gray-400 text-sm cursor-pointer"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="text-teal-700" size={20} strokeWidth={2.5} />
              ) : (
                <Eye className="text-teal-700" size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
          <Button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm cursor-pointer"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setStep("otp")}
            className="flex items-center justify-center gap-2 text-sm text-teal-800 font-medium rounded-lg cursor-pointer"
          >
            <CornerUpLeft className="h-4 w-4" strokeWidth={2.5} /> Back to OTP
          </Button>
        </div>
      )}
    </Card>
  );
}