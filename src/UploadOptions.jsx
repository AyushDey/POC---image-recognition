import { useState } from "react";
import { Camera, ImageIcon, FileArchive } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export default function UploadOptions({
  onOpenCamera,
  onZipUpload,
  selectedOption,
  setSelectedOption,
}) {
  const [imageTitle, setImageTitle] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Classification</h2>

      {/* IMAGE  */}
      <div className="rounded-lg border-2 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="h-5 w-5" />
          <h3 className="font-semibold">Image Only</h3>
        </div>

        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            setSelectedOption("image");
            onOpenCamera();
          }}
        >
          Open Camera
        </Button>
      </div>

      {/* IMAGE + TITLE */}
      <h2 className="text-xl font-semibold">Upload Options</h2>

      <div className="rounded-lg border-2 p-6">
        <div className="flex items-center gap-3 mb-4">
          <ImageIcon className="h-5 w-5" />
          <h3 className="font-semibold">Image + Title</h3>
        </div>

        <Input
          placeholder="Enter title"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          className="mb-3"
        />

        <Button
          disabled={!imageTitle.trim()}
          className="w-full"
          variant="outline"
          onClick={() => {
            setSelectedOption("image-title");
            onOpenCamera(imageTitle);
            setImageTitle("");
          }}
        >
          Open Camera
        </Button>
      </div>

      {/* ZIP UNLOAD  */}
      <div className="rounded-lg border-2 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileArchive className="h-5 w-5" />
          <h3 className="font-semibold">ZIP File</h3>
        </div>

        <Input
          type="file"
          accept=".zip"
          onChange={(e) => {
            setSelectedOption("zip");
            onZipUpload(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}
