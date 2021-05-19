export const state = () => ({
  message: '',
  config: {}
});

export const mutations = {
  setMessage(state, message) {
    state.message = message;
  },
  setConfig(state, config) {
    state.config = config;
  }
}

export const getters = {
  getValues: state => property => {
    let values = [];
    for (const key in state.config) {
      if (key === property) {
        values = state.config[key];
        break;
      }
    }
    return values;
  },
};
