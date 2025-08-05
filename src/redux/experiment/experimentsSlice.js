import { createSlice } from "@reduxjs/toolkit";

const experimentsSlice = createSlice({
  name: "experiments",
  initialState: {
    allData: [],
    experimentIds: [],
    selectedExperimentIds: [],
    metrics: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setExperimentData: (state, action) => {
      state.allData = action.payload;
      const uniqueExperimentIds = [
        ...new Set(action.payload.map((row) => row.experiment_id)),
      ];
      const uniqueMetrics = [
        ...new Set(action.payload.map((row) => row.metric_name)),
      ];

      state.experimentIds = uniqueExperimentIds;
      state.metrics = uniqueMetrics;
      state.selectedExperimentIds = [];
      state.isLoading = false;
      state.error = null;
    },
    toggleExperimentSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedExperimentIds.includes(id)) {
        state.selectedExperimentIds = state.selectedExperimentIds.filter(
          (expId) => expId !== id
        );
      } else {
        state.selectedExperimentIds.push(id);
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setExperimentData,
  toggleExperimentSelection,
  setLoading,
  setError,
} = experimentsSlice.actions;

export default experimentsSlice.reducer;
