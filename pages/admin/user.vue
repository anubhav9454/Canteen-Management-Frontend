<template>
    <div>
        <Adminheader />

        <div class="bg-green-800 p-3 text-xl text-center text-white">
            <div class="pb-3">
                Manage Customers
            </div>
        </div>

        
            <div class="text-2xl px-6 py-3 font-semibold text-green-800">users </div>
            <div class="grid grid-cols-12 p-3 gap-2">
                <div class="col-span-12 rounded-xl">
                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Username
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Password
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in users" :key="product.id"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                                        <div
                                            :class="product.is_active ? 'w-2 h-2 rounded bg-green-600' : 'w-2 h-2 rounded bg-red-600'">
                                        </div>
                                        {{ product.name }}
                                    </th>
                                    <td class="py-4 px-6">
                                        {{ product.foot_catalog.type }}
                                    </td>
                                    <td class="py-4 px-6">
                                        Rs. {{ product.price }}
                                    </td>

                                    <td class="py-4 px-6 flex items-center gap-3">
                                        <div @click="delete_product(product?.id)">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                        </div>

                                        <div @click="edit_product(product)">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                </path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>

                                <tr class="bg-green-100 border-b">
                                    <th scope="row"
                                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <input type="text"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                            placeholder="Name" v-model="new_item.name" required>
                                    </th>

                                    <td class="py-4 px-6">
                                        <select name="food_types" v-model="new_item.foot_catalog"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                                            <option v-for="food in food_types" :key="food.id" :value="food.id"> {{ food.type
                                            }}</option>
                                        </select>
                                    </td>
                                    <td class="py-4 px-6">
                                        <input
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                            placeholder="Price" v-model="new_item.price" type="number" required>
                                    </td>

                                    <td class="py-4 px-6">
                                        <button type="submit" @click="add_product()"
                                            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-span-3 rounded-xl p-6 border rounded-xl hidden">
                    <form>
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Enter Catalog Type
                            </label>
                            <input type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder="fruits" required>
                        </div>


                        <div class="flex items-center justify-between select-none">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value=""
                                    class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                                    required>
                                <label for="remember"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                            </div>

                            <div>
                                <button type="submit"
                                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                            </div>

                        </div>



                    </form>

                    <form>
                        <div class="mb-6 flex flex-col gap-2">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Enter Catalog Title
                            </label>
                            <input type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder="fruits" required>

                            <input type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder="type" required>

                            <input type="number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder="price" required>
                        </div>


                        <div class="flex items-center justify-between select-none">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value=""
                                    class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                                    required>
                                <label for="remember"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                            </div>

                            <div>
                                <button type="submit"
                                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                            </div>

                        </div>



                    </form>

                </div>
                <!-- this is modal now  -->
                <div v-show="showing_modal" class="relative z-10 select-none" aria-labelledby="modal-title" role="dialog"
                    aria-modal="true">
                    <div class="fixed inset-0 bg-green-800 bg-opacity-75 transition-opacity"></div>

                    <div class="fixed inset-0 z-10 overflow-y-auto ">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div
                                class="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div class="">
                                        <div class="mt-3 p-3 text-left ">
                                            <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Update
                                                Product</h3>
                                            <div class="mt-2">
                                                <div class="mb-6">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Name </label>
                                                    <input type="text"
                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 w-full"
                                                        placeholder="Name" v-model="edit_item.name">
                                                </div>

                                                <div class="mb-6">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Type
                                                    </label>
                                                    <select name="food_types" v-model="edit_item.foot_catalog"
                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                                                        <option v-for="food in food_types" :key="food.id" :value="food.id">
                                                            {{
                                                                    food.type
                                                            }}
                                                        </option>
                                                    </select>
                                                </div>

                                                <div class="mb-6">
                                                    <label
                                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                    <input
                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                                        v-model="edit_item.price" type="number">
                                                </div>
                                                <div class="flex items-start mb-6">
                                                    <div class="flex items-center h-5">
                                                        <input id="remember" type="checkbox" value=""
                                                            v-model="edit_item.is_active"
                                                            class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
                                                    </div>
                                                    <label for="remember"
                                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Available</label>
                                                </div>
                                                <!-- 
                                                    <button type="button" @click="update_product()"
                                                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                                                -->

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" @click="update_product()"
                                        class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Update</button>
                                    <button type="button" @click="showing_modal = false"
                                        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
            showing_modal: false,
            food_types: [],
            new_item: {
                name: '',
                canteen_id: this.$store.state.admin.login_details.canteen_id,
                foot_catalog: '',
                price: 0.0,
                is_active: true
            },
            edit_item: {
                id: '',
                name: '',
                canteen_id: this.$store.state.admin.login_details.canteen_id,
                foot_catalog: '',
                price: '',
                is_active: true
            },

            types_tables : [],
            new_type : ''
        }
    },
    mounted() {
        this.checkUser();
        this.load_users();
        this.load_types();

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
                    this.users = response.records
                })
                .catch(err => console.error(err));            
        },
        delete_product(x) {
            console.log('delete ', x)

            if (confirm('Do you really want to delete this product ?')) {
                // alert('record deleted')

                const options = {
                    method: 'DELETE',
                    headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                };

                fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/food/data/' + x + '?columns=id', options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        this.load_users()
                    })
                    .catch(err => console.error(err));

            } else {
                // alert('operation cancelled.')
            }

        },
        add_product() {
            console.log(this.new_item)
            this.new_item.price = parseFloat(this.new_item.price)

            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: JSON.stringify(this.new_item)
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/food/data?columns=id', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.load_users()
                    this.new_item = {
                        name: '',
                        canteen_id: this.$store.state.admin.login_details.canteen_id,
                        foot_catalog: '',
                        price: 0.0,
                        is_active: true
                    }
                })
                .catch(err => console.error(err));
        },
        edit_product(t) {
            console.clear()
            this.edit_item.canteen_id = t.canteen_id.id
            this.edit_item.foot_catalog = t.foot_catalog.id
            this.edit_item.name = t.name
            this.edit_item.id = t.id
            this.edit_item.is_active = t.is_active
            this.edit_item.price = t.price

            console.log(this.edit_item)
            this.showing_modal = true
        },
        update_product() {
            var id = this.edit_item.id
            delete this.edit_item.id

            this.edit_item.price = parseFloat(this.edit_item.price)

            const options = {
                method: 'PATCH',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: JSON.stringify(this.edit_item)
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/food/data/' + id + '?columns=id', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.showing_modal = false
                    // alert('Successfully updated.')
                    this.load_users()
                })
                .catch(err => console.error(err));
        },
        load_types(){
            const options = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
            body: '{"page":{"size":200}}'
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/catalog/query', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.types_tables = response.records
            })
            .catch(err => console.error(err));
        },
        save_new_type(){            
            const options = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
            body: JSON.stringify({"type": this.new_type })
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/catalog/data?columns=id', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.load_types()
                this.new_type = ''
            })
            .catch(err => console.error(err));
        }
    }

}
</script>