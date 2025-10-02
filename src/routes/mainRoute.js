import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

import MainLayout from "../layouts/MainLayout.vue";

const routes = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                component: Home,
                meta: {
                    title: "Best Quiz App",
                }
            }
        ]
        
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    const defaultTitle = "Kwizia"
    document.title = to.meta.title ? `${to.meta.title} | Kwizia` : defaultTitle
})

export default router;