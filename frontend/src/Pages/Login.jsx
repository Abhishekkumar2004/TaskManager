import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { loginUser } from '../services/authService';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please enter email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      // Backend returns user, while JWT is stored in cookie
      login(response.user);

      toast.success('Login successful! 🎉');

      const redirectPath =
        location.state?.from?.pathname || '/';

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        'Login failed. Please try again.';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)]
                 relative overflow-hidden
                 bg-gradient-to-br
                 from-slate-950
                 via-blue-950
                 to-indigo-950
                 flex items-center justify-center
                 px-4 py-10"
    >
      {/* Background decorations */}
      <div
        className="absolute -top-32 -left-32
                   w-80 h-80 rounded-full
                   bg-blue-500/20 blur-3xl"
      />

      <div
        className="absolute -bottom-32 -right-32
                   w-80 h-80 rounded-full
                   bg-purple-500/20 blur-3xl"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md
                   bg-white/95 backdrop-blur-xl
                   rounded-3xl
                   border border-white/20
                   shadow-2xl
                   p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="mx-auto mb-4
                       w-14 h-14 rounded-2xl
                       bg-gradient-to-br
                       from-blue-600
                       via-indigo-600
                       to-purple-600
                       flex items-center justify-center
                       shadow-lg shadow-blue-500/30"
          >
            <Sparkles
              size={25}
              className="text-white"
            />
          </div>

          <h1
            className="text-3xl font-extrabold
                       bg-gradient-to-r
                       from-blue-600
                       via-indigo-600
                       to-purple-600
                       bg-clip-text
                       text-transparent"
          >
            Welcome Back
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Login to continue managing your tasks.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold
                         text-slate-700 mb-2"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2
                           -translate-y-1/2
                           text-blue-500"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3
                           rounded-xl
                           border border-slate-200
                           bg-slate-50
                           outline-none
                           focus:bg-white
                           focus:border-blue-500
                           focus:ring-4
                           focus:ring-blue-500/10
                           transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold
                         text-slate-700 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2
                           -translate-y-1/2
                           text-indigo-500"
              />

              <input
                id="password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full pl-11 pr-12 py-3
                           rounded-xl
                           border border-slate-200
                           bg-slate-50
                           outline-none
                           focus:bg-white
                           focus:border-indigo-500
                           focus:ring-4
                           focus:ring-indigo-500/10
                           transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2
                           -translate-y-1/2
                           text-slate-400
                           hover:text-indigo-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full
                       flex items-center
                       justify-center gap-2
                       py-3.5
                       rounded-xl
                       font-semibold
                       text-white
                       bg-gradient-to-r
                       from-blue-600
                       via-indigo-600
                       to-purple-600
                       shadow-lg
                       shadow-blue-500/25
                       hover:shadow-xl
                       hover:-translate-y-0.5
                       active:scale-[0.98]
                       disabled:opacity-60
                       disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {loading ? (
              <>
                <span
                  className="w-5 h-5
                             border-2
                             border-white/40
                             border-t-white
                             rounded-full
                             animate-spin"
                />

                Logging in...
              </>
            ) : (
              <>
                <LogIn size={18} />

                Login

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1
                             transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}

          <Link
            to="/register"
            className="font-semibold
                       text-blue-600
                       hover:text-purple-600
                       transition-colors"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;