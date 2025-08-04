import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "prime/checkbox";
import { toggleExperimentSelection } from "../../redux/experiment/experimentsSlice.js";

const ExperimenItem = ({ experimentId }) => {
  const dispatch = useDispatch();

  const selectedExperimentIds = useSelector(
    (state) => state.experiments.selectedExperimentIds
  );
  const isSelected = selectedExperimentIds.includes(experimentId);

  const handleChange = () => {
    dispatch(toggleExperimentSelection(experimentId));
  };

  return (
    <div className="flex align-items-center mb-2">
      <Checkbox
        inputId={experimentId}
        checked={isSelected}
        onChange={handleChange}
      />
      <label htmlFor={experimentId} className="ml-2">
        {experimentId}
      </label>
    </div>
  );
};

export default ExperimenItem;
