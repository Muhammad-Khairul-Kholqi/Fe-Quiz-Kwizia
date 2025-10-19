<template>
    <div class="w-full" ref="dropdownContainer">
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="relative">
            <button @click="toggleDropdown" type="button" :disabled="disabled"
                class="w-full px-4 py-2.5 text-sm text-left border border-gray-300 rounded-lg outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-between cursor-pointer"
                :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500': error,
                    'bg-white hover:bg-gray-50': !disabled && !isOpen,
                    'bg-gray-50': isOpen
                }">
                <span :class="{ 'text-gray-400': !selectedLabel, 'text-gray-900': selectedLabel }">
                    {{ selectedLabel || placeholder }}
                </span>

                <ChevronDown :size="20" class="text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': isOpen }" />
            </button>

            <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="isOpen"
                    class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                    <div class="max-h-60 overflow-auto">
                        <div v-if="searchable" class="sticky top-0 bg-white p-2">
                            <div class="relative">
                                <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search..."
                                    class="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md outline-none"
                                    @click.stop />
                            </div>
                        </div>

                        <div class="py-1">
                            <div v-if="filteredOptions.length === 0"
                                class="px-4 py-3 text-sm text-gray-500 text-center">
                                {{ emptyText }}
                            </div>

                            <button v-for="option in filteredOptions" :key="getOptionValue(option)"
                                @click="selectOption(option)" type="button"
                                class="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-100 transition-colors flex items-center justify-between cursor-pointer rounded-md"
                                :class="{
                                    'bg-blue-50 text-blue-700': isSelected(option),
                                    'text-gray-900': !isSelected(option)
                                }">
                                <span>{{ getOptionLabel(option) }}</span>
                                <Check v-if="isSelected(option)" :size="18" class="text-blue-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        <p v-if="hint && !error" class="mt-2 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { ChevronDown, Search, Check } from 'lucide-vue-next';

const props = defineProps({
    modelValue: {
        type: [String, Number, Object, null],
        default: null
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Select an option...'
    },
    options: {
        type: Array,
        required: true,
    },
    optionLabel: {
        type: String,
        default: 'label'
    },
    optionValue: {
        type: String,
        default: 'value'
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    searchable: {
        type: Boolean,
        default: true
    },
    error: {
        type: String,
        default: ''
    },
    hint: {
        type: String,
        default: ''
    },
    emptyText: {
        type: String,
        default: 'No options found'
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const dropdownContainer = ref(null);

const selectedLabel = computed(() => {
    if (!props.modelValue) return '';

    const option = props.options.find(opt => {
        const optValue = getOptionValue(opt);
        return optValue === props.modelValue;
    });

    return option ? getOptionLabel(option) : '';
});

const filteredOptions = computed(() => {
    if (!props.searchable || !searchQuery.value) {
        return props.options;
    }

    const query = searchQuery.value.toLowerCase();
    return props.options.filter(option => {
        const label = getOptionLabel(option).toLowerCase();
        return label.includes(query);
    });
});

const getOptionLabel = (option) => {
    if (typeof option === 'string' || typeof option === 'number') {
        return option.toString();
    }
    return option[props.optionLabel] || '';
};

const getOptionValue = (option) => {
    if (typeof option === 'string' || typeof option === 'number') {
        return option;
    }
    return option[props.optionValue];
};

const isSelected = (option) => {
    const optValue = getOptionValue(option);
    return optValue === props.modelValue;
};

const toggleDropdown = () => {
    if (props.disabled) return;

    isOpen.value = !isOpen.value;

    if (isOpen.value && props.searchable) {
        nextTick(() => {
            searchInput.value?.focus();
        });
    }
};

const selectOption = (option) => {
    const value = getOptionValue(option);
    emit('update:modelValue', value);
    emit('change', value);
    closeDropdown();
};

const closeDropdown = () => {
    isOpen.value = false;
    searchQuery.value = '';
};

const handleClickOutside = (event) => {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

watch(() => props.disabled, (newValue) => {
    if (newValue && isOpen.value) {
        closeDropdown();
    }
});
</script>

<style scoped>
.max-h-60::-webkit-scrollbar {
    width: 6px;
}

.max-h-60::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>