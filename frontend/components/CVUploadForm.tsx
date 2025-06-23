import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CVUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('cv', file);

    try {
            const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Store CV text and navigate to interview page
      sessionStorage.setItem('cvText', response.data.cvText);
      router.push('/interview');

    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.message || 'An error occurred while uploading the CV.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="cv-upload" className="sr-only">
            Upload CV
          </label>
          <input
            id="cv-upload"
            name="cv"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={uploading || !file}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Start Interview'}
        </button>
      </div>
    </form>
  );
}
