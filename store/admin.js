export const state = ()=> ({
    api_key : 'xau_DAuaGzesKpD4CsrumYDzNivflsla9DX34',
    login_details:{
        title:'',
        canteen_id:'',
        username:'',
    }
})

export const mutations = {
    login(state, element){
        console.log('logging in');
        state.login_details.title = element.title;
        state.login_details.canteen_id = element.id;
        state.login_details.username = element.username;
        console.log('logged in');
    }
}