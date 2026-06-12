import {  Users, Zap, Shield,  } from "lucide-react";

const values = [
  { icon: <Zap size={22} className="text-[#02C39A]" />, title: "No Barriers", 
  desc: "No login, no sign-up, no setup. Open the browser and start." },
  { icon: <Users size={22} className="text-[#02C39A]" />, title: "Built for Beginners", 
  desc: "Every feature is designed for someone who has never used Git before." },
  { icon: <Shield size={22} className="text-[#02C39A]" />, title: "No AI", 
  desc: "Pure logic and real GitHub data. No black boxes, no hallucinations." },
//   { icon: <GitPullRequestDraftIcon size={22} className="text-[#02C39A]" />, title: "Real Issues", 
//   desc: "Every issue shown is a live, real GitHub ticket not fake data." },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1E2761] mb-1">About ContribStart</h1>
      <p className="text-gray-500 mb-10">
        A hackathon project built for the <strong>Future of Productivity</strong> theme.
      </p>

      {/* Mission */}
      <div className="bg-[#1E2761] text-white rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-3">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Most beginners want to contribute to open source but give up before making their
          first PR. ContribStart removes every barrier — find an issue, learn Git step by
          step, and track your journey. From zero to first pull request, guided all the way.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {values.map((v) => (
          <div key={v.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
            <div className="mb-2">{v.icon}</div>
            <h3 className="font-bold text-[#1E2761] mb-1">{v.title}</h3>
            <p className="text-gray-500 text-sm">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-[#1E2761] mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["Frontend",    "React + Tailwind CSS"],
            ["Routing",     "React Router"],
            ["Data",        "GitHub REST API v3"],
            ["Storage",     "localStorage"],
            ["HTTP Client", "Axios"],
            ["Hosting",     "Vercel / Netlify"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400">{label}</span>
              <span className="font-medium text-[#1E2761]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-400 text-sm mt-10">
        Built by <span className="font-semibold text-[#028090]">Parth Wakodikar</span>
      </p>
    </div>
  );
}