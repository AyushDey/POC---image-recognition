import { Loader2 } from "lucide-react";
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
const previewResponse = {
  class: "Tuile_a_Douille",
  confidence: 0.7698,
  matches: [
    {
      class: "Tuile_Chatiere",
      score: 0.764
    },
    {
      class: "MBC20",
      score: 0.6919
    },
    {
      class: "PL5H20",
      score: 0.6553
    },
    {
      class: "BC20",
      score: 0.6549
    },
    {
      class: "BC10",
      score: 0.6467
    }
  ]
}

export default function ResponseDisplay({
  uploadedImage,
  response,
  isLoading,
}) {
  if (!response) {
    response = previewResponse;
  }
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
              <p>{response.class}</p>
              {/* <p><b>{response.result.label}</b></p> */}
              <p>Similarity: {response?.confidence}</p>
              {/* <p>Price: ₹{response.result.price}</p>
              <p>Accoridian Component</p> */}
              {/* <p>{response.matches.map((item) => (
                <>
                  <p>{item.class}</p>
                </>
              ))}</p> */}
              {response?.matches && <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Other Predictions</AccordionTrigger>
                  <AccordionContent>
                    <p>{response.matches.map((item) => (
                      <div className="flex-1 justify-center border-2 p-2 m-1 rounded-2xl gap-y-2">
                        <div ><p className="text-base">Item Name - {item.class}</p></div>
                        <div><p className="text-base">Similarity - {item.score}</p></div>
                      </div>
                    ))}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>}
            </div>
          ) : (
            <p>No response yet</p>
          )}
        </div>
      </div>

      {/* <div className="space-y-3">
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
              <p>Accoridian Component</p>
            </div>
          ) : (
            <p>No response yet</p>
          )}
        </div>
      </div> */}
    </div>
  );
}
