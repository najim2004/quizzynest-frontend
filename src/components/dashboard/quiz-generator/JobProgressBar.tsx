import React from "react";

interface JobProgressBarProps {
  progress: number;
  status?: string;
}

const JobProgressBar: React.FC<JobProgressBarProps> = ({ progress, status }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700">Progress</span>
        <span className="text-sm font-medium text-blue-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {status && (
        <div className="text-xs text-gray-500 mt-1 text-right">{status}</div>
      )}
    </div>
  );
};

export default JobProgressBar;