import { useState, useEffect } from "react";
import { Plus, Trash2, Trophy, GitPullRequest, Eye } from "lucide-react";

const STORAGE_KEY = "contribstart_progress";

const MILESTONES = [
  { label: "First Steps", req: 1, type: "issues"  },
  { label: "Explorer",    req: 5, type: "issues" },
  { label: "First PR",    req: 1, type: "prs"},
  { label: "Contributor", req: 3, type: "prs" },
  { label: "Open Sourcer",req: 10,type: "issues"},
];

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { issues: [], prs: [] };
  } catch {
    return { issues: [], prs: [] };
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Tracker() {
  const [data, setData] = useState(load);
  const [issueInput, setIssueInput] = useState("");
  const [prInput, setPrInput] = useState("");

  useEffect(() => save(data), [data]);

  const addItem = (type, value) => {
    if (!value.trim()) return;
    setData((prev) => ({ ...prev, [type]: [...prev[type], { text: value.trim(), date: new Date().toLocaleDateString() }] }));
    type === "issues" ? setIssueInput("") : setPrInput("");
  };

  const remove = (type, i) => {
    setData((prev) => ({ ...prev, [type]: prev[type].filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1E2761] mb-1">My Progress</h1>
      <p className="text-gray-500 mb-8">Track every issue you explore and every PR you submit.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1E2761] text-white rounded-xl p-6 text-center">
          <Eye size={28} className="mx-auto mb-2 text-[#02C39A]" />
          <div className="text-4xl font-bold">{data.issues.length}</div>
          <div className="text-gray-300 text-sm mt-1">Issues Explored</div>
        </div>
        <div className="bg-[#028090] text-white rounded-xl p-6 text-center">
          <GitPullRequest size={28} className="mx-auto mb-2 text-[#02C39A]" />
          <div className="text-4xl font-bold">{data.prs.length}</div>
          <div className="text-gray-300 text-sm mt-1">PRs Submitted</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#1E2761] mb-3 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-500" /> Milestones
        </h2>
        <div className="flex flex-wrap gap-3">
          {MILESTONES.map((m) => {
            const count = m.type === "issues" ? data.issues.length : data.prs.length;
            const unlocked = count >= m.req;
            return (
              <div
                key={m.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition ${
                  unlocked
                    ? "bg-[#E6F7F4] border-[#02C39A] text-[#028090]"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
                {!unlocked && (
                  <span className="text-xs text-gray-400">
                    ({count}/{m.req})
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {[
        { type: "issues", label: "Issues Explored", input: issueInput, setInput: setIssueInput, placeholder: "e.g. facebook/react #1234 - Fix typo" },
        { type: "prs",    label: "PRs Submitted",   input: prInput,    setInput: setPrInput,    placeholder: "e.g. vuejs/vue #5678 - Add dark mode" },
      ].map(({ type, label, input, setInput, placeholder }) => (
        <div key={type} className="mb-6">
          <h2 className="text-lg font-bold text-[#1E2761] mb-3">{label}</h2>
          <div className="flex gap-2 mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem(type, input)}
              placeholder={placeholder}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#028090]"
            />
            <button
              onClick={() => addItem(type, input)}
              className="bg-[#1E2761] text-white px-4 py-2 rounded-lg hover:bg-[#162050] transition flex items-center gap-1 text-sm"
            >
              <Plus size={16} /> Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {data[type].length === 0 && (
              <p className="text-gray-400 text-sm">Nothing logged yet. Add your first one!</p>
            )}
            {data[type].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                <div>
                  <p className="text-sm text-[#1E2761] font-medium">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
                <button onClick={() => remove(type, i)} className="text-gray-300 hover:text-red-400 transition">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}