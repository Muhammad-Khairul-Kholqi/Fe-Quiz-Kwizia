<template>
    <div class="flex justify-center p-5 select-none">
        <div class="w-full max-w-[1500px]">
            <div class="bg-white rounded-lg shadow-lg p-4 sm:p-8 text-center">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Quiz Matematika</h1>
                <p class="text-base sm:text-lg text-gray-600 mb-6">
                    Selamat datang! Ini adalah quiz matematika yang berisi 10 soal pilihan ganda.
                </p>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p class="text-sm sm:text-base text-gray-700 text-left">
                        <strong>Informasi:</strong><br>
                        • Jumlah soal: 10 soal<br>
                        • Waktu: 10 menit<br>
                        • Tipe: Pilihan Ganda (A-D)
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button @click="$emit('cancel')"
                        class="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Cancel
                    </button>
                    <button @click="$emit('start')"
                        class="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Lanjut
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WelcomeScreen',
    emits: ['start', 'cancel']
}
</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>