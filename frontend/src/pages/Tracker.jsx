import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";
import { Plus, Trash2, Trophy, GitPullRequest, Eye, Loader2 } from "lucide-react";

const MILESTONES = [
  { label: "First Steps",  req: 1,  type: "issues", icon: "🌱", desc: "Explore your first issue" },
  { label: "Explorer",     req: 5,  type: "issues", icon: "🔍", desc: "Explore 5 issues" },
  { label: "First PR",     req: 1,  type: "prs",    icon: "🎉", desc: "Submit your first PR" },
  { label: "Contributor",  req: 3,  type: "prs",    icon: "⭐", desc: "Submit 3 PRs" },
  { label: "Open Sourcer", req: 10, type: "issues", icon: "🚀", desc: "Explore 10 issues" },
];

export default function Tracker() {
  const [data,       setData]       = useState({ issues: [], prs: [] });
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [issueInput, setIssueInput] = useState("");
  const [prInput,    setPrInput]    = useState("");
  const [saving,     setSaving]     = useState(false);

  const fetchProgress = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/tracker");
      setData(res.data);
    } catch {
      setError("Could not load progress. Make sure the backend server is running.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchProgress(); }, []);

  const add = async (type, value) => {
    if (!value.trim()) return;
    setSaving(true);
    try {
      const res = await api.post(`/api/tracker/${type}`, { text: value.trim() });
      setData(res.data);
      type === "issues" ? setIssueInput("") : setPrInput("");
    } catch {
      setError("Could not save entry.");
    }
    setSaving(false);
  };

  const remove = async (type, id) => {
    try {
      const res = await api.delete(`/api/tracker/${type}/${id}`);
      setData(res.data);
    } catch {
      setError("Could not delete entry.");
    }
  };

  const sections = [
    {
      type: "issues", label: "Issues Explored",
      input: issueInput, setInput: setIssueInput,
      placeholder: "e.g. facebook/react #1234 — fix typo in docs",
      icon: <Eye size={16} />, color: "indigo",
    },
    {
      type: "prs", label: "PRs Submitted",
      input: prInput, setInput: setPrInput,
      placeholder: "e.g. vuejs/vue #5678 — add dark mode toggle",
      icon: <GitPullRequest size={16} />, color: "violet",
    },
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-20 flex flex-col items-center justify-center text-gray-400">
        <Loader2 size={28} className="animate-spin mb-3" />
        <p className="text-sm">Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My Progress</h1>
      <p className="text-gray-500 text-sm mb-8">Track every issue you explore and every PR you submit.</p>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-indigo-600 text-white rounded-xl p-6">
          <Eye size={22} className="mb-3 opacity-80" />
          <div className="text-3xl font-bold">{data.issues.length}</div>
          <div className="text-indigo-200 text-sm mt-1">Issues Explored</div>
        </div>
        <div className="bg-violet-600 text-white rounded-xl p-6">
          <GitPullRequest size={22} className="mb-3 opacity-80" />
          <div className="text-3xl font-bold">{data.prs.length}</div>
          <div className="text-violet-200 text-sm mt-1">PRs Submitted</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy size={16} className="text-yellow-500" /> Milestones
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {MILESTONES.map((m) => {
            const count = m.type === "issues" ? data.issues.length : data.prs.length;
            const unlocked = count >= m.req;
            return (
              <div key={m.label}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition ${
                  unlocked ? "bg-indigo-50 border-indigo-200" : "bg-gray-50 border-gray-200 opacity-50"
                }`}>
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className={`text-xs font-semibold ${unlocked ? "text-indigo-700" : "text-gray-500"}`}>
                  {m.label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{m.desc}</span>
                {!unlocked && <span className="text-xs text-gray-400 mt-1">{count}/{m.req}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Log sections */}
      {sections.map(({ type, label, input, setInput, placeholder, icon, color }) => (
        <div key={type} className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className={`text-${color}-600`}>{icon}</span> {label}
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add(type, input)}
              placeholder={placeholder}
              disabled={saving}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition disabled:opacity-50"
            />
            <button onClick={() => add(type, input)} disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium disabled:opacity-50">
              <Plus size={15} /> Add
            </button>
          </div>
          {data[type].length === 0 ? (
            <p className="text-sm text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-lg px-4 py-6 text-center">
              Nothing logged yet — add your first one above!
            </p>
          ) : (
            <div className="space-y-2">
              {data[type].map((item) => (
                <div key={item._id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-indigo-200 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button onClick={() => remove(type, item._id)}
                    className="text-gray-300 hover:text-red-400 transition-colors ml-4">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}