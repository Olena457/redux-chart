import { createSelector } from "@reduxjs/toolkit";

const selectExperimentsState = (state) => state.experiments || {};

// Створюємо єдиний екземпляр порожнього масиву,
// щоб завжди повертати одне й те саме посилання,
// якщо дані відсутні. Це критично важливо для мемоізації селекторів.
const EMPTY_ARRAY = [];

export const selectSelectedExperimentIds = createSelector(
  [selectExperimentsState],
  (experiments) => experiments.selectedExperimentIds || EMPTY_ARRAY
);

export const selectExperimentIds = createSelector(
  [selectExperimentsState],
  (experiments) => experiments.experimentIds || EMPTY_ARRAY
);

export const selectAllData = createSelector(
  [selectExperimentsState],
  (experiments) => experiments.allData || EMPTY_ARRAY
);

export const selectMetrics = createSelector(
  [selectExperimentsState],
  (experiments) => experiments.metrics || EMPTY_ARRAY
);

export const selectChartData = createSelector(
  [selectSelectedExperimentIds, selectAllData, selectMetrics],
  (selectedExperimentIds, allData, metrics) => {
    // Умова перевірки для повернення стабільного порожнього масиву,
    // якщо немає даних для відображення
    if (
      !selectedExperimentIds ||
      selectedExperimentIds.length === 0 ||
      !allData ||
      allData.length === 0
    ) {
      return EMPTY_ARRAY;
    }

    const chartData = [];

    selectedExperimentIds.forEach((expId) => {
      metrics.forEach((metricName) => {
        const filteredData = allData
          .filter(
            (row) =>
              row.experiment_id === expId && row.metric_name === metricName
          )
          .map((row) => ({ step: row.step, value: row.value }))
          .sort((a, b) => a.step - b.step);

        if (filteredData.length > 0) {
          chartData.push({
            experimentId: expId,
            metricName: metricName,
            data: filteredData,
          });
        }
      });
    });

    return chartData;
  }
);
