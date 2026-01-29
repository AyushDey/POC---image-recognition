import { useState } from 'react'

import './App.css'
import UploadOptions from './UploadOptions';
import ResponseDisplay from './ResponseDisplay';
import { processImage } from './mockApi';
import CameraCapture from './CameraCapture';
import { sendImageToApi } from './api';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const [pendingTitle, setPendingTitle] = useState(null);

  const handleCameraCapture = async (file) => {
    // preview
    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);

    setIsLoading(true);
    setApiResult(null);

    const response = await processImage({
      image: file,
      title: pendingTitle,
    });

    setApiResult(response);
    setIsLoading(false);
    setPendingTitle(null);
  };

// repolace with real api 
// api call functino in import 
  const handleCameraCapturePreview = async (file) => {
  // preview
  const reader = new FileReader();
  reader.onloadend = () => setUploadedImage(reader.result);
  reader.readAsDataURL(file);

  setIsLoading(true);
  setApiResult(null);

  try {
    const result = await sendImageToApi({
      image: file,
      title: pendingTitle, // null if not provided
    });

    setApiResult(result);
  } catch (err) {
    console.error(err);
    setApiResult({ error: "Failed to process image" });
  } finally {
    setIsLoading(false);
    setPendingTitle(null);
  }
};

  const handleZipUpload = (file) => {
    setIsLoading(true);
    setApiResult(null);

    setTimeout(() => {
      setApiResult({
        message: "ZIP processed successfully",
        result: { label: "Batch Upload", confidence: "-", price: "-" },
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Upload & Process</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UploadOptions
          onOpenCamera={(title) => {
            setPendingTitle(title || null);
            setShowCamera(true);
          }}
          onZipUpload={handleZipUpload}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <ResponseDisplay
          uploadedImage={uploadedImage}
          response={apiResult}
          isLoading={isLoading}
        />
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </main>
  );
}

export default App
