<template>
    <div>
        <div class="flex flex-col gap-3 p-3" v-if="this.food_items">
            <div v-for="m in food_items" :key="m.id" class="">
                {{ m.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            'food_items': false,
        }
    },

    mounted() {
        this.fetch_details()
    },
    methods: {
        fetch_details() {
            const options = {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + this.$store.state.fix.api_key, 'Content-Type': 'application/json' },
                body: '{"columns":["*","canteen_id.*","foot_catalog.*"],"filter":{"foot_catalog.id":"' + this.$route.query.c + '"},"page":{"size":15}}'
            };

            fetch('https://manupal-choudhary-s-workspace-bakboi.us-east-1.xata.sh/db/c_canteen:main/tables/food/query', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response.records)
                    this.food_items = response.records

                    if (response.records.length == 0) {
                        alert('no food added so far.')
                    }
                })
                .catch(err => console.error(err));
        }
    }

}
</script>