import { useEffect, useRef } from "react";
import { Button } from "./components/ui/button";

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      });

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "capture.jpg", {
        type: "image/jpeg",
      });
      onCapture(file);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex justify-center gap-4 bg-black">
        <Button
          onClick={capture}
          className="bg-white text-black px-8 py-3 rounded-full"
        >
          Capture
        </Button>

        <Button
          onClick={onClose}
          className="bg-red-500 text-white px-6 py-3 rounded-full"
        >
          Cancel
        </Button>
      </div>

      <canvas ref={canvasRef} hidden />
    </div>
  );
}
