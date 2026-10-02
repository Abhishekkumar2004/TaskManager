import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { registerUser } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check password match
    if (password !== conPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Basic password validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name,
        email,
        password,
      });

      console.log(response);

      toast.success(
        'Account created successfully! 🎉'
      );

      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConPassword('');

      // Redirect to login
      setTimeout(() => {
        navigate('/log-in');
      }, 800);

    } catch (error) {

      const message =
        error.response?.data?.message ||
        'Registration failed. Please try again.';

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)]
                 relative overflow-hidden
                 bg-linear-to-br
                 from-slate-950
                 via-blue-950
                 to-indigo-950
                 flex items-center justify-center
                 px-4 py-10"
    >

      {/* Background Decorations */}

      <div
        className="absolute -top-32 -left-32
                   w-96 h-96
                   bg-blue-500/20
                   rounded-full
                   blur-3xl"
      />

      <div
        className="absolute -bottom-32 -right-32
                   w-96 h-96
                   bg-indigo-500/20
                   rounded-full
                   blur-3xl"
      />

      <div
        className="absolute top-1/2 left-1/2
                   w-72 h-72
                   bg-purple-500/10
                   rounded-full
                   blur-3xl
                   -translate-x-1/2
                   -translate-y-1/2"
      />

      {/* Register Card */}

      <div className="relative w-full max-w-md">

        <div
          className="bg-white/10
                     backdrop-blur-xl
                     border border-white/20
                     rounded-3xl
                     shadow-2xl
                     p-8 sm:p-10"
        >

          {/* Icon */}

          <div className="flex justify-center mb-6">

            <div
              className="w-16 h-16
                         rounded-2xl
                         bg-linear-to-br
                         from-blue-500
                         to-indigo-600
                         flex items-center justify-center
                         shadow-lg
                         shadow-blue-500/30"
            >
              <User
                size={32}
                className="text-white"
              />
            </div>

          </div>

          {/* Heading */}

          <div className="text-center mb-8">

            <h1
              className="text-3xl sm:text-4xl
                         font-bold text-white"
            >
              Create Account
            </h1>

            <p className="text-slate-300 mt-3">
              Join us and start managing your tasks.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="block text-sm
                           font-medium
                           text-slate-200 mb-2"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute
                             left-4 top-1/2
                             -translate-y-1/2
                             text-slate-400"
                />

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="w-full
                             pl-12 pr-4 py-3.5
                             rounded-xl
                             bg-white/10
                             border border-white/20
                             text-white
                             placeholder:text-slate-400
                             outline-none
                             focus:border-blue-400
                             focus:ring-4
                             focus:ring-blue-500/20
                             transition"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm
                           font-medium
                           text-slate-200 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute
                             left-4 top-1/2
                             -translate-y-1/2
                             text-slate-400"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full
                             pl-12 pr-4 py-3.5
                             rounded-xl
                             bg-white/10
                             border border-white/20
                             text-white
                             placeholder:text-slate-400
                             outline-none
                             focus:border-blue-400
                             focus:ring-4
                             focus:ring-blue-500/20
                             transition"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm
                           font-medium
                           text-slate-200 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute
                             left-4 top-1/2
                             -translate-y-1/2
                             text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className="w-full
                             pl-12 pr-12 py-3.5
                             rounded-xl
                             bg-white/10
                             border border-white/20
                             text-white
                             placeholder:text-slate-400
                             outline-none
                             focus:border-blue-400
                             focus:ring-4
                             focus:ring-blue-500/20
                             transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute
                             right-4 top-1/2
                             -translate-y-1/2
                             text-slate-400
                             hover:text-white
                             transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm
                           font-medium
                           text-slate-200 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute
                             left-4 top-1/2
                             -translate-y-1/2
                             text-slate-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  value={conPassword}
                  onChange={(e) =>
                    setConPassword(e.target.value)
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="w-full
                             pl-12 pr-12 py-3.5
                             rounded-xl
                             bg-white/10
                             border border-white/20
                             text-white
                             placeholder:text-slate-400
                             outline-none
                             focus:border-blue-400
                             focus:ring-4
                             focus:ring-blue-500/20
                             transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute
                             right-4 top-1/2
                             -translate-y-1/2
                             text-slate-400
                             hover:text-white
                             transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full
                         mt-2
                         py-3.5 px-6
                         rounded-xl
                         bg-linear-to-r
                         from-blue-500
                         to-indigo-600
                         hover:from-blue-600
                         hover:to-indigo-700
                         text-white
                         font-semibold
                         shadow-lg
                         shadow-blue-500/20
                         disabled:opacity-60
                         disabled:cursor-not-allowed
                         active:scale-[0.98]
                         transition-all
                         duration-200
                         flex items-center
                         justify-center gap-2"
            >

              {loading ? (
                <>
                  <span
                    className="w-5 h-5
                               border-2
                               border-white/30
                               border-t-white
                               rounded-full
                               animate-spin"
                  />

                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={19} />
                </>
              )}

            </button>

          </form>

          {/* Login Link */}

          <div className="mt-8 text-center">

            <p className="text-sm text-slate-400">
              Already have an account?
            </p>

            <Link
              to="/log-in"
              className="inline-block mt-1
                         text-sm font-semibold
                         text-blue-300
                         hover:text-blue-200
                         transition"
            >
              Sign in →
            </Link>

          </div>

        </div>

        {/* Footer */}

        <p className="text-center
                      text-xs text-slate-500 mt-6">
          Secure authentication • Task Manager
        </p>

      </div>
    </div>
  );
};

export default Register;