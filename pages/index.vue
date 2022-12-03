<template>
  <div>

    <div class="bg-green-800 p-6 text-white flex items-center justify-between">
      <div>
        <div class="tetx-xs">Welcome!</div>
        <div class="text-2xl">{{this.$store.state.fix.user_details.title}}</div>
      </div>

      <nuxt-link to="/cart" class="bg-green-900 flex items-center gap-2 px-4 py-2 rounded-full">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> 
        <span class="text-2xl"> {{ this.$store.state.fix.cart.length }} </span>        
      </nuxt-link >
    </div>

    <div class="flex flex-col gap-3 p-3">
      <nuxt-link :to="'catalog?c=' + x.id" v-for="x in navs" :key="x.id"
        class="py-3 px-5 bg-green-200 border border-green-600 rounded-xl shadow-md text-center text-xl">
        {{ x.type }}
      </nuxt-link>
    </div>


    <div class="bg-green-800 text-white p-3 flex items-center justify-between fixed bottom-0 w-full">
            <div class="text-lg px-5 py-3 bg-green-900 rounded-full">
                Place order
            </div>

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
      navs: []
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

    }
  }
}
</script>
