import { useState } from "react";
// import Worker and the main Viewer component
import { Worker, Viewer } from "@react-pdf-viewer/core";
// import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
function App() {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");

  // handle file onChange event
  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError(" Not a valid file type: Please select only PDF");
        setPdfFile("");
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div>
          <h3>Upload PDF File</h3>
        </div>
        <div className="underline" />
        <input className="btn" type="file" onChange={handleFile} />
        {pdfError && <span>{pdfError}</span>}
        <div className="viewer">
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
