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
                <div class="text-lg px-5 py-3 bg-green-900 rounded-full">
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
            cart: this.$store.state.fix.cart
        }
    },

    methods: {
        fetch_details(itemId) {
            console.log('asd')
        }
    }

}
</script>
