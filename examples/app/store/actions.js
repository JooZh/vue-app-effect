import * as types from "./types";

export default {
  togglePlayer({ commit }) {
    commit(types.togglePlayer);
  },
  next({ commit }) {
    commit(types.next);
  },
  prev({ commit }) {
    commit(types.prev);
  },
  play({ commit }) {
    commit(types.play);
  },
  pause({ commit }) {
    commit(types.pause);
  },
  random({ commit }) {
    commit(types.random);
  },
  repeat({ commit }) {
    commit(types.repeat);
  },
  playBackType({ commit }, payload) {
    commit(types.playBackType, payload);
  },
  clearList({ commit }) {
    commit(types.clearList);
  },
  playMv({ commit }) {
    commit(types.playMv);
  }
};
