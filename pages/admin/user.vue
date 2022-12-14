<template>
    <div>
        <Adminheader />

        <div class="bg-green-800 p-3 text-xl text-center text-white">
            <div class="pb-3">
                Manage Customers
            </div>
        </div>
        <div class="text-2xl px-6 py-3 font-semibold text-green-800"> Users </div>
            <div class="grid grid-cols-12 p-3 gap-2">
                <div class="col-span-12 rounded-xl">
                    <div class="overflow-x-auto relative">                                                
                        <div class="overflow-x-auto relative">
                            <form @submit.prevent="post_user(x)">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="py-3 px-6">
                                            Title
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Username
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Password
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Status
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="x in users" :key="x.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">                                        
                                        <td class="py-4 px-6 font-semibold">
                                            {{ x.name }}
                                        </td>
                                        <td class="py-4 px-6">
                                            {{ x.username }}
                                        </td>
                                        <td class="py-4 px-6">
                                            {{ x.password }}
                                        </td>
                                        <td class="py-4 px-6">
                                            <div v-if="x.is_active" class="flex items-center gap-2 text-green-600">
                                                <div class="h-2 w-2 bg-green-600 rounded-full animate-pulse"> </div> Active
                                            </div>                                            
                                            <div v-if="!x.is_active" class="flex items-center gap-2 text-red-600">
                                                <div class="h-2 w-2 bg-red-600 rounded-full animate-pulse"> </div> Inactive
                                            </div>                                            
                                        </td>
                                        <td class="py-4 px-6 flex items-center gap-3">
                                            <button type="button" @click="delete_user(x.id)" class="text-red-600">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                            <button type="button" :class="x.is_active ? 'text-red-500' : 'text-green-500'" @click="change_status(x)">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                            </button>                                            
                                        </td>
                                    </tr>  
                                    
                                
                                    <tr class="bg-green-50 border-b dark:bg-gray-800 dark:border-gray-700 ">                                        
                                        <td class="py-4 px-6 font-semibold">
                                            <input type="text" v-model="x.name" placeholder="Title" class="px-4 py-2 border outline-none rounded-md" required>
                                        </td>
                                        <td class="py-4 px-6">
                                            <input type="text" v-model="x.username" placeholder="Username" class="px-4 py-2 border outline-none rounded-md" required>
                                        </td>
                                        <td class="py-4 px-6">
                                            <input type="text" v-model="x.password" placeholder="Password" class="px-4 py-2 border outline-none rounded-md" required>
                                        </td>
                                        <td class="py-4 px-6">
                                            <select v-model="x.is_active"  class="px-4 py-2 border outline-none rounded-md">
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>                                                
                                            </select>                                           
                                        </td>
                                        <td class="py-4 px-6">
                                            <button type="submit" class="bg-green-800 text-white px-4 py-2 rounded-md">Save</button>
                                        </td>                                    
                                    </tr>                                  
                                </tbody>
                            </table>
                        </form>
                        </div>
                    </div>
                </div>
                <div class="col-span-3 rounded-xl p-6 border rounded-xl hidden">
                    asdasdasdas asdasdasd
                </div>
                
            </div>
        
        </div>
</template>

<script>
export default {
    data() {
        return {            
            user_data: this.$store.state.admin.login_details,
            users: [],
            x : {},
        }
    },
    mounted() {
        this.checkUser();
        this.load_users();
    },
    methods: {
        checkUser() {
            console.clear()
            if (!this.user_data.title) {
                this.$router.push('/admin/login')
            }
        },
        load_users() {
            // fethcing all users
            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },                
                body: '{"columns":["*","canteen_id.*"],"filter":{"canteen_id.id":"'+ this.$store.state.admin.login_details.canteen_id  +'"}, "page":{"size":200}}'
            };

                fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/users/query', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response.records)
                    this.users = response.records
                })
                .catch(err => console.error(err));            
        },
        post_user(x){
            // create a new user 
            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },                
                body: JSON.stringify({
                        "username": x.username,
                        "password": x.password,
                        "canteen_id": this.$store.state.admin.login_details.canteen_id,
                        "name": x.name,
                        "is_active": (x.is_active === 'true') ? true : false
                    })
                };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/users/data?columns=id', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.load_users()
                x = {}
            })
            .catch(err => console.error(err));
        },
        delete_user(x){
            const options = {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                };

                fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/users/data/'+ x +'?columns=id', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.load_users()
                })
                .catch(err => console.error(err));                
        },
        change_status(x){
            console.clear()
            console.log(x.is_active, JSON.stringify({"is_active": (x.is_active === 'true') ? true : false }))            

            const options = {
                method: 'PATCH',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: JSON.stringify({"is_active": (x.is_active) ? false : true })
                };

                fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/users/data/'+ x.id +'?columns=id', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.load_users()
                })
                .catch(err => console.error(err));
        }
    }

}
</script>