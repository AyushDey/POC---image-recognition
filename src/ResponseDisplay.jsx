import { Loader2 } from "lucide-react";

export default function ResponseDisplay({
  uploadedImage,
  response,
  isLoading,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Your Upload</h3>

        <div className="flex justify-center border-2 border-dashed p-6">
          {uploadedImage ? (
            <img src={uploadedImage} className="max-h-64 object-contain" />
          ) : (
            <p>No image yet</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">API Response</h3>

        <div className="flex justify-center border-2 p-6">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : response ? (
            <div className="text-center space-y-1">
              <p>{response.message}</p>
              <p><b>{response.result.label}</b></p>
              <p>Confidence: {response.result.confidence}</p>
              <p>Price: ₹{response.result.price}</p>
            </div>
          ) : (
            <p>No response yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
