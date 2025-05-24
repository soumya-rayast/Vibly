import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { Eye, EyeOff, VoicemailIcon } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore';
const LoginPage = () => {
  const { error, isPending, loginMutation, data } = useLogin();
  const { theme } = useThemeStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }
  useEffect(() => {
    if (data?.success) {
      navigate("/"); // or your dashboard route
    }
  }, [data, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 p-6" data-theme={theme}>
      <div className="flex flex-col-reverse md:flex-row shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl border border-primary/10 bg-base-100/90 backdrop-blur-lg">
        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-primary/20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/10 opacity-60 z-0"></div>
          <div className="relative z-10 p-8 flex flex-col items-center">
            <img src="/image1.png" alt="Language connection illustration" className="w-48 h-48 rounded-xl shadow-lg mb-6 object-cover" />
            <h2 className="text-2xl font-bold text-primary mb-2 text-center drop-shadow">Connect Globally</h2>
            <p className="text-base text-base-content/80 text-center max-w-xs">
              Practice real conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 justify-center">
            <VoicemailIcon className="size-10 text-primary drop-shadow" />
            <span className="text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
              Vibly
            </span>
          </div>
          {/* Error message Display */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message || error.message || "Login failed"}</span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
              <p className="text-sm text-base-content/70">Sign in to continue your language journey</p>
            </div>
            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="hello@gmail.com"
                className="input input-bordered w-full"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-12"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary w-full transition-transform duration-150 active:scale-95"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <div className="text-center mt-3">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Create One
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default LoginPage
