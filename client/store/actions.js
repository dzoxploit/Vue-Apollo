const action = {
  'counter/setEmployeeData': (context, payload) => context.commit('setEmployeeData', payload),
  'counter/isLoggedIn': (context, payload) => context.commit('isLoggedIn', payload),
}

export default action;
