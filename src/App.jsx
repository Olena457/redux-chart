import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import FileUpload from "./components/FileUpload/FileUpload.jsx";
import ExperimentLit from "./components/ExperimentList/ExperimentList.jsx";
import ChartDisplay from "./components/ChartDisplay/ChartDisplay.jsx";

import "./App.css";

function App() {
  return (
    <PrimeReactProvider>
      <div className="App p-4">
        <h2 className="text-center my-title">Tracking Chart Data</h2>
        <div className="grid">
          <div className="col-12 md:col-4">
            <FileUpload />
            <ExperimentLit />
          </div>
          <div className="col-12 md:col-8">
            <ChartDisplay />
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
