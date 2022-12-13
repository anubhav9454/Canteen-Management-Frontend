<template>
  <div>
    <user-header :name="this.$store.state.fix.user_details.title" :cartLength="cart.length" />

    <div class="flex flex-col gap-3 p-3">
      <nuxt-link :to="'catalog?c=' + x.id" v-for="x in navs" :key="x.id"
        class="py-3 px-5 bg-green-200 border border-green-600 rounded-xl shadow-md text-center text-xl">
        {{ x.type }}
      </nuxt-link>
    </div>


    <div class="bg-green-800 text-white p-3 flex items-center justify-between fixed bottom-0 w-full">
      <nuxt-link to="/cart" class="text-lg px-5 py-3 bg-green-900 rounded-full cursor-pointer">
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
      api_key: this.$store.state.fix.api_key,
      blocks: ['Lunch', 'C', 'Snacks'],
      navs: [],
      cart: this.$store.state.fix.cart,
    }
  },

  mounted() {
    this.test()
  },

  methods: {
    test() {
      if(this.$store.state.fix.user_details.username == ''){
        this.$router.push('/login');
      }
      console.log(this.$store.state.fix.api_key)

      const options = {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + this.api_key, 'Content-Type': 'application/json' },
        body: '{"page":{"size":50}}'
      };

      fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/catalog/query', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          this.navs = response.records
        })
        .catch(err => console.error(err));
    },
    logout(){
      let check = confirm('Do you want to logout?');
      if(!check){return}
      this.$store.commit('fix/logout');
      window.location.reload();
    }
  }
}
</script>
