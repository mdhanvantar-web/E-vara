import { useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { analyzeSearchResults } from "@/lib/identity-analysis";
import { IdentityIntelligenceCard } from "./IdentityIntelligenceCard";

interface SearchResultsIntelligenceProps {
  fullName: string;
  username: string;
}

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export const SearchResultsIntelligence = ({
  fullName,
  username,
}: SearchResultsIntelligenceProps) => {
  const [searchEngine, setSearchEngine] = useState<"google" | "bing">("google");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ReturnType<typeof analyzeSearchResults> | null>(null);

  const performSearch = async () => {
    if (!fullName || !username) {
      setError("Please provide both full name and username");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // In production, call your backend API to perform the search
      // For now, we'll simulate the search with mock data
      const mockResults: SearchResult[] = await fetchSearchResults(
        fullName,
        username,
        searchEngine
      );

      const result = analyzeSearchResults(mockResults, fullName, username, 10);
      setAnalysisResult(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Search failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neon-card rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <Search className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Identity Intelligence Search
        </h3>
      </div>

      {/* Controls */}
      <div className="mb-4 flex gap-2">
        <select
          value={searchEngine}
          onChange={(e) => setSearchEngine(e.target.value as "google" | "bing")}
          className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground"
        >
          <option value="google">Google</option>
          <option value="bing">Bing</option>
        </select>
        <button
          onClick={performSearch}
          disabled={loading || !fullName || !username}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Analyze Results
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md border border-[hsl(var(--severity-high)/0.3)] bg-[hsl(var(--severity-high)/0.1)] px-4 py-3 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[hsl(var(--severity-high))] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[hsl(var(--severity-high))]">
              Error
            </p>
            <p className="text-xs text-[hsl(var(--severity-high))] mt-1">
              {error}
            </p>
          </div>
        </div>
      )}  

      {/* Results */}
      {analysisResult && (
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <div className="rounded-md border border-border bg-secondary p-3 text-center">
              <div className="text-lg font-bold text-foreground">
                {analysisResult.summary.totalResults}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                Total Results
              </div>
            </div>
            <div className="rounded-md border border-[hsl(var(--severity-high)/0.3)] bg-[hsl(var(--severity-high)/0.1)] p-3 text-center">
              <div className="text-lg font-bold text-[hsl(var(--severity-high))]">
                {analysisResult.summary.highRiskCount}
              </div>
              <div className="text-[10px] text-[hsl(var(--severity-high))] font-mono">
                High Risk
              </div>
            </div>
            <div className="rounded-md border border-[hsl(var(--severity-medium)/0.3)] bg-[hsl(var(--severity-medium)/0.1)] p-3 text-center">
              <div className="text-lg font-bold text-[hsl(var(--severity-medium))]">
                {analysisResult.summary.mediumRiskCount}
              </div>
              <div className="text-[10px] text-[hsl(var(--severity-medium))] font-mono">
                Medium Risk
              </div>
            </div>
            <div className="rounded-md border border-[hsl(var(--severity-low)/0.3)] bg-[hsl(var(--severity-low)/0.1)] p-3 text-center">
              <div className="text-lg font-bold text-[hsl(var(--severity-low))]">
                {analysisResult.summary.lowRiskCount}
              </div>
              <div className="text-[10px] text-[hsl(var(--severity-low))] font-mono">
                Low Risk
              </div>
            </div>
            <div className="rounded-md border border-border bg-secondary p-3 text-center">
              <div className="text-lg font-bold text-foreground">
                {analysisResult.summary.averageConfidence}%
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                Avg Confidence
              </div>
            </div>
          </div>

          {/* Signals */}
          <div>
            <h4 className="mb-3 font-mono text-sm font-semibold text-foreground">
              IDENTITY SIGNALS ({analysisResult.signals.length})
            </h4>
            {analysisResult.signals.length === 0 ? (
              <div className="rounded-md border border-border bg-secondary p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No significant signals detected
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {analysisResult.signals.map((signal, idx) => (
                  <IdentityIntelligenceCard key={idx} signal={signal} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground font-mono">
            Analyzed at {new Date(analysisResult.timestamp).toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Placeholder */}
      {!analysisResult && !loading && (
        <div className="rounded-md border border-border bg-secondary p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Click "Analyze Results" to scan for identity mentions
          </p>
        </div>
      )}
    </div>
  );
};

// Mock search implementation (replace with real API call)
async function fetchSearchResults(
  fullName: string,
  username: string,
  engine: "google" | "bing"
): Promise<SearchResult[]> {
  void engine;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock search results
  return [
    {
      title: `${username} - Twitter Profile`,
      snippet: `The latest tweets from ${username}. Follow ${fullName} on Twitter for updates and insights.`,
      link: `https://twitter.com/${username}`,
    },
    {
      title: `${fullName} | LinkedIn Profile`,
      snippet: `Professional profile of ${fullName}. Software engineer with 5+ years of experience...`,
      link: `https://linkedin.com/in/${username}`,
    },
    {
      title: `${username} on Instagram`,
      snippet: `@${username} shared a photo: Enjoying the beautiful weather...`,
      link: `https://instagram.com/${username}`,
    },
    {
      title: `GitHub - ${username}`,
      snippet: `GitHub profile for ${username}. Repositories and contributions in various technologies.`,
      link: `https://github.com/${username}`,
    },
    {
      title: `${fullName} mentioned in article`,
      snippet: `An interesting article mentioning ${fullName} and his contributions to the tech industry...`,
      link: `https://techblog.example.com/article-${username}`,
    },
    {
      title: `${username} - Medium Blog`,
      snippet: `Latest articles by ${username} on Medium. Technical writing about web development.`,
      link: `https://medium.com/@${username}`,
    },
  ];
}