
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn, Eye, EyeOff, User } from "lucide-react";
import clsx from "clsx";

// Animation for successful login (scale + green glow)
const SuccessAnimation = ({ show }: { show: boolean }) => (
  <div
    className={clsx(
      "absolute inset-0 flex items-center justify-center pointer-events-none z-50 transition-all duration-500",
      show
        ? "opacity-100 scale-100 animate-glow-green"
        : "opacity-0 scale-95"
    )}
    style={{
      background:
        "linear-gradient(108deg, rgba(14,165,233,0.09) 17.7%, rgba(88,255,156,0.10) 91.2%)",
      borderRadius: 20,
    }}
    aria-hidden="true"
  >
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 52 52" width={56} height={56}>
        <circle
          cx="26"
          cy="26"
          r="25"
          fill="#232528"
          stroke="#63f240"
          strokeWidth="3"
          opacity="0.3"
        />
        <polyline
          points="16,28 23,34 36,20"
          fill="none"
          stroke="#63f240"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mt-4 text-xl font-mono text-[#63f240] drop-shadow-lg">Welcome!</span>
    </div>
  </div>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      window.location.href = "/"; // Fake redirect after animation
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181920] to-[#131313]">
      <div className="relative">
        {/* Success Animation Overlay */}
        <SuccessAnimation show={success} />

        <form
          onSubmit={handleSubmit}
          className={clsx(
            "relative w-[350px] sm:w-[400px] p-8 pt-10 pb-8 rounded-2xl shadow-xl bg-[#212225]/90 border border-[#35363A] transition-all duration-500",
            success && "opacity-40 scale-95 blur-[1px] pointer-events-none"
          )}
          style={{
            boxShadow: "0 10px 30px 0 rgba(14,14,18,0.25)",
          }}
        >
          <h2 className="text-3xl font-mono font-bold text-white mb-7">
            Login
          </h2>
          {/* Email */}
          <label
            htmlFor="email"
            className="block text-gray-200 mb-1 text-base font-mono"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mb-4 bg-[#232428] border-[#232428] text-white font-mono focus-visible:ring-0 focus-visible:border-[#0EA5E9] placeholder:text-[#5a5c60]"
            required
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="block text-gray-200 mb-1 text-base font-mono"
          >
            Password
          </label>
          <div className="relative mb-4">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-[#232428] border-[#232428] text-white font-mono pr-10 focus-visible:ring-0 focus-visible:border-[#0EA5E9] placeholder:text-[#5a5c60]"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Options row */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center space-x-2 font-mono text-gray-300 text-sm select-none cursor-pointer">
              <Checkbox
                checked={remember}
                onCheckedChange={v => setRemember(!!v)}
                className="border border-[#444] bg-transparent focus:ring-0"
                id="rememberMe"
              />
              <span htmlFor="rememberMe" className="ml-1 cursor-pointer">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-xs font-mono text-gray-400 hover:text-[#0EA5E9] transition"
              tabIndex={0}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full text-lg font-mono bg-[#ea384c] hover:bg-[#f85a71] transition rounded-lg py-2 shadow focus-visible:ring-2 focus-visible:ring-[#ea384c]"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
