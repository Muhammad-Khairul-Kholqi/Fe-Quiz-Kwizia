<template>
    <div class="w-full lg:max-w-[30%] sticky top-20 mt-10 lg:mt-0">
        <h1 class="font-bold text-xl">
            Related <span class="text-blue-600">Topic</span>
        </h1>

        <div class="space-y-5 mt-3">
            <div v-for="(topic, index) in relatedTopics" :key="index" class="border-b border-gray-200 pb-2">
                <div class="flex items-center gap-3 rounded-lg cursor-pointer group">
                    <div class="relative overflow-hidden rounded-lg border border-gray-200">
                        <img :src="topic.image" alt=""
                            class="w-[110px] sm:w-[150px] md:w-[180px] lg:w-[250px] object-cover h-[80px] sm:h-[90px] rounded-lg group-hover:scale-110 duration-300" />
                    </div>

                    <div>
                        <h1 class="font-bold group-hover:text-blue-600 text-sm sm:text-base">
                            {{ topic.title }}
                        </h1>
                        <p class="mt-1 text-gray-500 text-xs sm:text-sm">
                            {{ topic.date }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const relatedTopics = [
    {
        title: "Make Every Round Count: How to Use ‘Round Mode’",
        date: "29 Jan 2025",
        image:
            "https://img.freepik.com/free-vector/gradient-isometric-laptop-technology-background_52683-6159.jpg",
    },
    {
        title: "AI Revolution: The Future of Work and Technology",
        date: "30 Jan 2025",
        image:
            "https://img.freepik.com/free-vector/technology-network-background_23-2148881327.jpg",
    },
    {
        title: "Breaking Down Global Economic Trends in 2025",
        date: "2 Feb 2025",
        image:
            "https://img.freepik.com/free-vector/global-technology-background_23-2148906108.jpg",
    },
];
</script>
