import Vue from 'vue';
import Vuex from 'vuex';
import { STATUS_OPTIONS } from './utils/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: undefined, // current room
    username: undefined, // user
    status: STATUS_OPTIONS.available, // user status
    rooms: [], // Available rooms in the whole chat
  },
  mutations: {
    // Mutation per action (joinRoom, changeRoom, setRooms, leaveChat, changeSatus)
  },
  actions: {
    // Actioin to be trigger when :
    // joinRoom, changeRoom, setRooms, leaveChat, changeStatus.
  },
});
