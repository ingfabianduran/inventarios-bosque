export const state = () => ({
  loading: true,
});

export const mutations = {
  SET_LOADING(state, value) {
    state.loading = value;
  }
};
