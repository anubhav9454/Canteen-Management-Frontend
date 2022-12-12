<template>
    <div>
        <div class="bg-green-800 px-5 py-3 text-white ">
            <nuxt-link to="/">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18">
                    </path>
                </svg>
            </nuxt-link>

            <div class="flex items-center justify-between py-2">
                <div class="text-3xl text-center">
                    Cart
                </div>
                <div>
                    {{ cart.length }} items
                </div>
            </div>

        </div>

        <div>
            <div v-for="item in cart" :key="item.id" class="flex items-center justify-between p-3">
                <div>
                    <div class="font-semibold text-xl">
                        {{ item.name }}
                    </div>

                    <div class="text-xs text-gray-400">
                        Rs. {{ item.price }} * {{ item.count }}
                    </div>
                </div>

                <div>
                    Rs. {{ item.price * item.count }}
                </div>


            </div>

            <center class="py-2">
                <div class="p-3 font-semibold bg-green-50" v-if="(cart.length == 0)">                    
                    <div class="p-2">
                        Oops. You don't have anything in your cart. Please add some. 
                    </div>
                    <nuxt-link to="/" class="px-4 py-2 bg-green-800 text-white rounded-full mt-5">
                        Add items
                    </nuxt-link>
                </div>

                <nuxt-link to="/" class="px-4 py-2 bg-green-800 text-white rounded-full" v-if="(cart.length > 0)">
                    + more items
                </nuxt-link>



            </center>

            <div class="bg-green-800 text-white p-3 flex items-center justify-between fixed bottom-0 w-full">
                <div @click="placeOrder" class="cursor-pointer text-lg px-5 py-3 bg-green-900 rounded-full">
                    Place order
                </div>
 
                <nuxt-link to="/cart" class="flex items-center gap-2">
                    <div>Rs. </div>
                    <div class="text-3xl"> {{ cart?.map((item) => item.count * item.price)?.reduce((a, b) => (a + b), 0)
                    }}
                    </div>
                </nuxt-link>
            </div>
        </div>


    </div>

</template>

<script>
export default {
    data() {
        return {
            food_items: false,
            cart: this.$store.state.fix.cart,
        }
    },
    mounted(){
        this.checkUser();
    },  

    methods: {
        checkUser(){
            let user = this.$store.state.fix.user_details;
            console.log('any user-->',user);
            if(!user.user_id){
                this.$router.push('/login');
            }
        },

        async placeOrder(){
            console.log("cart data",this.cart);
            let user = this.$store.state.fix.user_details.user_id;
            let canteen = this.$store.state.fix.user_details.canteen_id;
            console.log('user', user)
            var bill = {}
            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: '{"filter":{"user":"'+ user +'", "status":false}}'
                };
            await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/bill/query', options)
            .then(response => response.json())
            .then(response => {
                console.log('Fetching current bill');
                bill = response?.records;
            }).catch(err => console.error(err));

            if(bill?.length == 0){
                const opt = {
                    method: 'POST',
                    headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                    body: '{"status":false,"canteen":"'+canteen+'","total_price":0,"payment_date":"2000-01-01T00:00:00Z","user":"'+user+'"}'
                    };

                await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/bill/data?columns=id', opt)
                .then(response => response.json())
                .then(response => {
                    console.log('Creating new bill record')
                    bill = response?.records;
                })
                .catch(err => console.error(err));
            }
            let total_price = bill[0]?.total_price||0;
            console.log('fetching bill -->',bill)
            for(let items in this.cart){
                console.log(this.cart[items]);
                total_price = total_price + (this.cart[items]?.count* this.cart[items]?.price);
                var d = new Date();
                var opt2 = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: '{"user":"'+user+'","food":"'+this.cart[items].id+'","bill_no":"'+bill[0].id+'","txn_date":"'+d.toISOString()+'","quantity":'+this.cart[items]?.count+',"amount":'+(this.cart[items]?.count* this.cart[items]?.price)+'}'
                };

                await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/transaction/data?columns=id', opt2)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));

                var opt3 = {
                    method: 'PATCH',
                    headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                    body: '{"total_price":'+total_price+'}'
                    };

                await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/bill/data/'+bill[0].id+'?columns=id', opt3)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));

            }
            alert('Order Placed successfully');
            this.$store.commit('fix/clear_cart');
            this.$router.push('/');
           
        }
    }

}
</script>
