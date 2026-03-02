import React, { useRef, useState, useEffect } from 'react';

const initialResult = {
  wasteType: '--',
  confidence: '--',
  threatLevel: '--',
  estimatedVolume: '--',
  riskAssessment: '--',
  segregationPlan: '--',
};

type ClassifierResult = typeof initialResult;

// ✅ Use PRO model for better material reasoning
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-pro';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ALLOWED_CATEGORIES = [
  'Organic',
  'Plastic',
  'Metal',
  'Glass',
  'Paper',
  'Mixed',
  'Hazardous',
];

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read image.'));
    reader.readAsDataURL(file);
  });

const normalizeResult = (data: any): ClassifierResult => {
  let wasteType = data?.wasteType;

  if (!ALLOWED_CATEGORIES.includes(wasteType)) {
    wasteType = 'Mixed';
  }

  const confidence = Number.isFinite(Number(data?.confidence))
    ? Number(data.confidence).toFixed(1)
    : '--';

  return {
    wasteType,
    confidence,
    threatLevel: data?.threatLevel || 'Low',
    estimatedVolume: data?.estimatedVolume || 'Small',
    riskAssessment: data?.riskAssessment || 'No details provided.',
    segregationPlan: data?.segregationPlan || 'Dispose properly.',
  };
};

const AIClassifier: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(initialResult);
  const [resultVisible, setResultVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (!GEMINI_API_KEY) {
      setError('Gemini API key missing.');
      return;
    }

    setResult(initialResult);
    setResultVisible(false);
    setError(null);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const newPreview = URL.createObjectURL(file);
    setPreviewUrl(newPreview);

    setProcessing(true);

    try {
      const imageBase64 = await fileToBase64(file);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `
You are a professional material identification engine.

Classify the PRIMARY waste object in the image into EXACTLY ONE of:
Organic, Plastic, Metal, Glass, Paper, Mixed, Hazardous

STRICT MATERIAL RULES:

1. Plastic beverage bottles (PET water bottles, soda bottles)
   MUST be classified as "Plastic".

2. Transparent does NOT automatically mean Glass.

3. If object appears lightweight, thin-walled, flexible,
   has label seam or plastic cap → classify as "Plastic".

4. Only classify as "Glass" if:
   - Thick rigid structure
   - Heavy appearance
   - Wine bottle or jar type
   - No visible plastic cap

5. If multiple materials clearly visible → return "Mixed".

6. If unsure → choose most common real-world material.

Return JSON only:
{
  "wasteType": "Organic|Plastic|Metal|Glass|Paper|Mixed|Hazardous",
  "confidence": number,
  "threatLevel": "Low|Moderate|High|Critical",
  "estimatedVolume": "Small|Medium|Large",
  "riskAssessment": "short explanation",
  "segregationPlan": "short disposal instruction"
}
`
                  },
                  {
                    inline_data: {
                      mime_type: file.type,
                      data: imageBase64,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0,
              responseMimeType: 'application/json',
              maxOutputTokens: 400,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('Empty model response.');
      }

      const parsed = JSON.parse(text);
      setResult(normalizeResult(parsed));
      setResultVisible(true);
    } catch (err: any) {
      console.error(err);
      setError('Failed to classify image.');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(null);
    setResult(initialResult);
    setResultVisible(false);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-cyan-500">
        AI Waste Classifier
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-xl p-6 border border-cyan-200 flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {!previewUrl ? (
            <div
              className="w-full h-48 flex items-center justify-center border-2 border-dashed border-cyan-300 rounded-lg cursor-pointer mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="text-cyan-500 font-semibold">
                Click to select image
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 rounded mb-2"
              />
              <button
                className="text-red-500 border border-red-400 rounded px-3 py-1 mt-2"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          )}

          {processing && (
            <div className="mt-4 text-cyan-500 font-semibold">
              Analyzing...
            </div>
          )}

          {error && (
            <div className="text-red-500 mt-2 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-cyan-200">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Analysis Results
          </h2>

          {resultVisible ? (
            <div className="space-y-2">
              <div><b>Waste Type:</b> {result.wasteType}</div>
              <div><b>Confidence:</b> {result.confidence}%</div>
              <div><b>Threat Level:</b> {result.threatLevel}</div>
              <div><b>Estimated Volume:</b> {result.estimatedVolume}</div>
              <div><b>Risk Assessment:</b> {result.riskAssessment}</div>
              <div><b>Segregation Plan:</b> {result.segregationPlan}</div>
            </div>
          ) : (
            <div className="text-gray-400">
              Upload an image to see results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIClassifier;