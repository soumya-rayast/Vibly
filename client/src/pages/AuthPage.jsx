import React, { useState } from 'react';
import { Eye, EyeOff, LucideVoicemail} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import useLogin from '../hooks/useLogin.js';
import useSignUp from '../hooks/UseSignup.jsx';

const AuthPage = () => {
  const { theme } = useThemeStore();
  const [mode, setMode] = useState('login'); 
  const [showPassword, setShowPassword] = useState(false);

  // Shared state for login and signup
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // Hooks
  const {
    loginMutation,
    isPending: loginPending,
    error: loginError
  } = useLogin();

  // Signup
  const {
    signupMutation,
    isPending: signupPending,
    error: signupError
  } = useSignUp();

  // Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ email: formData.email, password: formData.password });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(formData);
  };

  // Toggle mode and clear errors
  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 p-6" data-theme={theme}>
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100/90 rounded-2xl shadow-2xl overflow-hidden border border-primary/15 backdrop-blur-md">

        {/* LEFT: Auth Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <LucideVoicemail className="size-10 text-primary drop-shadow" />
            <span className="text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
              Vibly
            </span>
          </div>

          {/* Error */}
          {(mode === 'login' ? loginError : signupError) && (
            <div className="alert alert-error mb-4">
              <span>
                {mode === 'login'
                  ? (loginError?.response?.data?.message || loginError?.message || 'Login failed')
                  : (signupError?.response?.data?.message || signupError?.data?.message || signupError?.message || 'Signup failed')}
              </span>
            </div>
          )}

          <form
            onSubmit={mode === 'login' ? handleLogin : handleSignup}
            className="space-y-6 w-full"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-sm text-base-content/70">
                {mode === 'login'
                  ? 'Sign in to continue your language journey'
                  : 'Join Vibly and start your language learning adventure!'}
              </p>
            </div>

            {/* Full Name (Signup Only) */}
            {mode === 'signup' && (
              <div className="form-control w-full">
                <label htmlFor="fullName" className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="form-control w-full">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className="input input-bordered w-full pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            {/* Terms Checkbox (Signup Only) */}
            {mode === 'signup' && (
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm accent-primary" required />
                  <span className="text-xs leading-tight">
                    I agree to the{' '}
                    <span className="text-primary hover:underline cursor-pointer">terms of service</span> and{' '}
                    <span className="text-primary hover:underline cursor-pointer">privacy policy</span>
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full transition-transform duration-150 active:scale-95"
              type="submit"
              disabled={mode === 'login' ? loginPending : signupPending}
            >
              {(mode === 'login' ? loginPending : signupPending) ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  {mode === 'login' ? 'Signing in...' : 'Creating...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            {/* Toggle Link */}
            <div className="text-center mt-2">
              <p className="text-sm">
                {mode === 'login'
                  ? (
                    <>
                      Don't have an account?{' '}
                      <span
                        className="text-primary font-semibold hover:underline cursor-pointer"
                        onClick={switchMode}
                      >
                        Create One
                      </span>
                    </>
                  )
                  : (
                    <>
                      Already have an account?{' '}
                      <span
                        className="text-primary font-semibold hover:underline cursor-pointer"
                        onClick={switchMode}
                      >
                        Sign in
                      </span>
                    </>
                  )}
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT: Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 opacity-70 z-0"></div>
          <div className="max-w-md p-10 relative z-10">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/image1.png" alt="Language connection illustration" className="w-full h-full rounded-xl shadow-lg object-cover" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold text-primary drop-shadow">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-80">
                Practice conversations, make friends, and improve your language skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
