<template>
  <div class="flex justify-center p-5">
    <div class="w-full max-w-[1300px]">
      <h1 class="text-3xl font-bold mb-4">Welcome to Kwizia</h1>
      <p class="text-gray-600 mb-4">
        Test your knowledge with thousands of fun quizzes. Challenge yourself and compete with others on the leaderboard!
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div 
          v-for="item in 20" 
          :key="item"
          class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 class="font-bold text-lg mb-2">Quiz {{ item }}</h3>
          <p class="text-gray-600 text-sm">
            Test your knowledge in various topics and improve your skills.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>