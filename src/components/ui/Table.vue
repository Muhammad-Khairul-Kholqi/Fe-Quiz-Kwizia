<template>
    <div class="overflow-x-auto w-full">
        <table class="min-w-full overflow-hidden">
            <thead class="bg-gray-100 text-gray-700 text-sm">
                <tr>
                    <th v-for="(col, index) in columns" :key="index" class="p-5 text-left font-semibold">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>

            <tbody v-if="data.length">
                <tr v-for="(row, i) in data" :key="i">
                    <td v-for="(col, j) in columns" :key="j" class="p-5 border-b border-gray-200 text-sm text-gray-800">
                        <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="i">
                            {{ row[col.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr>
                    <td :colspan="columns.length" class="text-center py-6 text-gray-500">
                        Tidak ada data.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        default: () => [],
    },
})
</script>
