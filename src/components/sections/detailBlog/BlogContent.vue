<template>
    <div class="w-full lg:max-w-[70%]">
        <img src="https://img.freepik.com/free-vector/gradient-isometric-laptop-technology-background_52683-6159.jpg"
            alt="" class="w-full object-cover h-[250px] sm:h-[300px] lg:h-[350px] rounded-2xl" />

        <div class="flex flex-wrap justify-between items-center gap-5 mt-5 text-sm sm:text-base">
            <div class="bg-orange-50 px-3 py-2 rounded-full text-orange-600">
                POLITIC
            </div>

            <div class="flex flex-wrap items-center gap-5">
                <div class="flex items-center gap-2">
                    <User class="w-5 h-5 text-gray-500" />
                    <span>Khairul Kholqi</span>
                </div>

                <div class="flex items-center gap-2">
                    <Calendar class="w-5 h-5 text-gray-500" />
                    <span>29 Jan 2025</span>
                </div>
            </div>
        </div>

        <h1 class="font-bold text-2xl sm:text-3xl mt-5">
            Intelligence committee to begin circulating draft Ukraine report Monday
        </h1>

        <p class="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquam eveniet aut molestias fugiat
            doloribus
            consequatur corporis facilis, et blanditiis reiciendis alias dolorem dicta dolores atque vel nihil at est
            totam
            quidem impedit. Voluptas labore dolorum sapiente sit minus ex iusto, velit, odio voluptatum quasi asperiores
            impedit sint quisquam quo voluptatem ipsum?
        </p>
    </div>
</template>

<script setup>
import { User, Calendar } from "lucide-vue-next";
</script>
