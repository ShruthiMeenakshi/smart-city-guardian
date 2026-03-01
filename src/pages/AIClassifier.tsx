import React, { useRef, useState } from 'react';

// Initial result state
const initialResult = {
  wasteType: '--',
  confidence: '--',
  threatLevel: '--',
  estimatedVolume: '--',
  riskAssessment: '--',
  segregationPlan: '--',
};

const AIClassifier: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(initialResult);
  const [resultVisible, setResultVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultVisible(false);
      setError(null);
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setProcessing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const res = await fetch('http://localhost:5000/api/intelligence/classify-waste', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('API error: ' + res.status);
      const data = await res.json();
      setResult(data.data || data);
      setResultVisible(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResultVisible(false);
    setResult(initialResult);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-cyan-500">AI Waste Classifier</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white/5 rounded-xl p-6 border border-cyan-200 flex flex-col items-center">
          <label htmlFor="ai-classifier-file-input" className="sr-only">Upload waste image</label>
          <input
            id="ai-classifier-file-input"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            title="Select a waste image file"
            placeholder="Select a waste image file"
          />
          {!previewUrl ? (
            <div
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-cyan-300 rounded-lg cursor-pointer mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="text-5xl mb-2">📸</span>
              <span className="text-cyan-500 font-semibold">Drag & drop or click to select image</span>
              <span className="text-gray-400 text-sm">JPG, PNG, WebP</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src={previewUrl!} alt="Preview" className="max-h-48 rounded mb-2" />
              <button className="text-red-500 border border-red-400 rounded px-3 py-1 mt-2" onClick={handleRemove}>Remove</button>
            </div>
          )}
          <button
            className="mt-4 w-full bg-cyan-500 text-white font-semibold py-2 rounded disabled:opacity-50"
            onClick={handleAnalyze}
            disabled={!selectedFile || processing}
          >
            {processing ? 'Analyzing...' : 'Analyze Image'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        {/* Results Section */}
        <div className="bg-white/5 rounded-xl p-6 border border-cyan-200">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Analysis Results</h2>
          {resultVisible ? (
            <div className="space-y-2">
              <div><span className="font-bold">Waste Type:</span> {result.wasteType}</div>
              <div><span className="font-bold">Confidence:</span> {result.confidence}%</div>
              <div><span className="font-bold">Threat Level:</span> {result.threatLevel}</div>
              <div><span className="font-bold">Estimated Volume:</span> {result.estimatedVolume}</div>
              <div><span className="font-bold">Risk Assessment:</span> {result.riskAssessment}</div>
              <div><span className="font-bold">Segregation Plan:</span> {result.segregationPlan}</div>
            </div>
          ) : (
            <div className="text-gray-400">Upload an image and analyze to see results.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIClassifier;
