import { Link } from "react-router-dom";
import { ArrowRight, Search, BookOpen, BarChart2, Zap } from "lucide-react";

const features = [
  {
    icon: <Search size={20} className="text-indigo-600" />,
    title: "Browse Real Issues",
    desc: "Filter live GitHub 'good first issue' tickets by language and topic. Every issue is real and open right now.",
    to: "/issues",
    tag: "Live GitHub API",
  },
  {
    icon: <BookOpen size={20} className="text-indigo-600" />,
    title: "Learn Git Step by Step",
    desc: "Fork → Clone → Branch → Commit → Push → PR. Every step has the exact command to copy and run.",
    to: "/git-guide",
    tag: "7 Steps",
  },
  {
    icon: <BarChart2 size={20} className="text-indigo-600" />,
    title: "Track Your Progress",
    desc: "Log issues you explored and PRs you submitted. Earn milestone badges as you grow.",
    to: "/tracker",
    tag: "Cloud Saved",
  },
];

const stats = [
  { value: "Free", label: "Always free to use"   },
  { value: "7",    label: "Git steps covered"     },
  { value: "Live", label: "Real GitHub issues"    },
];

const steps = [
  { n: "1", title: "Find an issue",        desc: "Pick a beginner-friendly GitHub issue that matches your language." },
  { n: "2", title: "Follow the Git guide", desc: "Our step-by-step panel walks you from fork to pull request." },
  { n: "3", title: "Submit your PR",       desc: "Push your change and open a pull request — your first contribution!" },
];

export default function Home() {
  return (
    <div className="bg-gray-50">

      <section className="max-w-6xl mx-auto px-5 pt-16 pb-14">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <Zap size={11} /> Future of Productivity 
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Your first open source<br />
            <span className="text-indigo-600">contribution starts here.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
            ContribStart helps complete beginners find real GitHub issues,
            learn Git with exact commands, and track every step of their journey.
            No experience needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/issues"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm">
              Browse Issues <ArrowRight size={16} />
            </Link>
            <Link to="/git-guide"
              className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg transition-colors text-sm">
              Learn Git Guide
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Link key={f.to} to={f.to}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-sm transition group">
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {f.tag}
              </span>
              <h3 className="font-semibold text-gray-900 mt-3 mb-1.5 group-hover:text-indigo-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 py-14">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2>
          <p className="text-gray-500 text-sm mb-8">Three steps from zero to your first pull request.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="bg-indigo-600 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-white text-2xl font-bold mb-1">Ready to contribute?</h2>
            <p className="text-indigo-200 text-sm">Create a free account and start tracking your journey.</p>
          </div>
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors text-sm whitespace-nowrap">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}