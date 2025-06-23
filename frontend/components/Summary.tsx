interface SummaryProps {
    summaryText: string;
}

export default function Summary({ summaryText }: SummaryProps) {
    return (
        <div className="bg-white p-8 shadow-lg rounded-lg mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-900">Interview Evaluation</h2>
            <div className="text-gray-700 whitespace-pre-wrap">
                <p>{summaryText}</p>
            </div>
            <div className="text-center pt-4">
                 <button 
                    onClick={() => window.location.href = '/'} 
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Start New Interview
                </button>
            </div>
        </div>
    );
}