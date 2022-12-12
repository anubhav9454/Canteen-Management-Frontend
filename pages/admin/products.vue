<template>
    <div>
        <Adminheader />

        <div class="bg-green-800 p-3 text-xl text-center text-white">
            Manage Catalog
        </div>

        <div class="grid grid-cols-12 p-3 gap-2">
            <div class="col-span-9 rounded-xl">
                <div class="overflow-x-auto relative">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Price
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Catalog Type
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row"
                                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ product.name }}
                                </th>
                                <td class="py-4 px-6">
                                    {{ product.foot_catalog.type }}
                                </td>
                                <td class="py-4 px-6">
                                    Rs. {{ product.price }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="col-span-3 rounded-xl p-6 border rounded-xl">

                <form>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Enter Catalog Title
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
                        <!-- <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Enter Catalog Title
                        </label> -->
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
        </div>


        <div class="px-4 py-6">
            <div class="overflow-x-auto relative">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Product name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Color
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Category
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="py-4 px-6">
                                Sliver
                            </td>
                            <td class="py-4 px-6">
                                Laptop
                            </td>
                            <td class="py-4 px-6">
                                $2999
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td class="py-4 px-6">
                                White
                            </td>
                            <td class="py-4 px-6">
                                Laptop PC
                            </td>
                            <td class="py-4 px-6">
                                $1999
                            </td>
                        </tr>
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td class="py-4 px-6">
                                Black
                            </td>
                            <td class="py-4 px-6">
                                Accessories
                            </td>
                            <td class="py-4 px-6">
                                $99
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
</template>

<script>
export default {
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.checkUser();
        this.load_products()
    },
    methods: {
        checkUser() {
            if (!this.title) {
                this.$router.push('/admin/login')
            }
        },
        load_products() {
            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: '{"columns":["*","canteen_id.*","foot_catalog.*"],"filter":{"foot_catalog.id":"rec_ce2bmmams8ltffmgsbtg"},"page":{"size":15}}'
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/food/query', options)
                .then(response => response.json())
                .then(response => {
                    this.products = response.records
                    })
                .catch(err => console.error(err));
        }
    }

}
</script>