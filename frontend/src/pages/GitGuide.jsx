import { useState } from "react";
import { CheckCircle2, Circle, Copy, Check, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const steps = [
  {
    title: "Fork the repository",
    desc: "Go to the GitHub repo of the issue you picked. Click the Fork button in the top-right corner. This creates your own personal copy of the project under your GitHub account.",
    command: "# No terminal command — just click Fork on GitHub",
    tip: "Forking means you get your own copy. You can freely experiment without affecting the original project.",
  },
  {
    title: "Clone your fork",
    desc: "Download your forked repo to your computer so you can edit the code locally.",
    command: "git clone https://github.com/YOUR-USERNAME/REPO-NAME.git\ncd REPO-NAME",
    tip: "Replace YOUR-USERNAME and REPO-NAME with your actual GitHub username and the repository name.",
  },
  {
    title: "Create a new branch",
    desc: "Always create a new branch before making changes. Never work directly on the main branch.",
    command: "git checkout -b fix/your-fix-name",
    tip: "Name your branch clearly e.g. fix/typo-in-readme or feat/add-dark-mode. It helps reviewers understand your change.",
  },
  {
    title: "Make your changes",
    desc: "Open the project in your code editor, find the issue, and make your fix or improvement.",
    command: "code .\n# or open with any editor you prefer",
    tip: "Read the CONTRIBUTING.md file in the repo first — it explains the rules and code style the project follows.",
  },
  {
    title: "Commit your changes",
    desc: "Stage your changes and save them to git with a clear, descriptive commit message.",
    command: "git add .\ngit commit -m \"fix: corrected typo in README introduction\"",
    tip: "Good commit messages explain WHAT changed and WHY. Format: type: short description. Types: fix, feat, docs, style.",
  },
  {
    title: "Push to GitHub",
    desc: "Upload your branch from your local machine to your forked repo on GitHub.",
    command: "git push origin fix/your-fix-name",
    tip: "After pushing, GitHub will show a yellow banner asking if you want to open a Pull Request.",
  },
  {
    title: "Open a Pull Request",
    desc: "Go to your forked repo on GitHub. Click 'Compare & pull request'. Write a clear title and describe what you changed and why. Then submit.",
    command: "# Click 'Compare & pull request' on GitHub\n# Title: fix: corrected typo in README\n# Body: Closes #ISSUE-NUMBER",
    tip: "Write 'Closes #123' in your PR body — GitHub will automatically close the issue when your PR is merged.",
  },
];

const dailyTips = [
  "Always pull the latest changes from the main branch before starting new work: git pull origin main",
  "Small PRs get reviewed faster than big ones. Fix one thing at a time.",
  "If you're stuck, comment on the issue and ask a maintainer for guidance — most are happy to help beginners.",
  "Use git status often. It tells you exactly what's changed before you commit.",
  "A good PR description answers: what changed, why, and how to test it.",
  "Don't be afraid of merge conflicts. They're normal — Git just needs you to pick which change to keep.",
  "Star repos you contribute to. It's a small way to support maintainers and keeps the repo in your GitHub feed.",
];

function getTipOfTheDay() {
  const dayIndex = new Date().getDate() % dailyTips.length;
  return dailyTips[dayIndex];
}

export default function GitGuide() {
  const [done,     setDone]     = useState([]);
  const [copied,   setCopied]   = useState(null);
  const [expanded, setExpanded] = useState(0);
  const [tip]      = useState(getTipOfTheDay());

  const toggle = (i) =>
    setDone((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const copy = (cmd, i) => {
    navigator.clipboard.writeText(cmd);
    setCopied(i);
    setTimeout(() => setCopied(null), 1800);
  };

  const progress = Math.round((done.length / steps.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Git Guide</h1>
      <p className="text-gray-500 text-sm mb-6">
        Follow all 7 steps to make your first open source contribution. Check off each step as you go.
      </p>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Tip of the Day</p>
          <p className="text-sm text-amber-800">{tip}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Your progress</span>
          <span className="text-sm font-bold text-indigo-600">{done.length} / {steps.length} steps</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }} />
        </div>
        {done.length === steps.length && (
          <p className="text-sm text-green-600 font-medium mt-2 text-center">
            🎉 All steps done! Now go open that PR.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const isDone = done.includes(i);
          const isOpen = expanded === i;
          return (
            <div key={i} className={`border rounded-xl overflow-hidden transition-all ${
              isDone ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
            }`}>
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
                onClick={() => setExpanded(isOpen ? null : i)}>
                <button onClick={(e) => { e.stopPropagation(); toggle(i); }} className="shrink-0">
                  {isDone
                    ? <CheckCircle2 size={20} className="text-green-500" />
                    : <Circle size={20} className="text-gray-300 hover:text-indigo-400 transition-colors" />}
                </button>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isDone ? "bg-green-100 text-green-700" : "bg-indigo-50 text-indigo-700"
                  }`}>
                    Step {i + 1}
                  </span>
                  <span className={`font-semibold text-sm truncate ${
                    isDone ? "line-through text-gray-400" : "text-gray-900"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {isOpen
                  ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                  : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </div>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">{step.desc}</p>
                  <div className="bg-gray-900 rounded-lg p-3.5 mb-3 flex items-start justify-between gap-3">
                    <pre className="text-green-400 text-xs font-mono leading-relaxed whitespace-pre-wrap flex-1 overflow-x-auto">
                      {step.command}
                    </pre>
                    <button onClick={() => copy(step.command, i)}
                      className="text-gray-500 hover:text-white transition-colors shrink-0 mt-0.5">
                      {copied === i
                        ? <Check size={14} className="text-green-400" />
                        : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                    <span className="text-sm shrink-0">💡</span>
                    <p className="text-xs text-amber-800 leading-relaxed">{step.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}