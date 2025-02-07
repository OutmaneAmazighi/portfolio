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

const parseCommitMessage = (message) => {
  const sections = message.split('---');
  if (sections.length > 1) {
    try {
      return JSON.parse(sections[1].trim());
    } catch (error) {
      console.warn('Failed to parse commit message JSON:', error);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/OutmaneAmazighi/portfolio/commits'
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        
        const commits = await response.json();
        
        const transformedLogs = commits.map(commit => ({
          id: commit.sha,
          date: new Date(commit.commit.author.date),
          message: commit.commit.message,
          author: commit.commit.author.name,
          details: parseCommitMessage(commit.commit.message)
        }));

        setLogs(transformedLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Entwicklungs-Logbuch</h2>
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
            <button
              onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              className="w-full text-left p-4 flex items-start justify-between"
            >
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
                      {log.author}
                    </span>
                  </div>
                </div>
              </div>
              {expandedLog === log.id ? (
                <ChevronDown className="text-gray-400" size={20} />
              ) : (
                <ChevronRight className="text-gray-400" size={20} />
              )}
            </button>
            
            {expandedLog === log.id && log.details && (
              <div className="px-4 pb-4 pt-2 border-t">
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
        ))}
      </div>
    </div>
  );
};

export default DevLogs;