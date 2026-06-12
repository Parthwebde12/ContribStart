import { Link } from "react-router-dom";
import { Search, BookOpen, BarChart2, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Search size={28} className="text-[#02C39A]" />,
    title: "Browse Issues",
    desc: "Find real GitHub 'good first issue' tickets filtered by language and topic.",
    to: "/issues",
  },
  {
    icon: <BookOpen size={28} className="text-[#02C39A]" />,
    title: "Git Guide",
    desc: "Step-by-step walkthrough from fork to pull request with exact commands.",
    to: "/git-guide",
  },
  {
    icon: <BarChart2 size={28} className="text-[#02C39A]" />,
    title: "Track Progress",
    desc: "Log your explored issues and submitted PRs. Earn milestone badges.",
    to: "/tracker",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      
      <div className="text-center mb-16">
        
        <h1 className="text-5xl font-bold text-[#1E2761] mb-4 leading-tight">
          Your First Open Source <br />
          <span className="text-[#02C39A]">Contribution Starts Here</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          ContribStart helps complete beginners find projects, learn Git, and
          track their progress  no experience needed.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/issues"
            className="bg-[#1E2761] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#162050] transition"
          >
            Browse Issues <ArrowRight size={18} />
          </Link>
          <Link
            to="/git-guide"
            className="border border-[#1E2761] text-[#1E2761] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Learn Git
          </Link>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#02C39A] transition group"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="text-lg font-bold text-[#1E2761] mb-1 group-hover:text-[#028090] transition">
              {f.title}
            </h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </Link>
        ))}
      </div>

    
      <div className="bg-[#1E2761] text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Want to contribute?</h2>
        <p className="text-gray-300 text-sm">
          Open ContribStart in your browser and start contributing on day one.
          
        </p>
      </div>

    </div>
  );
}