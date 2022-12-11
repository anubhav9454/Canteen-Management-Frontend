<template>
    <div class="bg-green-800 p-6 text-white flex items-center justify-between">
      <div>
        <div class="tetx-xs">Welcome!</div>
        <nuxt-link to="/dashboard" class="text-2xl cursor-pointer">{{name}}</nuxt-link>
      </div>

      <nuxt-link to="/cart" class="bg-green-900 flex items-center gap-2 px-4 py-2 rounded-full">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> 
        <span class="text-2xl"> {{ cartLength }} </span>        
      </nuxt-link >
    </div>
</template>
<script>

export default {
    name:'UserHeader',
    props: ['cartLength', 'name'],
    methods: {
        logout(){
            let check = confirm('Do you want to logout?');
            if(!check){return}
            this.$store.commit('fix/logout');
            window.location.reload();
        }
    }
}
</script>
