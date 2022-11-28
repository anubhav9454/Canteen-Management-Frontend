<template>
  <div>
    <div class="p-6 text-center font-semibold text-3xl">
      This is live now again. {{ api_key }}
    </div>
    <div class="flex flex-col gap-3 p-3">
      <nuxt-link :to="'catalog?c=' + x.id" v-for="x in navs" :key="x.id"
        class="py-3 px-5 bg-green-200 border border-green-600 rounded-xl shadow-md text-center text-xl">
        {{ x.type }}        
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
