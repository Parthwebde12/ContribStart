import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../context/AuthContext";
import { Trophy, Eye, GitPullRequest, Loader2, UserX, Share2, Check } from "lucide-react";

const MILESTONES = [
  { label: "First Steps",  req: 1,  type: "issues", icon: "🌱" },
  { label: "Explorer",     req: 5,  type: "issues", icon: "🔍" },
  { label: "First PR",     req: 1,  type: "prs",    icon: "🎉" },
  { label: "Contributor",  req: 3,  type: "prs",    icon: "⭐" },
  { label: "Open Sourcer", req: 10, type: "issues", icon: "🚀" },
];

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.get(`/api/profile/${username}`)
      .then((res) => setProfile(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  const sharProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 flex flex-col items-center justify-center text-gray-400">
        <Loader2 size={28} className="animate-spin mb-3" />
        <p className="text-sm">Loading profile...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 flex flex-col items-center justify-center text-gray-400">
        <UserX size={32} className="mb-3" />
        <p className="text-sm mb-1">No user found with username "{username}"</p>
        <Link to="/" className="text-indigo-600 text-sm font-medium hover:underline mt-2">Go home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">

      {/* Header card */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-indigo-200 text-sm">@{profile.username}</p>
            <p className="text-indigo-200 text-xs mt-1">
              Member since {new Date(profile.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
          <button onClick={sharProfile}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors text-white text-xs font-medium px-3 py-1.5 rounded-lg shrink-0">
            {copied ? <Check size={13} /> : <Share2 size={13} />}
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <Eye size={20} className="text-indigo-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{profile.issuesExplored}</div>
          <div className="text-gray-500 text-sm mt-1">Issues Explored</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <GitPullRequest size={20} className="text-violet-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{profile.prsSubmitted}</div>
          <div className="text-gray-500 text-sm mt-1">PRs Submitted</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy size={16} className="text-yellow-500" /> Milestones Earned
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {MILESTONES.map((m) => {
            const count = m.type === "issues" ? profile.issuesExplored : profile.prsSubmitted;
            const unlocked = count >= m.req;
            return (
              <div key={m.label}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition ${
                  unlocked ? "bg-indigo-50 border-indigo-200" : "bg-gray-50 border-gray-200 opacity-40"
                }`}>
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className={`text-xs font-semibold ${unlocked ? "text-indigo-700" : "text-gray-500"}`}>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs mt-8">
        Want a profile like this? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Join ContribStart</Link>
      </p>
    </div>
  );
}