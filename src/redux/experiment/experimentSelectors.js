import { createSelector } from "@reduxjs/toolkit";

const selectExperimentsState = (state) => state.experiments;

const EMPTY_ARRAY = [];

export const selectSelectedExperimentIds = createSelector(
  [selectExperimentsState],
  (experiments) => experiments?.selectedExperimentIds || EMPTY_ARRAY
);

export const selectExperimentIds = createSelector(
  [selectExperimentsState],
  (experiments) => experiments?.experimentIds || EMPTY_ARRAY
);

export const selectAllData = createSelector(
  [selectExperimentsState],
  (experiments) => experiments?.allData || EMPTY_ARRAY
);

export const selectMetrics = createSelector(
  [selectExperimentsState],
  (experiments) => experiments?.metrics || EMPTY_ARRAY
);

export const selectSelectedMetrics = createSelector(
  [selectExperimentsState],
  (experiments) => experiments?.selectedMetrics || EMPTY_ARRAY
);

export const selectChartData = createSelector(
  [selectAllData, selectSelectedExperimentIds, selectSelectedMetrics],
  (allData, selectedExperimentIds, selectedMetrics) => {
    if (
      selectedExperimentIds.length === 0 ||
      selectedMetrics.length === 0 ||
      allData.length === 0
    ) {
      return EMPTY_ARRAY;
    }

    const groupedData = {};
    selectedExperimentIds.forEach((expId) => {
      selectedMetrics.forEach((metricName) => {
        const key = `${metricName}_${expId}`;
        groupedData[key] = allData
          .filter(
            (row) =>
              row.experiment_id === expId && row.metric_name === metricName
          )
          .map((row) => ({ step: row.step, value: row.value }));
      });
    });

    const combinedData = [];
    const allSteps = [...new Set(allData.map((row) => row.step))].sort(
      (a, b) => a - b
    );

    allSteps.forEach((step) => {
      const stepData = { step };
      for (const key in groupedData) {
        const point = groupedData[key].find((item) => item.step === step);
        if (point) {
          stepData[key] = point.value;
        }
      }
      combinedData.push(stepData);
    });

    const chartGroups = {};
    selectedMetrics.forEach((metricName) => {
      chartGroups[metricName] = {
        data: combinedData,
        lines: selectedExperimentIds.map((expId) => ({
          dataKey: `${metricName}_${expId}`,
          name: `exp_${expId}`,
        })),
      };
    });

    return chartGroups;
  }
);
