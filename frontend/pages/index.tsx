import dynamic from 'next/dynamic';

const CVUploadForm = dynamic(() => import('../components/CVUploadForm'), { ssr: false });
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>CVTalk - AI Interview Simulator</title>
        <meta name="description" content="Upload your CV and experience an interview with AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Welcome to CVTalk
          </h1>
          <p className="mt-2 text-center text-lg text-gray-600">
            The Smart Interview Simulator
          </p>
        </div>
        <CVUploadForm />
      </main>
    </div>
  );
}
