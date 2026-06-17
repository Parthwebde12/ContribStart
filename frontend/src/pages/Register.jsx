import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ name: "", username: "", email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!/^[a-z0-9_]{3,20}$/.test(form.username.toLowerCase())) {
      setError("Username must be 3-20 characters: lowercase letters, numbers, underscores only.");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.username, form.email, form.password);
      navigate("/tracker");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <UserPlus size={18} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
        <p className="text-gray-500 text-sm">Start tracking your open source journey.</p>
      </div>

      {error && (
        <div className="flex gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input
            type="text" name="name" required
            value={form.name} onChange={handleChange}
            placeholder="Your name"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
          <input
            type="text" name="username" required
            value={form.username} onChange={handleChange}
            placeholder="e.g. parth_dev"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
          />
          <p className="text-xs text-gray-400 mt-1">This will be your public profile URL: /u/{form.username || "yourname"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email" name="email" required
            value={form.email} onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input
            type="password" name="password" required
            value={form.password} onChange={handleChange}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60">
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
      </p>


      <div className=" text-center text-sm m-7"><b>Test account</b>
        <p>Test1234</p>
        <p>Test@gmail.com</p>
      </div>
    </div>
  );
}