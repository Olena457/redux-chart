import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "primereact/checkbox";
import { selectSelectedExperimentIds } from "../../redux/experiment/experimentSelectors.js";
import { toggleExperimentSelection } from "../../redux/experiment/experimentsSlice.js";

const ExperimenItem = ({ experimentId }) => {
  const dispatch = useDispatch();

  const selectedExperimentIds = useSelector(selectSelectedExperimentIds);
  const isSelected = selectedExperimentIds.includes(experimentId);

  // const selectedExperimentIds = useSelector(
  //   (state) => state.experiments.selectedExperimentIds
  // );

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

export default React.memo(ExperimenItem);
