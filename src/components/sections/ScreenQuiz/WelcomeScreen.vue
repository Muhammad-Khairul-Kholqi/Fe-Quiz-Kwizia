<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <div class="bg-[#F8F9FD] p-5 rounded-xl flex flex-col md:flex-row items-center gap-5">
                <img src="https://placehold.co/300x300" alt="Quiz Thumbnail"
                    class="w-full max-w-[300px] h-full max-h-[300px] object-cover rounded-xl" />

                <div class="space-y-5 text-center md:text-left w-full">
                    <div class="flex justify-center md:justify-start">
                        <div class="px-4 py-2 bg-blue-50 text-blue-500 rounded-lg">
                            <span>English</span>
                        </div>
                    </div>

                    <h1 class="text-3xl font-bold">Learn English</h1>

                    <div class="flex items-center gap-5 justify-center md:justify-start">
                        <div class="flex items-center gap-2">
                            <MessageCircleQuestion class="w-4 h-4" />
                            <span>
                                10
                                <span class="hidden sm:inline">questions</span>
                            </span>
                        </div>

                        <div class="flex items-center gap-2">
                            <Play class="w-4 h-4" />
                            <span>200</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <div class="flex">
                            <button
                                class="text-center w-[200px] bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer px-5 py-2 rounded-full text-white">
                                Play Now
                            </button>
                        </div>

                        <div class="flex">
                            <button
                                class="border border-gray-200 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 cursor-pointer">
                                <Share2 class="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    <p class="text-gray-700">Test your knowledge on learning English with this engaging quiz.</p>
                </div>
            </div>

            <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8">
                    <h3 class="font-semibold text-blue-700 mb-3 text-xl">
                        Informasi Quiz
                    </h3>
                    <ul class="space-y-2 text-gray-700 text-sm md:text-base">
                        <li><strong>Jumlah Soal:</strong> 10 soal</li>
                        <li><strong>Waktu:</strong> 10 menit</li>
                        <li><strong>Tipe:</strong> Pilihan Ganda (A–D)</li>
                        <li><strong>Poin Per Soal:</strong> 10 Poin</li>
                    </ul>
                </div>

                <div class="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8">
                    <h3 class="font-semibold text-red-600 mb-3 text-xl">
                        Larangan Selama Quiz
                    </h3>
                    <div class="space-y-3 text-xs md:text-sm text-gray-700">
                        <p><strong>Pindah Tab / Window</strong> - Quiz akan langsung diakhiri</p>
                        <p><strong>Screenshot / Screen Record</strong> - Akan terdeteksi sistem</p>
                        <p><strong>Copy-Paste</strong> - Tidak berfungsi selama quiz</p>
                        <p><strong>Developer Tools</strong> - Akses diblokir</p>
                        <p><strong>Right Click</strong> - Tidak berfungsi</p>
                    </div>
                    <div class="mt-4 p-3 bg-red-100 rounded-lg">
                        <p class="text-xs md:text-sm text-red-800 font-semibold">
                            Melanggar peraturan akan mengakibatkan quiz otomatis berakhir!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MessageCircleQuestion, Play, Share2 } from "lucide-vue-next";
</script>