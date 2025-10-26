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
                            <button @click="$emit('start')"
                                class="text-center w-[200px] bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer px-5 py-2 rounded-full text-white">
                                Play Now
                            </button>
                        </div>

                        <div class="flex relative" ref="shareMenuRef">
                            <button @click="toggleShare"
                                class="border border-gray-200 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 cursor-pointer">
                                <Share2 class="w-4 h-4 text-gray-700" />
                            </button>

                            <div v-if="showShareMenu"
                                class="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-50 z-10">
                                <button v-for="(option, index) in shareOptions" :key="index" @click="option.action"
                                    class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm cursor-pointer">
                                    <component :is="option.icon" />
                                    {{ option.name }}
                                </button>
                                <hr class="my-2 border-0.5 border-gray-200" />
                                <button @click="copyLink"
                                    class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm cursor-pointer">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    {{ copied ? 'Copied!' : 'Copy Link' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <p class="text-gray-700">Test your knowledge on learning English with this engaging quiz.</p>
                </div>
            </div>

            <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8">
                    <h3 class="font-semibold text-blue-700 mb-3 text-xl">
                        Quiz Information
                    </h3>
                    <ul class="space-y-2 text-gray-700 text-sm md:text-base">
                        <li><strong>Number of Questions:</strong> 10 questions</li>
                        <li><strong>Time:</strong> 10 minutes</li>
                        <li><strong>Type:</strong> Multiple Choice (A–D)</li>
                        <li><strong>Points Per Question:</strong> 10 Points</li>
                    </ul>
                </div>

                <div class="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8">
                    <h3 class="font-semibold text-red-600 mb-3 text-xl">
                        Quiz Restrictions
                    </h3>
                    <div class="space-y-3 text-xs md:text-sm text-gray-700">
                        <p><strong>Switching Tab / Window</strong> - Quiz will be immediately terminated</p>
                        <p><strong>Screenshot / Screen Record</strong> - Will be detected by system</p>
                        <p><strong>Copy-Paste</strong> - Disabled during quiz</p>
                        <p><strong>Developer Tools</strong> - Access blocked</p>
                        <p><strong>Right Click</strong> - Disabled</p>
                    </div>
                    <div class="mt-4 p-3 bg-red-100 rounded-lg">
                        <p class="text-xs md:text-sm text-red-800 font-semibold">
                            Violating the rules will result in automatic quiz termination!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MessageCircleQuestion, Play, Share2 } from "lucide-vue-next";
import { ref, onMounted, onUnmounted, h } from "vue";

const showShareMenu = ref(false);
const copied = ref(false);
const shareMenuRef = ref(null);

const shareOptions = [
    {
        name: 'WhatsApp',
        icon: h('svg', {
            class: 'w-5 h-5 text-green-600',
            fill: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'
            })
        ]),
        action: () => shareToWhatsApp()
    },
    {
        name: 'Facebook',
        icon: h('svg', {
            class: 'w-5 h-5 text-blue-600',
            fill: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
            })
        ]),
        action: () => shareToFacebook()
    },
    {
        name: 'Telegram',
        icon: h('svg', {
            class: 'w-5 h-5 text-sky-400',
            fill: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
            })
        ]),
        action: () => shareToTelegram()
    },
    {
        name: 'LinkedIn',
        icon: h('svg', {
            class: 'w-5 h-5 text-blue-700',
            fill: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
            })
        ]),
        action: () => shareToLinkedIn()
    },
];

const toggleShare = (event) => {
    event.stopPropagation();
    showShareMenu.value = !showShareMenu.value;
};

const closeShareMenu = (event) => {
    if (shareMenuRef.value && !shareMenuRef.value.contains(event.target)) {
        showShareMenu.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', closeShareMenu);
});

onUnmounted(() => {
    document.removeEventListener('click', closeShareMenu);
});

const getCurrentUrl = () => {
    return window.location.href;
};

const shareToWhatsApp = () => {
    const url = getCurrentUrl();
    const text = "Check out this Learn English quiz!";
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    showShareMenu.value = false;
};

const shareToFacebook = () => {
    const url = getCurrentUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    showShareMenu.value = false;
};

const shareToTelegram = () => {
    const url = getCurrentUrl();
    const text = "Check out this Learn English quiz!";
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    showShareMenu.value = false;
};

const shareToLinkedIn = () => {
    const url = getCurrentUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    showShareMenu.value = false;
};

const copyLink = async () => {
    const url = getCurrentUrl();
    try {
        await navigator.clipboard.writeText(url);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
            showShareMenu.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
};
</script>

<script>
export default {
    name: "WelcomeScreen",
    emits: ["start"],
};
</script>