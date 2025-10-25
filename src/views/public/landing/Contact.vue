<template>
    <div class="flex justify-center px-5 py-10">
        <div class="w-full max-w-[1500px] flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-5">
            <div class="w-full lg:w-1/2 p-6 md:p-10">
                <h3 class="text-gray-500 text-sm md:text-base">WE'RE HERE TO HELP YOU</h3>
                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full max-w-[500px] tracking-wide mt-2">
                    <span class="font-bold text-blue-600">Discuss</span> Your Needs And Problems
                </h1>

                <a href="mailto:support@gmail.com"
                    class="flex items-center gap-4 md:gap-5 mt-6 md:mt-8 hover:text-blue-600 transition-colors group">
                    <Mail class="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                    <div>
                        <p class="text-sm md:text-base font-medium">Email</p>
                        <p class="text-sm md:text-base text-gray-600 group-hover:text-blue-600">support@gmail.com</p>
                    </div>
                </a>

                <a href="tel:+62123456789"
                    class="flex items-center gap-4 md:gap-5 mt-5 hover:text-blue-600 transition-colors group">
                    <Phone class="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                    <div>
                        <p class="text-sm md:text-base font-medium">Phone number</p>
                        <p class="text-sm md:text-base text-gray-600 group-hover:text-blue-600">(62) 123 456 789</p>
                    </div>
                </a>
            </div>

            <form @submit.prevent="handleSubmit"
                class="w-full lg:w-1/2 bg-white border border-gray-200 shadow-lg rounded-xl p-6 md:p-10 space-y-5">

                <div>
                    <label class="block text-sm md:text-base font-medium mb-2">Name</label>
                    <input type="text" v-model="formData.name"
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter Your Name" :disabled="isSubmitting">
                </div>

                <div>
                    <label class="block text-sm md:text-base font-medium mb-2">Email</label>
                    <input type="email" v-model="formData.email"
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter Your Email" :disabled="isSubmitting">
                </div>

                <div>
                    <label class="block text-sm md:text-base font-medium mb-2">Message</label>
                    <textarea v-model="formData.message"
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 h-[120px] md:h-[150px] mt-2 outline-none resize-none focus:border-blue-500 transition-colors"
                        placeholder="Type Your Message" :disabled="isSubmitting"></textarea>
                </div>

                <button type="submit" :disabled="isSubmitting"
                    class="text-center text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 md:p-4 w-full rounded-lg cursor-pointer transition-colors font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isSubmitting ? 'Sending...' : 'Get a Solution' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mail, Phone } from 'lucide-vue-next';
import { submitContact } from '../../../api/contactApi';

const formData = ref({
    name: '',
    email: '',
    message: ''
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
    if (isSubmitting.value) return;

    if (!formData.value.name || !formData.value.email || !formData.value.message) {
        return;
    }

    try {
        isSubmitting.value = true;

        await submitContact({
            name: formData.value.name,
            email: formData.value.email,
            message: formData.value.message
        });

        formData.value = {
            name: '',
            email: '',
            message: ''
        };
    } catch (error) {
        console.error('Error submitting contact form:', error);
    } finally {
        isSubmitting.value = false;
    }
};
</script>