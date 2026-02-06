import { useState } from "react";
import "./App.css";

import UploadOptions from "./UploadOptions";
import ResponseDisplay from "./ResponseDisplay";
import CameraCapture from "./CameraCapture";

import { sendImageToApi, sendZipToApi } from "./api";

function App() {
  const [viewImage, setViewImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const [pendingTitle, setPendingTitle] = useState(null);
  const [captureMode, setCaptureMode] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleCameraCapture = async (file) => {
    // preview
    const reader = new FileReader();
    reader.onloadend = () => setViewImage(reader.result);
    reader.readAsDataURL(file);

    setApiResult(null);
    setUploadedImage(file)
    
    if(!captureMode){
      setIsLoading(true);
      try {
      const result = await sendImageToApi({
        image: file,
        title: pendingTitle,
      });

        setApiResult(result);
      } catch (err) {
        console.error(err);
        setApiResult({ message: "Error", result: { label: "-", confidence: "-", price: "-" } });
      } finally {
        setIsLoading(false);
        setPendingTitle(null);
        setUploadedImage(null)
      }
    }
  };

  const handleZipUpload = async (file) => {
    setIsLoading(true);
    setApiResult(null);

    try {
      const result = await sendZipToApi(file);
      setApiResult(result);
    } catch (err) {
      console.error(err);
      setApiResult({ message: "ZIP failed", result: { label: "-", confidence: "-", price: "-" } });
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = async (image) =>{
    setIsLoading(true);
    setApiResult(null);
    setUploadedImage(image)

    try {
      console.log(pendingTitle)
      const result = await sendImageToApi({
        image: image,
        title: pendingTitle
      });
      setApiResult(result);
      setPendingTitle('');
    } catch (err) {
      console.error(err);
      setApiResult({ message: "IMage upload failed", result: { label: "-", confidence: "-", price: "-" } });
    } finally {
      setIsLoading(false);
      setUploadedImage(null)
    }
  }
  const handleCaptureUpload = async (image) =>{
    setIsLoading(true);
    setApiResult(null);
    setUploadedImage(image)

    try {
      console.log(pendingTitle)
      const result = await sendImageToApi({
        image: image,
        title: pendingTitle
      });
      setApiResult(result);
      setPendingTitle('');
    } catch (err) {
      console.error(err);
      setApiResult({ message: "IMage upload failed", result: { label: "-", confidence: "-", price: "-" } });
    } finally {
      setIsLoading(false);
      setUploadedImage(null)
    }
  }
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
          onImageUpload={handleImageUpload}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setPendingTitle={setPendingTitle}
          setViewImage={setViewImage}
          getUploadedImage={viewImage}
          setCaptureMode={setCaptureMode}
          onCaptureUpload={handleCaptureUpload}
        />

        <ResponseDisplay
          viewImage={viewImage}
          response={apiResult}
          isLoading={isLoading}
        />
      </div>

      {showCamera && (
        <CameraCapture
          captureMode={captureMode}
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </main>
  );
}

export default App;