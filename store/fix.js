export const state = () => ({
    counter: 0,
    api_key : 'xau_DAuaGzesKpD4CsrumYDzNivflsla9DX34',
    user_details : {
        username : '',
        canteen_id : '',
        title : '',
        user_id: '',
    },
    cart : [],
    current_bill:'',

  })


  export const mutations = {
    add_to_cart(state, element) {        
        var obj = {
            id : element.id,
            name : element.name,
            price : element.price, 
            count : 1            
        }
        if(state.cart.length >= 1){            
            var cart_items = state.cart.map(element => element.id)
            console.log('cart_items', state.cart)

            console.log('element checking... ',element.id, cart_items, cart_items.includes(element.id))

            if(cart_items.includes(element.id)){
                state.cart[cart_items.indexOf(element.id)].count += 1
            } else {                
                state.cart.push(obj)
            }
        }else {            
            state.cart.push(obj)                
        }    
    },
    remove_from_cart(state, element){
        
        if(state.cart.length >= 1){     
            var cart_items = state.cart.map(x => x.id)

            if(cart_items.includes(element.id) && state.cart[cart_items.indexOf(element.id)]?.count >= 1){
                // console.log('yes we found the element', state.cart[cart_items.indexOf(element.id)]?.count)
                if(state.cart[cart_items.indexOf(element.id)].count == 1){
                    state.cart.splice(cart_items.indexOf(element.id), 1)
                }else{
                    state.cart[cart_items.indexOf(element.id)].count -= 1
                }
            }
        }else {
            alert('Cart is empty now.')
        }
    },

    clear_cart(state){
        state.cart = [];
    },
    get_bill(){
        console.log('as');

    },

    add_transaction(state, element){
        console.log('hello');
        var data = {
            user: state.user_detail.username,
            food: element.food,
            bill_no: bill,
            txn_date: new Date() 
        };

        const options = {
            method: 'POST',
            headers: {Authorization: 'Bearer' + state.fix.api_key, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            // body: '{"user":'+ state.user_detail.username+',"food":"rec_xyz","bill_no":"rec_xyz","txn_date":"2000-01-01T00:00:00Z"}'
          };
          
          fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/transaction/data?columns=id', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    },
    login(state, element){
        console.log("logging in");
        state.user_details.username = element.username;
        state.user_details.title = element.name;
        state.user_details.canteen_id  = element.id;
        state.user_details.user_id = element.user_id;
        console.log('logged in')
    },
    logout(state){
        console.log('logout');
        state.user_details = {
            username : '',
            canteen_id : '',
            title : '',
            user_id:''

        };
        state.cart = [];
    }
    
  }