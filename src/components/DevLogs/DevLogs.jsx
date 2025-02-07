import React, { useState, useEffect } from 'react';
import { 
  GitCommit, 
  ChevronDown, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Globe, 
  Wrench,
  Trophy,
  Bug, 
  Brain 
} from 'lucide-react';
import { firebaseService } from "../../config/firebase";

const parseCommitMessage = (message) => {
  const sections = message.split('---');
  if (sections.length > 1) {
    try {
      return JSON.parse(sections[1].trim());
    } catch (error) {
      return {
        tasks: [],
        challenges: [],
        achievements: [],
        learnings: '',
        nextSteps: []
      };
    }
  }
  return {
    tasks: [],
    challenges: [],
    achievements: [],
    learnings: '',
    nextSteps: []
  };
};

const DevLogs = () => {
  const [logs, setLogs] = useState([]);
  const [expandedLog, setExpandedLog] = useState(null);
  const [loading, setLoading] = useState(true);  // Added this

  const fetchAllCommits = async (config) => {
    let page = 1;
    let allCommits = [];
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/repos/OutmaneAmazighi/portfolio/commits?sha=main&per_page=100&page=${page}`,
        {
          headers: {
            'Authorization': `token ${config.githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API responded with status: ${response.status}`);
      }

      const commits = await response.json();
      if (commits.length === 0) {
        hasMore = false;
      } else {
        allCommits = [...allCommits, ...commits];
        page++;
      }
    }

    return allCommits;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await firebaseService.getConfig();
        const commits = await fetchAllCommits(config);
        
        const transformedLogs = commits.map(commit => ({
          id: commit.sha,
          date: new Date(commit.commit.author.date),
          message: commit.commit.message,
          author: commit.commit.author.name,
          details: parseCommitMessage(commit.commit.message)
        }));

        setLogs(transformedLogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    // Add proper type checking
    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
        return 'N/A';
        }
        return new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        }).format(date);
    };

    // Add error boundary
    const DevLogsErrorBoundary = ({ children }) => {
        const [hasError, setHasError] = useState(false);
    
        if (hasError) {
        return (
            <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-800">
                Es gab ein Problem beim Laden der Entwicklungs-Logs. 
                Bitte aktualisieren Sie die Seite.
            </p>
            </div>
        );
        }
    
        return children;
    };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const normalizeAuthorName = (authorName) => {
    return authorName === "mohamedzas" ? "Outmane Amazighi" : authorName;
  };

// Empty state
if (logs.length === 0 && !loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-500">
          <span className="text-4xl mb-4 block">📝</span>
          <h3 className="text-lg font-medium">Keine Entwicklungs-Logs verfügbar</h3>
          <p className="mt-2">Die Entwicklungs-Historie wird bald verfügbar sein.</p>
        </div>
      </div>
    );
  }
  
  // Better loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <DevLogsErrorBoundary>
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span>📋 Portfolio Changelog</span>
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Dokumentation der Website-Entwicklung
        </span>
        </h2>
        <div className="text-sm text-gray-500">
            Letztes Update: {logs[0] ? formatDate(logs[0].date) : 'N/A'}
        </div>
        </div>
      
      <div className="space-y-6">
      {logs.map((log) => (
  <div 
    key={log.id}
    className="border rounded-lg hover:shadow-md transition-shadow"
  >
    <div className="p-4">
      <div className="flex items-start space-x-3">
        <GitCommit className="mt-1 text-blue-600" size={20} />
        <div>
          <h3 className="font-medium text-gray-900">
            {log.message.split('---')[0]}
          </h3>
          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(log.date)}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {formatTime(log.date)}
            </span>
            <span className="flex items-center">
              <Globe size={14} className="mr-1" />
              {normalizeAuthorName(log.author)}
            </span>
          </div>
        </div>
      </div>
      
      {log.details && (
        <div className="mt-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {log.details.tasks && log.details.tasks.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Wrench className="mr-2" size={16} />
                  Implementierte Features
                </h4>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  {log.details.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {log.details.challenges && log.details.challenges.length > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2 flex items-center">
                  <Bug className="mr-2" size={16} />
                  Herausforderungen & Bugfixes
                </h4>
                <ul className="list-disc list-inside text-red-800 space-y-1">
                  {log.details.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {log.details.achievements && log.details.achievements.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2 flex items-center">
                  <Trophy className="mr-2" size={16} />
                  Erfolge
                </h4>
                <ul className="list-disc list-inside text-green-800 space-y-1">
                  {log.details.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {log.details.learnings && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                  <Brain className="mr-2" size={16} />
                  Erkenntnisse
                </h4>
                <p className="text-purple-800">{log.details.learnings}</p>
              </div>
            )}
          </div>

          {log.details.nextSteps && log.details.nextSteps.length > 0 && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Nächste Schritte</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {log.details.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
))}
      </div>
    </div>
    </DevLogsErrorBoundary>
  );
};

export default DevLogs;