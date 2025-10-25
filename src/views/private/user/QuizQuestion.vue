<template>
    <div>
        <WelcomeScreen v-if="!quizStarted && !quizFinished" @start="handleStart" @cancel="handleCancel" />

        <QuizScreen v-if="quizStarted && !quizFinished" :questions="questions" :timeLimit="600"
            @finish="handleFinish" />

        <EndScreen v-if="quizFinished" :questions="questions" :selectedAnswers="userAnswers" @restart="handleCancel" />
    </div>
</template>

<script>
import WelcomeScreen from '../../../components/sections/ScreenQuiz/WelcomeScreen.vue';
import QuizScreen from '../../../components/sections/ScreenQuiz/QuizScreen.vue';
import EndScreen from '../../../components/sections/ScreenQuiz/EndScreen.vue';

export default {
    name: 'App',
    components: {
        WelcomeScreen,
        QuizScreen,
        EndScreen
    },
    data() {
        return {
            quizStarted: false,
            quizFinished: false,
            userAnswers: {},
            questions: [
                {
                    id: 1,
                    question: "Berapakah hasil dari 15 + 27?",
                    options: ["40", "42", "43", "45"],
                    correctAnswer: 1
                },
                {
                    id: 2,
                    question: "Jika x + 5 = 12, berapakah nilai x?",
                    options: ["5", "6", "7", "8"],
                    correctAnswer: 2
                },
                {
                    id: 3,
                    question: "Berapakah hasil dari 8 × 9?",
                    options: ["63", "72", "81", "90"],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "Luas persegi dengan sisi 6 cm adalah?",
                    options: ["24 cm²", "30 cm²", "36 cm²", "42 cm²"],
                    correctAnswer: 2
                },
                {
                    id: 5,
                    question: "Berapakah hasil dari 144 ÷ 12?",
                    options: ["10", "11", "12", "13"],
                    correctAnswer: 2
                },
                {
                    id: 6,
                    question: "Jika 2x = 16, berapakah nilai x?",
                    options: ["6", "7", "8", "9"],
                    correctAnswer: 2
                },
                {
                    id: 7,
                    question: "Berapakah 25% dari 200?",
                    options: ["25", "40", "50", "75"],
                    correctAnswer: 2
                },
                {
                    id: 8,
                    question: "Keliling lingkaran dengan diameter 14 cm (π = 22/7)?",
                    options: ["22 cm", "44 cm", "66 cm", "88 cm"],
                    correctAnswer: 1
                },
                {
                    id: 9,
                    question: "Berapakah hasil dari 5² + 3²?",
                    options: ["30", "32", "34", "36"],
                    correctAnswer: 2
                },
                {
                    id: 10,
                    question: "Jika a = 3 dan b = 4, berapakah a² + b²?",
                    options: ["12", "24", "25", "49"],
                    correctAnswer: 2
                }
            ]
        }
    },
    methods: {
        handleStart() {
            this.quizStarted = true;
            this.quizFinished = false;
            this.userAnswers = {};
        },
        handleCancel() {
            this.quizStarted = false;
            this.quizFinished = false;
            this.userAnswers = {};
        },
        handleFinish(answers) {
            this.userAnswers = answers;
            this.quizStarted = false;
            this.quizFinished = true;
        }
    }
}
</script>