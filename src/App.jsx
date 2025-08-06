import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import FileUpload from "./components/FileUpload/FileUpload.jsx";
import ExperimentLit from "./components/ExperimentList/ExperimentList.jsx";
import ChartDisplay from "./components/ChartDisplay/ChartDisplay.jsx";
import MetricList from "./components/MetricList/MetricList.jsx";

import "./App.css";

function App() {
  const isLoading = useSelector((state) => state.experiments.isLoading);

  return (
    <div className="main-container">
      <div className="App p-4">
        <h2 className="text-center my-title">Tracking Chart Data</h2>
        <div className="grid md:align-items-start">
          {isLoading ? (
            <div
              className="col-12 text-center flex justify-content-center align-items-center"
              style={{ height: "calc(100vh - 100px)" }}
            >
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="8"
                animationDuration=".5s"
              />
            </div>
          ) : (
            <>
              <div className="col-12 md:col-4 lg:col-4 xl:col-4 ">
                <FileUpload />
                <ExperimentLit />
                <MetricList />
              </div>
              <div
                className="col-12 md:col-8 lg:col-8 xl:col-8"
                style={{
                  marginTop: window.innerWidth >= 768 ? "2.8rem" : "0",
                }}
              >
                <ChartDisplay />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
