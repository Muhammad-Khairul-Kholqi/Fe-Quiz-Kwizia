<template>
    <div class="w-full lg:max-w-[70%]">
        <div v-if="isLoading">
            <LoadingSkeleton type="rect" width="100%" height="350px" rounded="2xl" />
            <div class="flex justify-between items-center gap-5 mt-5">
                <LoadingSkeleton type="rect" width="120px" height="36px" rounded="full" />
                <div class="flex items-center gap-5">
                    <LoadingSkeleton type="text" width="150px" height="20px" />
                    <LoadingSkeleton type="text" width="120px" height="20px" />
                </div>
            </div>
            <LoadingSkeleton type="text" width="90%" height="32px" class="mt-5" />
            <LoadingSkeleton type="text" width="100%" height="20px" class="mt-3" />
            <LoadingSkeleton type="text" width="100%" height="20px" class="mt-2" />
            <LoadingSkeleton type="text" width="80%" height="20px" class="mt-2" />
        </div>
        <div v-else-if="blog">
            <img :src="blog.image_url" :alt="blog.title"
                class="w-full object-cover h-[250px] sm:h-[300px] lg:h-[350px] rounded-2xl" />
            <div class="flex flex-wrap justify-between items-center gap-5 mt-5 text-sm sm:text-base">
                <div class="bg-orange-50 px-3 py-2 rounded-full text-orange-600 uppercase text-xs font-semibold">
                    {{ blog.category_blog?.name || 'Uncategorized' }}
                </div>
                <div class="flex flex-wrap items-center gap-5">
                    <div class="flex items-center gap-2">
                        <User class="w-5 h-5 text-gray-500" />
                        <span>{{ blog.author_name || blog.users?.username || 'Anonymous' }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Calendar class="w-5 h-5 text-gray-500" />
                        <span>{{ formatDate(blog.created_at) }}</span>
                    </div>
                </div>
            </div>
            <h1 class="font-bold text-2xl sm:text-3xl mt-5">
                {{ blog.title }}
            </h1>
            <div v-html="blog.description"
                class="mt-3 text-gray-700 text-base sm:text-lg blog-content ql-editor">
            </div>
        </div>
        <div v-else class="text-center py-20">
            <p class="text-gray-500 text-lg">Blog not found.</p>
        </div>
    </div>
</template>

<script setup>
import { User, Calendar } from "lucide-vue-next";
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';
import 'quill/dist/quill.snow.css';

defineProps({
    blog: {
        type: Object,
        default: null
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>

<style>
@import 'quill/dist/quill.snow.css';

.blog-content.ql-editor {
    padding: 0;
    border: none;
    min-height: auto;
    max-height: none;
}

.blog-content h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 1rem 0;
    line-height: 1.2;
    color: #111827;
}

.blog-content h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.875rem 0;
    line-height: 1.3;
    color: #111827;
}

.blog-content h3 {
    font-size: 1.25em;
    font-weight: bold;
    margin: 0.75rem 0;
    line-height: 1.4;
    color: #111827;
}

.blog-content p {
    margin: 0.75rem 0;
    line-height: 1.75;
}

.blog-content ul {
    list-style-type: disc;
    padding-left: 1.5em;
    margin: 1rem 0;
}

.blog-content ol {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin: 1rem 0;
}

.blog-content li {
    padding-left: 0.5em;
    margin: 0.5rem 0;
}

.blog-content li>p {
    margin: 0;
}

.blog-content ul ul,
.blog-content ol ul {
    list-style-type: circle;
    margin: 0.5rem 0;
}

.blog-content ul ul ul,
.blog-content ol ul ul {
    list-style-type: square;
}

.blog-content ol ol,
.blog-content ul ol {
    list-style-type: lower-alpha;
    margin: 0.5rem 0;
}

.blog-content ol ol ol,
.blog-content ul ol ol {
    list-style-type: lower-roman;
}

.blog-content blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #6b7280;
    font-style: italic;
}

.blog-content a {
    color: #2563eb;
    text-decoration: underline;
}

.blog-content a:hover {
    color: #1d4ed8;
}

.blog-content strong {
    font-weight: 700;
}

.blog-content em {
    font-style: italic;
}

.blog-content u {
    text-decoration: underline;
}

.blog-content code {
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.blog-content pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
}

.blog-content pre code {
    background: none;
    color: inherit;
    padding: 0;
}
</style>