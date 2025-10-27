<template>
    <div>
        <WelcomeScreen v-if="!quizStarted && !quizFinished" :quiz-data="quizData" :is-loading="isLoading"
            @start="handleStart" @cancel="handleCancel" />

        <QuizScreen v-if="quizStarted && !quizFinished" :quiz-data="quizData" :started-at="startedAt"
            @finish="handleFinish" @terminate="handleTerminate" />

        <EndScreen v-if="quizFinished" :result-data="resultData" @restart="handleRestart" @back="handleCancel" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import WelcomeScreen from '../../../components/sections/ScreenQuiz/WelcomeScreen.vue';
import QuizScreen from '../../../components/sections/ScreenQuiz/QuizScreen.vue';
import EndScreen from '../../../components/sections/ScreenQuiz/EndScreen.vue';
import { getQuizForPlay, submitQuizAnswers } from '../../../api/quizApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const quizStarted = ref(false);
const quizFinished = ref(false);
const quizData = ref(null);
const resultData = ref(null);
const isLoading = ref(false);
const startedAt = ref(null);

const fetchQuizData = async () => {
    try {
        isLoading.value = true;
        const quizId = route.params.id;
        const response = await getQuizForPlay(quizId);

        if (response.success && response.data) {
            quizData.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load quiz. Redirecting...',
            confirmButtonColor: '#3b82f6'
        }).then(() => {
            router.push('/app/quiz');
        });
    } finally {
        isLoading.value = false;
    }
};

const handleStart = () => {
    quizStarted.value = true;
    quizFinished.value = false;
    startedAt.value = new Date().toISOString();
};

const handleCancel = () => {
    router.push('/app/quiz');
};

const handleRestart = () => {
    quizStarted.value = false;
    quizFinished.value = false;
    resultData.value = null;
    startedAt.value = null;
    fetchQuizData();
};

const handleFinish = async (answers) => {
    try {
        const formattedAnswers = Object.keys(answers).map(questionIndex => {
            const question = quizData.value.questions[questionIndex];
            const answerIndex = answers[questionIndex];
            const answerLetter = ['A', 'B', 'C', 'D'][answerIndex];

            return {
                question_id: question.id,
                answer: answerLetter
            };
        });

        const response = await submitQuizAnswers(
            quizData.value.id,
            formattedAnswers,
            startedAt.value
        );

        if (response.success && response.data) {
            resultData.value = response.data;
            quizStarted.value = false;
            quizFinished.value = true;

            if (response.data.is_perfect) {
                Swal.fire({
                    icon: 'success',
                    title: 'Perfect Score!',
                    text: response.message,
                    confirmButtonColor: '#3b82f6'
                });
            }
        }
    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
};

const handleTerminate = () => {
    Swal.fire({
        icon: 'error',
        title: 'Quiz Terminated!',
        text: 'You violated the quiz rules. The quiz has been terminated.',
        confirmButtonColor: '#ef4444',
        allowOutsideClick: false
    }).then(() => {
        router.push('/app/quiz');
    });
};

onMounted(() => {
    fetchQuizData();
});
</script>