export const state = () => ({
  message: ''
});

export const mutations = {
  set(state, message) {
    state.message = message;
  }
}
