import * as actions from '../actions/exploreActions';
import { addToArr, removeFromArr, alterInArr } from '../../../utils/reducerUtils';

export const exploreReducer = function (state, action) {
  const actionHandlers = {
    [actions.FETCH_STARTED]() {
      return Object.assign({}, state, { isDatasourceMetaLoading: true });
    },

    [actions.FETCH_SUCCEEDED]() {
      return Object.assign({}, state, { isDatasourceMetaLoading: false });
    },

    [actions.FETCH_FAILED]() {
      // todo(alanna) handle failure/error state
      return Object.assign({}, state, { isDatasourceMetaLoading: false });
    },

    [actions.SET_FIELD_OPTIONS]() {
      const newState = Object.assign({}, state);
      const optionsByFieldName = action.options;
      const fieldNames = Object.keys(optionsByFieldName);

      fieldNames.forEach((fieldName) => {
        newState.fields[fieldName].choices = optionsByFieldName[fieldName];
      });

      return Object.assign({}, state, newState);
    },

    [actions.SET_FILTER_COLUMN_OPTS]() {
      return Object.assign({}, state, { filterColumnOpts: action.filterColumnOpts });
    },
    [actions.ADD_FILTER]() {
      return addToArr(state, 'filters', action.filter);
    },
    [actions.REMOVE_FILTER]() {
      return removeFromArr(state, 'filters', action.filter);
    },
    [actions.CHANGE_FILTER_FIELD]() {
      return alterInArr(state, 'filters', action.filter, { field: action.field });
    },
    [actions.CHANGE_FILTER_OP]() {
      return alterInArr(state, 'filters', action.filter, { op: action.op });
    },
    [actions.CHANGE_FILTER_VALUE]() {
      return alterInArr(state, 'filters', action.filter, { value: action.value });
    },
    [actions.SET_FIELD_VALUE]() {
      const newFormData = Object.assign({}, state.viz.form_data);
      newFormData[action.key] = action.value ? action.value : (!state.viz.form_data[action.key]);

      return Object.assign(
        {},
        state,
        { viz: Object.assign({}, state.viz, { form_data: newFormData }) }
      );
    },
    [actions.UPDATE_CHART]() {
      const vizUpdates = {
        column_formats: action.viz.column_formats,
        json_endpoint: action.viz.json_endpoint,
        csv_endpoint: action.viz.csv_endpoint,
        standalone_endpoint: action.viz.standalone_endpoint,
        query: action.viz.query,
        data: action.viz.data,
      };
      return Object.assign(
        {},
        state,
        {
          viz: Object.assign({}, state.viz, vizUpdates),
          isChartLoading: false,
        });
    },
    [actions.CHART_UPDATE_STARTED]() {
      return Object.assign({}, state, { isChartLoading: true });
    },
    [actions.CHART_UPDATE_FAILED]() {
      return Object.assign({}, state, { isChartLoading: false });
    },
  };
  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }
  return state;
};
