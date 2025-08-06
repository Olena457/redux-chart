import { useSelector, useDispatch } from "react-redux";
import { toggleMetricSelection } from "../../redux/experiment/experimentsSlice.js";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";

const MetricList = () => {
  const dispatch = useDispatch();
  const { metrics, selectedMetrics } = useSelector(
    (state) => state.experiments
  );

  const handleToggle = (metric) => {
    dispatch(toggleMetricSelection(metric));
  };

  return (
    <Card title="Metrics available" className="mt-4 my-custom-card">
      {metrics.length === 0 ? (
        <p>No metrics found. Please upload a CSV file.</p>
      ) : (
        <div className="grid">
          {metrics.map((metric) => (
            <div key={metric} className="col-12">
              <div className="field-checkbox">
                <Checkbox
                  inputId={metric}
                  value={metric}
                  onChange={() => handleToggle(metric)}
                  checked={selectedMetrics.includes(metric)}
                />
                <label htmlFor={metric}>{metric}</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MetricList;
