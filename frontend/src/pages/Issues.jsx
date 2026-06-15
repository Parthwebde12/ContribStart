import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";
import { ExternalLink, Tag, RefreshCw, AlertCircle } from "lucide-react";

const LANGUAGES = ["All","JavaScript","TypeScript","Python","Go","Rust","Java","C++","Ruby","PHP"];
const TOPICS    = ["All","documentation","testing","bug","feature","cli","web","api"];

export default function Issues() {
  const [issues,  setIssues]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [lang,    setLang]    = useState("All");
  const [topic,   setTopic]   = useState("All");

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/issues", {
        params: {
          language: lang  !== "All" ? lang  : undefined,
          topic:    topic !== "All" ? topic : undefined,
        },
      });
      setIssues(res.data);
    } catch {
      setError("Could not fetch issues. Make sure your backend server is running.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchIssues(); }, [lang, topic]);

  const repoName = (url) => url.replace("https://api.github.com/repos/", "");

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Browse Issues</h1>
          <p className="text-gray-500 text-sm">Real beginner-friendly issues pulled live from GitHub.</p>
        </div>
        <button onClick={fetchIssues}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 bg-white px-3 py-1.5 rounded-lg transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Language</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  lang === l
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Topic</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => setTopic(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  topic === t
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
              <div className="flex gap-2">
                <div className="h-5 bg-gray-100 rounded-full w-16" />
                <div className="h-5 bg-gray-100 rounded-full w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-xs text-gray-400 mb-4">{issues.length} issues found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues.map((issue) => (
              <div key={issue.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium truncate max-w-[80%]">
                    {repoName(issue.repository_url)}
                  </span>
                  <a href={issue.html_url} target="_blank" rel="noreferrer"
                    className="text-gray-400 hover:text-indigo-600 transition-colors shrink-0">
                    <ExternalLink size={15} />
                  </a>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 flex-1">
                  {issue.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {issue.labels.slice(0, 3).map((label) => (
                    <span key={label.id}
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                      <Tag size={9} />{label.name}
                    </span>
                  ))}
                </div>
                <a href={issue.html_url} target="_blank" rel="noreferrer"
                  className="mt-auto w-full text-center text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50 transition-colors">
                  View on GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}