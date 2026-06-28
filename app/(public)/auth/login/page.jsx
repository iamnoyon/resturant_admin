"use client";

import { useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/store/public/index";
import { useRouter } from "next/navigation";
import useToaster from "@/components/hooks/useToaster";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { errorToaster, successToaster } = useToaster();
  const [Login, { isLoading }] = useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    Login({ email, password })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          successToaster(res?.message || "Login successful!");
          router.replace("/dashboard");
        }
      })
      .catch((err) => {
        errorToaster(err?.data?.message || "Login failed.");
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-[#042A55]">
              EcommerceStore
            </h1>
          </Link>
          <h2 className="text-xl font-bold text-gray-900 mt-4">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#042A55] border-gray-300 rounded focus:ring-[#042A55]"
                />
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#042A55] hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#042A55] hover:bg-[#063C76] disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#042A55] font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
