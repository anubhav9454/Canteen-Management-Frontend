export const state = () => ({
  api_key: 'xau_DAuaGzesKpD4CsrumYDzNivflsla9DX34',
  login_details: {
    title: '',
    canteen_id: '',
    username: '',
  },

//   login_details: {
//     id: 'rec_ce2b59eje6pqcu9jjms0',
//     title: 'IBPS Canteen',
//     username: 'ibps',
//   }

})

export const mutations = {
  login(state, element) {
    console.log('logging in')
    state.login_details.title = element.title
    state.login_details.canteen_id = element.id
    state.login_details.username = element.username
    console.log('logged in')
  },
  logout(state){
    console.log('Logging Out');
    state.login_details = {
      title: '',
      canteen_id: '',
      username: '',
    };
    console.log('Logging out');
  }
}
