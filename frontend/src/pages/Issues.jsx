import { useState, useEffect } from "react";
import axios from "axios";
import { ExternalLink, Star, Tag } from "lucide-react";

const LANGUAGES = ["All", "JavaScript", "Python", "Go", "Rust", "TypeScript", "Java", "C++"];

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("All");
  const [error, setError] = useState("");

  const fetchIssues = async (language) => {
    setLoading(true);
    setError("");
    try {
      const query =
        language === "All"
          ? "label:good-first-issue+state:open"
          : `label:good-first-issue+state:open+language:${language}`;
      const res = await axios.get(
        `https://api.github.com/search/issues?q=${query}&sort=created&order=desc&per_page=12`
      );
      setIssues(res.data.items);
    } catch (err) {
      setError("Could not fetch issues. GitHub API rate limit may have been reached.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues(lang);
  }, [lang]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1E2761] mb-1">Browse Issues</h1>
      <p className="text-gray-500 mb-6">Real beginner-friendly issues from GitHub — updated live.</p>

      
      <div className="flex flex-wrap gap-2 mb-8">
        {LANGUAGES.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              lang === l
                ? "bg-[#1E2761] text-white border-[#1E2761]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#02C39A]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      
      {loading && (
        <div className="text-center py-20 text-gray-400">Fetching issues from GitHub...</div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Issue Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#02C39A] transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-[#1E2761] leading-snug line-clamp-2">
                  {issue.title}
                </h3>
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#028090] hover:text-[#02C39A] shrink-0"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                {issue.repository_url.replace("https://api.github.com/repos/", "")}
              </p>
              <div className="flex flex-wrap gap-1">
                {issue.labels.slice(0, 4).map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#E6F7F4] text-[#028090]"
                  >
                    <Tag size={10} />
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}