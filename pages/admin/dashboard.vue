<template>
    <div>
        <Adminheader />
        <div class="p-6 bg-green-800">
            <div class="grid grid-cols-3 gap-8 justify-between p-3">
                <div class="bg-white p-4 rounded-xl">                    
                    <div class="text-xl font-semibold text-green-900 text-center py-2">
                        Today's Orders
                    </div>                                        
                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Item
                                    </th>
                                    <th scope="col" class=" text-center py-3 px-6">
                                        Order By
                                    </th>
                                    <th scope="col" class="text-center py-3 px-6">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item,index) in today_orders" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="flex flex-col justify-left py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div class="text-lg font-semibold">{{item.food?.name}}</div>
                                        <div class="text-sm font-extralight ">Qty. {{item.quantity}}</div>
                                    </th>
                                    <td class="py-4 px-6">
                                        {{item.user.name}}
                                    </td>
                                    <td class="py-4 px-6 text-center">
                                        ₹{{item.food.price}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="bg-white p-4 rounded-xl">                    
                    <div class="text-xl font-semibold text-green-900 text-center py-2">
                        Pending Bills
                    </div>                                        
                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Customer
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Pending Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in bills.filter((i)=>!i.status)" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{item.user?.name}}
                                    </th>
                                    <td class="py-4 px-6 text-center">
                                        ₹{{item.total_price}}
                                    </td>
                                </tr>

                                <tr class="bg-white border-b bg-gray-200 dark:bg-gray-800 dark:border-gray-700 font-bold">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Total Amount Pending 
                                    </th>
                                    <td class="py-4 px-6 text-center animate-pulse text-red-400 text-xl">
                                        ₹{{ bills.filter((i)=>!i.status).reduce((a,b)=>{return a+b.total_price}, 0) }}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="h-full">
                    <div class="text-2xl font-semibold text-white text-center py-4 ">
                        Gateway to links
                    </div>
                    <div class="text-center flex flex-col h-full gap-4 ">
                        <nuxt-link to="/admin/products" class="h-1/3 inline-flex justify-center items-center px-4 py-2 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">                            
                            <span class="w-full text-2xl"> Products </span>
                            <svg aria-hidden="true" class="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </nuxt-link> 
                        <nuxt-link to="/admin/user" class="h-1/3 inline-flex justify-center items-center px-4 py-2 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="w-full text-2xl"> User </span>
                            <svg aria-hidden="true" class="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </nuxt-link>                                                                         
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-6">

            <div class="p-3">
                <div class="text-3xl px-4 py-2">Data at a glance</div>                
            </div>
            <div class="overflow-x-auto relative">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">                        
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Bill ID
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Customer
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Payment Date
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="b in bills" :key="b.key" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ b.id }}
                            </th>
                            <td class="py-4 px-6">
                                {{ b.user.name }}
                            </td>
                            <td class="py-4 px-6">
                                ₹{{ b.total_price }}
                            </td>
                            <td class="py-4 px-6">                                
                                <span v-show="b.status">{{ b.payment_date }}</span>
                                <span v-show="!b.status"> n/a </span>
                            </td>
                            <td class="py-4 px-6">
                                <span v-show="b.status" class="text-green-700 font-semibold"> PAID </span>
                                <span v-show="!b.status" class="text-red-700 font-semibold animate-pulse"> UNPAID </span>
                            </td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>    
    export default {
        data(){
            return {
                ...this.$store.state.admin.login_details,
                today_orders: [],
                pending_bill:[],
                bills : []
            }
        },
        mounted(){
            this.checkUser();
            this.getToday();
            this.all_bills();
        },
        methods: {
            checkUser(){
            if(!this.title){
                this.$router.push('/admin/login')
                }
            },
            getToday(){
                var today = new Date();
                var isoString = today.toISOString();
                var dateOnly = isoString.split('T')[0] + 'T12:00:00.000Z';
                console.log(dateOnly);  // Output: "2022-12-14T12:00:00.000Z"

                let obj = {
                    filter:{
                        txn_date:{
                            "$ge": dateOnly
                        }
                    },
                    columns:[
                        "user.name","food.name", "food.price", "quantity"
                    ],
                }

                const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/transaction/query', options)
                .then(response => response.json())
                .then(response => {
                    console.log('response', response)
                    this.today_orders = response.records
                    // console.log(this.today_orders)
                })
                .catch(err => console.error(err));


            },
            getBill(){
                let obj = {
                    filter:{
                        status:false
                    },
                    columns:[
                        "user.name","total_price"
                    ],
                };

                const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
                };

                fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/bill/query', options)
                    .then(response => response.json())
                    .then(response => {
                        console.log('pending bill -->', response)
                        this.pending_bill = response.records
                        // console.log(this.today_orders)
                    })
                    .catch(err => console.error(err));
                },

            all_bills(){                
                const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: '{"columns":["*","canteen.*","user.*"],"page":{"size":15}}'
                };

                fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/bill/query', options)
                    .then(response => response.json())
                    .then(response => {
                        console.log('all bill -->', response.records)
                        this.bills = response.records                        
                    })
                    .catch(err => console.error(err));
            }
        }

    }
</script>