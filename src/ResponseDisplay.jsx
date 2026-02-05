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

const bulkResponse = {
  message: "Bulk upload successful",
  labels: {
    BA15: 2,
    BA20: 1,
    BB20: 2,
    BC10: 2,
    BC15: 3,
    BC20: 2,
    BPA20: 1,
    MBC15: 1,
    MBC20: 1,
    PL5H16: 1,
    PL5H20: 1,
    Tuile_a_Douille: 1,
    Tuile_Chatiere: 1
  },
  total_images: 19,
  type: "bulk"
}

const refenceResponse = {
  message: "Added reference for 'Tuile_Chatiere",
  fileName: "Double Roman Red Mesh Cat Flap Tile - MONIER - 1.png"
}



export default function ResponseDisplay({
  uploadedImage,
  response,
  isLoading,
}) {
  // if (!response) {
  //   response = bulkResponse;
  // }
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
              {(response?.type == "classify") && (
                <>
                  <p>{response.class}</p>
                  <p>Similarity: {response?.confidence}</p>

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
                </>
              )}
              {(response?.type == "reference") && (
                <>
                  <p>Message: {response?.label}</p>
                  <p>FileName : {response?.fileName}</p>

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
                </>
              )}


              {
                response?.type === "bulk" && (
                  <>
                    <p>Message: {response.message}</p>
                    <p>Total Images: {response.total_images}</p>


                    <div className="mt-3 text-left">
                      {Object.entries(response.labels).map(([label, count]) => (
                        <div
                          key={label}
                          className="flex justify-between border-b pb-1"
                        >
                          <span>{label}</span>
                          <span>{count}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}



            </div>
          ) : (
            <p>No response yet</p>
          )}

        </div>
      </div >


    </div >
  )
}
