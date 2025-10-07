<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <!-- Container utama dengan grid layout -->
            <div>
                <!-- Baris pertama: Filter dan Quizzes -->
                <div class="flex flex-col lg:flex-row gap-5">
                    <!-- Filter Section - 25% pada lg -->
                    <div class="w-full lg:w-[25%]">
                        <FilterSection :open-dropdown="openDropdown" :selected-subject="selectedSubject"
                            :selected-questions="selectedQuestions" :active-filters="activeFilters"
                            :show-filter-modal="showFilterModal" @toggle-dropdown="toggleDropdown"
                            @select-option="selectOption" @remove-filter="removeFilter"
                            @update:show-filter-modal="showFilterModal = $event" />
                    </div>

                    <!-- Quizzes Section - 50% pada lg -->
                    <div class="w-full lg:w-[45%]">
                        <QuizzesSection :search-query="searchQuery" :selected-sort="selectedSort"
                            :filtered-quizzes="filteredQuizzes" :open-dropdown="openDropdown"
                            @toggle-dropdown="toggleDropdown" @select-sort="selectSort"
                            @update:search-query="searchQuery = $event" @show-filter-modal="showFilterModal = true" />
                    </div>

                    <!-- Popular Section - 25% pada lg (hanya di desktop) -->
                    <div class="hidden lg:block lg:w-[30%]">
                        <PopularSection :popular-quizzes="popularQuizzes" />
                    </div>
                </div>

                <!-- Baris kedua: Popular Section full width pada lg (hanya di mobile) -->
                <div class="lg:hidden mt-5">
                    <PopularSection :popular-quizzes="popularQuizzes" />
                </div>

                <!-- Popular Section full width pada lg -->
                <!-- <div class="hidden lg:block w-full mt-5">
                    <PopularSection :popular-quizzes="popularQuizzes" custom-class="w-full" />
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import FilterSection from "../../../components/sections/quiz/FilterSection.vue";
import PopularSection from "../../../components/sections/quiz/PopularSection.vue";
import QuizzesSection from "../../../components/sections/quiz/QuizzesSection.vue";

const openDropdown = ref(null);
const selectedSubject = ref("");
const selectedQuestions = ref("");
const showFilterModal = ref(false);
const searchQuery = ref("");
const selectedSort = ref("Latest");

const quizzes = ref([
    {
        image: "https://placehold.co/100x100",
        subject: "Science",
        title: "Keanekaragaman Hayati",
        totalQuestions: 5,
        plays: 874,
        date: new Date("2024-03-15")
    },
    {
        image: "https://placehold.co/100x100",
        subject: "Math",
        title: "Aljabar Linear",
        totalQuestions: 10,
        plays: 1245,
        date: new Date("2024-03-20")
    },
    {
        image: "https://placehold.co/100x100",
        subject: "History",
        title: "Sejarah Indonesia",
        totalQuestions: 8,
        plays: 652,
        date: new Date("2024-03-10")
    },
    {
        image: "https://placehold.co/100x100",
        subject: "English",
        title: "Grammar Basics",
        totalQuestions: 15,
        plays: 2103,
        date: new Date("2024-03-25")
    },
    {
        image: "https://placehold.co/100x100",
        subject: "Geography",
        title: "Peta Dunia",
        totalQuestions: 7,
        plays: 489,
        date: new Date("2024-03-18")
    }
]);

const popularQuizzes = ref([
    {
        image: "https://placehold.co/70x70",
        subject: "Science",
        title: "Biologi Molekuler"
    },
    {
        image: "https://placehold.co/70x70",
        subject: "Math",
        title: "Kalkulus Diferensial"
    },
    {
        image: "https://placehold.co/70x70",
        subject: "History",
        title: "Perang Dunia II"
    }
]);

watch(showFilterModal, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const toggleDropdown = (type) => {
    openDropdown.value = openDropdown.value === type ? null : type;
};

const selectOption = (type, value) => {
    if (type === "subject") selectedSubject.value = value;
    if (type === "questions") selectedQuestions.value = value;
    openDropdown.value = null;
};

const selectSort = (option) => {
    selectedSort.value = option;
    openDropdown.value = null;
};

const activeFilters = computed(() => {
    const filters = [];
    if (selectedSubject.value) filters.push(selectedSubject.value);
    if (selectedQuestions.value) filters.push(selectedQuestions.value);
    return filters;
});

const removeFilter = (filter) => {
    if (selectedSubject.value === filter) selectedSubject.value = "";
    if (selectedQuestions.value === filter) selectedQuestions.value = "";
};

const filteredQuizzes = computed(() => {
    let result = [...quizzes.value];

    if (selectedSubject.value) {
        result = result.filter(quiz => quiz.subject === selectedSubject.value);
    }

    if (selectedQuestions.value) {
        const [min, max] = selectedQuestions.value.split(" - ").map(Number);
        result = result.filter(quiz => quiz.totalQuestions >= min && quiz.totalQuestions <= max);
    }

    if (searchQuery.value) {
        result = result.filter(quiz =>
            quiz.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            quiz.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    if (selectedSort.value === "Latest") {
        result.sort((a, b) => b.date - a.date);
    } else if (selectedSort.value === "Popularity") {
        result.sort((a, b) => b.plays - a.plays);
    }

    return result;
});
</script>