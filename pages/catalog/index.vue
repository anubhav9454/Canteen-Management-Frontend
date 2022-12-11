<template>
    <div class="relative">
        <div class="bg-green-800 px-5 py-3 text-white ">
            <nuxt-link to="/">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18">
                    </path>
                </svg>
            </nuxt-link>

            <div class="flex items-center justify-between py-2" v-if="food_items">
                <div class="text-3xl text-center">
                    {{ food_items[0].foot_catalog.type }}
                </div>

                <div>
                    {{ food_items.length }} items
                </div>
            </div>

        </div>
        <div class="flex flex-col gap-3 p-6" v-if="food_items">
            <div v-for="m in food_items" :key="m.id" class="flex items-center justify-between">
                <div>
                    <div class="font-semibold text-xl">
                        {{ m.name }}
                    </div>

                    <div class="text-xs text-gray-400">
                        Rs. {{ m.price }} - {{ m.count }}
                    </div>
                </div>

                <div class="flex items-center gap-2 text-xs bg-green-800 rounded-full px-2 py-1 text-white"
                    v-if="!(cart[cart.map(x => x.id).indexOf(m.id)])" @click="add_c(m)">
                    add to cart
                </div>

                <div class="flex items-center gap-2 text-2xl"
                    v-if="(cart[cart.map(x => x.id).indexOf(m.id)]?.count >= 1)">
                    <div @click="add_c(m)"> + </div>
                    <div class="text-center min-w-5">
                        {{ cart[cart.map(x => x.id).indexOf(m.id)]?.count }}
                    </div>

                    <div @click="sub_c(m)"> - </div>
                </div>

            </div>
        </div>

        <div class="bg-green-800 text-white p-3 flex items-center justify-between fixed bottom-0 w-full">
            <nuxt-link to="/cart"  class="text-lg px-5 py-3 bg-green-900 rounded-full">
                Place order
            </nuxt-link>

            <nuxt-link to="/cart" class="flex items-center gap-2">
                <div>Rs. </div>
                <div class="text-3xl"> {{ cart?.map((item) => item.count * item.price)?.reduce((a, b) => (a + b), 0) }}
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            food_items: false,
            items: [],
            cart: this.$store.state.fix.cart,
        }
    },

    mounted() {
        this.fetch_details()
    },
    methods: {
        // fetching details from api
        fetch_details() {
            const self = this
            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: '{"columns":["*","canteen_id.*","foot_catalog.*"],"filter":{"foot_catalog.id":"' + this.$route.query.c + '"},"page":{"size":15}}'
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/food/query', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response.records)
                    this.food_items = [...response.records]

                    if (response.records.length == 0) {
                        alert('no food added so far.')
                        self.$router.push('/')
                    }
                })
                .catch(err => console.error(err));
        },

        go_to_cart() {
            this.$router.push("/cart")
        },

        add_c(x) {
            this.$store.commit('fix/add_to_cart', x)
            console.log(x)
        },
        sub_c(x) {
            this.$store.commit('fix/remove_from_cart', x)
            console.log(x)
        }
    }
}
</script>