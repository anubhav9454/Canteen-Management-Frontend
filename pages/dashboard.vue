<template>
  <div> 
    <user-header :name="user.title" :cartLength="cart.length"></user-header>

    <div>
      <div class="p-3 font-semibold bg-green-50 text-center">All Orders</div>
      <div v-for="(item,index) in transactions" :key="index" class="flex justify-between items-center px-5 py-2 m-2 border-b">
        <div>
            <div class="font-semibold text-xl">
                {{ item.food.name }}
            </div>

            <div class="text-xs text-gray-400">
                Date: {{ (new Date(item.txn_date)).toDateString() }}
            </div>
        </div>

        <div>
          ₹{{ item.amount}}
        </div>
        
      </div> 
    </div>

    <div class="bg-green-800 text-white p-3 flex items-center justify-between fixed bottom-0 w-full">
      <div @click="logout" class="text-lg px-5 py-3 bg-green-900 rounded-full cursor-pointer">
          Logout
      </div>

      <div class="flex flex-col items-center">
        <div v-text="('₹'+bill?.total_price||0)" class="text-3xl">
        </div>
        <div class="text-xs">Pending Amount</div>
      </div>
      
      <nuxt-link to="/" class="flex items-center gap-2">
        <div class="text-lg px-5 py-3 bg-green-900 rounded-full cursor-pointer">
          Home
      </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      cart: this.$store.state.fix.cart,
      user: this.$store.state.fix.user_details,
      bill:'',
      transactions:'',
    }
  },
  mounted(){
    this.checkUser();
    this.fetch_data();
    
  },
  methods: {
    checkUser(){
        let user = this.$store.state.fix.user_details;
        console.log('any user-->',user);
        if(!user.user_id){
            this.$router.push('/login');
        }
    },
    async fetch_data(){
      const options = {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
          body: '{"filter":{"user":"'+ this.user.user_id +'", "status":false}}'
          };
      await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/bill/query', options)
      .then(response => response.json())
      .then(response => {
          console.log('Fetching current bill');
          this.bill = response?.records[0]||{};
      }).catch(err => console.error(err));

      const opt = {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
          body: '{"columns":["food.name", "txn_date", "quantity", "amount"],"filter":{"bill_no":"'+ this.bill.id +'"},"sort":{"txn_date":"desc"}}'
          };
      await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/transaction/query', opt)
      .then(response => response.json())
      .then(response => {
          console.log('Fetching all transactions', response );
          this.transactions = response?.records;
          console.log(this.transactions)
      }).catch(err => console.error(err));
    },  

    // async fetch_transaction(){
    //   console.log("billl",this.bill)
    //   const opt = {
    //       method: 'POST',
    //       headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
    //       body: '{"filter":{"bill_no":"'+ this.bill.id +'"}}'
    //       };
    //   await fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/transaction/query', opt)
    //   .then(response => response.json())
    //   .then(response => {
    //       console.log('Fetching all transactions', response );
    //       this.transactions = response?.records;
    //       console.log(this.transactions)
    //   }).catch(err => console.error(err));
    // },
    logout(){
        let check = confirm('Do you want to logout?');
        if(!check){return}
        this.$store.commit('fix/logout');
        window.location.reload();
    }

  }
}

</script>