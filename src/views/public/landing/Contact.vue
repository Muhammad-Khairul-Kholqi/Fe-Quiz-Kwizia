<template>
    <div class="flex justify-center px-5 py-10">
        <div class="w-full max-w-[1300px] flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-5">
            <div class="w-full lg:w-1/2 p-6 md:p-10">
                <h3 class="text-gray-500 text-sm md:text-base">WE'RE HERE TO HELP YOU</h3>
                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full max-w-[500px] tracking-wide mt-2">
                    <span class="font-bold text-blue-600">Discuss</span> Your Needs And Problems
                </h1>

                <a href="" class="flex items-center gap-4 md:gap-5 mt-6 md:mt-8 hover:text-blue-600 transition-colors group">
                    <Mail class="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                    <div>
                        <p class="text-sm md:text-base font-medium">Email</p>
                        <p class="text-sm md:text-base text-gray-600 group-hover:text-blue-600">support@gmail.com</p>
                    </div>
                </a>

                <a href="" class="flex items-center gap-4 md:gap-5 mt-5 hover:text-blue-600 transition-colors group">
                    <Phone class="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                    <div>
                        <p class="text-sm md:text-base font-medium">Phone number</p>
                        <p class="text-sm md:text-base text-gray-600 group-hover:text-blue-600">(62) 123 456 789</p>
                    </div>
                </a>
            </div>

            <form action=""
                class="w-full lg:w-1/2 bg-white border border-gray-200 shadow-lg rounded-xl p-6 md:p-10 space-y-5">

                <div>
                    <label class="block text-sm md:text-base font-medium mb-2">Name</label>
                    <input type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none"
                        placeholder="Enter Your Name">
                </div>

                <div>
                    <label class="block text-sm md:text-base font-medium mb-2">Email</label>
                    <input type="email"
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none"
                        placeholder="Enter Your Email">
                </div>

                <div>
                    <label class="block text-sm md:text-base font-medium mb-2">Message</label>
                    <textarea
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 h-[120px] md:h-[150px] mt-2 outline-none resize-none"
                        placeholder="Type Your Message"></textarea>
                </div>

                <button type="submit"
                    class="text-center text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 md:p-4 w-full rounded-lg cursor-pointer transition-colors font-medium text-sm md:text-base">
                    Get a Solution
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { Mail, Phone } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
</script>