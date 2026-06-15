import { Zap, Users, Shield, GitBranch } from "lucide-react";

const values = [
  { icon: <Zap size={18} className="text-indigo-600" />,      title: "No Barriers",        desc: "No setup hassle. Create a free account and start contributing immediately." },
  { icon: <Users size={18} className="text-indigo-600" />,    title: "Built for Beginners", desc: "Every feature is designed for someone who has never used Git before in their life." },
  { icon: <Shield size={18} className="text-indigo-600" />,   title: "No AI",               desc: "Pure logic and real GitHub data. No black boxes, no hallucinations, no surprises." },
  { icon: <GitBranch size={18} className="text-indigo-600" />,title: "Real Issues",          desc: "Every issue shown is a live, open GitHub ticket — not fake or outdated sample data." },
];

const stack = [
  ["Frontend",    "React + Tailwind CSS"],
  ["Routing",     "React Router v6"],
  ["HTTP Client", "Axios"],
  ["Backend",     "Node.js + Express"],
  ["Database",    "MongoDB Atlas"],
  ["Auth",        "JWT (JSON Web Tokens)"],
  ["Hosting",     "Vercel / Render"],
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">About ContribStart</h1>
     <p className="text-gray-500 text-sm mb-8">
  Empowering <span className="font-medium text-indigo-600">first-time contributors</span> to make their mark in open source.
</p>

      <div className="bg-indigo-600 text-white rounded-2xl p-7 mb-8">
        <h2 className="text-lg font-bold mb-2">Our Mission</h2>
        <p className="text-indigo-100 text-sm leading-relaxed">
          Most beginners want to contribute to open source but give up before making their first PR.
          ContribStart removes every barrier find an issue, learn Git step by step, and track your
          journey. From zero to first pull request, guided all the way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {values.map((v) => (
          <div key={v.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-sm transition">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
              {v.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{v.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm">Tech Stack</h2>
        <div className="divide-y divide-gray-100">
          {stack.map(([label, value]) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-400">{label}</span>
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs">
  Crafted with ❤️ by <span className="font-semibold text-indigo-600">Parth Wakodikar</span> · Open Source · For Developers
</p>
    </div>
  );
}