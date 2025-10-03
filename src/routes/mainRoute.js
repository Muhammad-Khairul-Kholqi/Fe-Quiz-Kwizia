import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/public/landing/Home.vue";
import Signin from "../views/public/auth/Signin.vue";
import Signup from "../views/public/auth/Signup.vue";

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
        
    },
    {
        path: "/signin",
        component: Signin,
        meta: {
            title: "Signin",
        }
    },
    {
        path: "/signup",
        component: Signup,
        meta: {
            title: "Signup",
        }
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