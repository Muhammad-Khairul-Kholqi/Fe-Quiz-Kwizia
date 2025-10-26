<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <div>
                <div class="flex flex-col lg:flex-row gap-5">
                    <div class="w-full lg:w-[25%]">
                        <FilterSection :open-dropdown="openDropdown" :selected-subject="selectedSubject"
                            :selected-questions="selectedQuestions" :active-filters="activeFilters"
                            :show-filter-modal="showFilterModal" :categories="categories"
                            @toggle-dropdown="toggleDropdown" @select-option="selectOption"
                            @remove-filter="removeFilter" @update:show-filter-modal="showFilterModal = $event" />
                    </div>

                    <div class="w-full lg:w-[45%]">
                        <QuizzesSection :search-query="searchQuery" :selected-sort="selectedSort"
                            :filtered-quizzes="filteredQuizzes" :open-dropdown="openDropdown" :is-loading="isLoading"
                            @toggle-dropdown="toggleDropdown" @select-sort="selectSort"
                            @update:search-query="searchQuery = $event" @show-filter-modal="showFilterModal = true"
                            @play-quiz="handlePlayQuiz" />
                    </div>

                    <div class="hidden lg:block lg:w-[30%]">
                        <PopularSection :popular-quizzes="popularQuizzes" @play-quiz="handlePlayQuiz" />
                    </div>
                </div>

                <div class="lg:hidden mt-5">
                    <PopularSection :popular-quizzes="popularQuizzes" @play-quiz="handlePlayQuiz" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import FilterSection from "../../../components/sections/quiz/FilterSection.vue";
import PopularSection from "../../../components/sections/quiz/PopularSection.vue";
import QuizzesSection from "../../../components/sections/quiz/QuizzesSection.vue";
import { getAllQuizzes } from "../../../api/quizApi";
import { getCategoryQuiz } from "../../../api/categoryQuizApi";

const router = useRouter();

const openDropdown = ref(null);
const selectedSubject = ref("");
const selectedQuestions = ref("");
const showFilterModal = ref(false);
const searchQuery = ref("");
const selectedSort = ref("Latest");
const isLoading = ref(false);

const quizzes = ref([]);
const categories = ref([]);

watch(showFilterModal, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const fetchQuizzes = async () => {
    try {
        isLoading.value = true;
        const response = await getAllQuizzes();

        if (response.success && response.data) {
            quizzes.value = response.data.map(quiz => ({
                ...quiz,
                image: quiz.image_cover,
                subject: quiz.category_quiz?.name || 'Uncategorized',
                category_id: quiz.category_id,
                title: quiz.title,
                totalQuestions: quiz.total_questions,
                plays: quiz.total_players || 0,
                time_limit: quiz.time_limit,
                date: new Date(quiz.created_at)
            }));
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    } finally {
        isLoading.value = false;
    }
};

const fetchCategories = async () => {
    try {
        const response = await getCategoryQuiz();

        if (response.success && response.data) {
            categories.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

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

const popularQuizzes = computed(() => {
    return [...quizzes.value]
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 3)
        .map(quiz => ({
            id: quiz.id,
            image: quiz.image,
            subject: quiz.subject,
            title: quiz.title
        }));
});

const handlePlayQuiz = (quizId) => {
    router.push(`/app/quiz-question/${quizId}`);
};

onMounted(() => {
    fetchCategories();
    fetchQuizzes();
});
</script>