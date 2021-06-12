export const state = () => ({
  list: [],
  currentUser: null,
})

export const getters = {
  getSortedUsers: ({list}) => (search, sortStatus) => {
    const filteredUsers = list
      .filter(user => (
          user.username.toLowerCase().indexOf(search) !== -1
          || user.fullName.toLowerCase().indexOf(search) !== -1
        )
      );
    if (sortStatus !== 'none') {
      return filteredUsers.sort((u1, u2) => {
        if (sortStatus === 'asc') {
          return u2.created_at - u1.created_at;
        } else if (sortStatus === 'desc'){
          return u1.created_at - u2.created_at;
        }
      })
    }
    return filteredUsers;
  },
}

export const mutations = {
  setList(state, list) {
    state.list = list;
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  update({list}, updatedUser) {
    const user = list.find(user => user.id === updatedUser.id);
    if (user) {
      Object.assign(user, updatedUser);
      user.tags = [...updatedUser.tags];
    }
  },
  delete({list}, id) {
    const index = list.find(user => user.id === id);
    if (index !== -1) {
      list.splice(index, 1);
    }
  },
}

export const actions = {
  setCurrentUserById({state, commit}, id) {
    const userId = parseInt(id);
    const user = state.list.find(user => user.id === userId);
    if (user) {
      commit('setCurrentUser', user);
    }
  },
  deleteUser({state, commit}, id) {
    if (state.currentUser && state.currentUser.id === id) {
      commit('setCurrentUser', null);
    }
    commit('delete', id);
  },
}
