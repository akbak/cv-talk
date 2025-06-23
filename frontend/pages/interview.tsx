import dynamic from 'next/dynamic';
import Head from 'next/head';

const Interview = dynamic(() => import('../components/Interview'), { ssr: false });

export default function InterviewPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <Head>
            <title>Interview | CVTalk</title>
        </Head>
        <header className="bg-white shadow-md p-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Interview Simulation</h1>
        </header>
        <Interview />
    </div>
  );
}

