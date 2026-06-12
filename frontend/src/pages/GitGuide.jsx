import { useState } from "react";
import { CheckCircle, Circle, Copy, Check } from "lucide-react";

const steps = [
  {
    title: "Fork the Repository",
    desc: "Go to the GitHub repo page and click the Fork button (top right). This creates your own copy of the project.",
    command: "# Click Fork on GitHub — no terminal command needed",
    tip: "Forking creates a copy under your GitHub account. You own this copy.",
  },
  {
    title: "Clone Your Fork",
    desc: "Download your forked repo to your computer using git clone.",
    command: "git clone https://github.com/YOUR-USERNAME/REPO-NAME.git",
    tip: "Replace YOUR-USERNAME and REPO-NAME with your actual GitHub username and the repo name.",
  },
  {
    title: "Create a New Branch",
    desc: "Never work on the main branch. Create a new branch for your fix or feature.",
    command: "git checkout -b my-first-fix",
    tip: "Name your branch something meaningful like fix-typo or add-dark-mode.",
  },
  {
    title: "Make Your Changes",
    desc: "Open the project in your code editor. Find the issue and make your change.",
    command: "# Open in VS Code\ncode .",
    tip: "Read the CONTRIBUTING.md file in the repo if it exists — it tells you the rules.",
  },
  {
    title: "Commit Your Changes",
    desc: "Save your changes to git with a clear commit message.",
    command: 'git add .\ngit commit -m "fix: corrected typo in README"',
    tip: "Write commit messages that explain WHAT you changed and WHY.",
  },
  {
    title: "Push to GitHub",
    desc: "Upload your branch to your forked repo on GitHub.",
    command: "git push origin my-first-fix",
    tip: "After pushing, GitHub will show a banner to open a Pull Request.",
  },
  {
    title: "Open a Pull Request",
    desc: "Go to your fork on GitHub. Click 'Compare & pull request'. Write a clear title and description, then submit.",
    command: "# Click 'Compare & pull request' on GitHub",
    tip: "Mention the issue you fixed using: Closes #ISSUE-NUMBER in your PR description.",
  },
];

export default function GitGuide() {
  const [completed, setCompleted] = useState([]);
  const [copied, setCopied] = useState(null);

  const toggle = (i) => {
    setCompleted((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const copyCmd = (cmd, i) => {
    navigator.clipboard.writeText(cmd);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1E2761] mb-1">Git Guide</h1>
      <p className="text-gray-500 mb-2">
        Follow these 7 steps to make your first open source contribution.
      </p>
      <div className="flex items-center gap-2 mb-8">
        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-[#02C39A] rounded-full transition-all"
            style={{ width: `${(completed.length / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-400 whitespace-nowrap">
          {completed.length} / {steps.length} done
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {steps.map((step, i) => {
          const done = completed.includes(i);
          return (
            <div
              key={i}
              className={`border rounded-xl p-5 transition ${
                done ? "border-[#02C39A] bg-[#F0FDF9]" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <button onClick={() => toggle(i)} className="mt-0.5 shrink-0">
                  {done ? (
                    <CheckCircle size={22} className="text-[#02C39A]" />
                  ) : (
                    <Circle size={22} className="text-gray-300" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#028090] bg-[#E6F7F4] px-2 py-0.5 rounded-full">
                      Step {i + 1}
                    </span>
                    <h3 className={`font-bold text-base ${done ? "line-through text-gray-400" : "text-[#1E2761]"}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{step.desc}</p>

                  
                  <div className="bg-[#1A1A2E] rounded-lg px-4 py-3 flex items-start justify-between gap-2 mb-3">
                    <pre className="text-[#02C39A] text-xs font-mono whitespace-pre-wrap flex-1">
                      {step.command}
                    </pre>
                    <button
                      onClick={() => copyCmd(step.command, i)}
                      className="text-gray-400 hover:text-white transition shrink-0 mt-0.5"
                    >
                      {copied === i ? <Check size={14} className="text-[#02C39A]" /> : <Copy size={14} />}
                    </button>
                  </div>

                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-700">
                    💡 {step.tip}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}