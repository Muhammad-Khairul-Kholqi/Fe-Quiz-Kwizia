import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/public/landing/Home.vue";
import Blog from "../views/public/landing/Blog.vue";
import Leaderboard from "../views/public/landing/Leaderboard.vue";
import Faq from "../views/public/landing/Faq.vue";
import Contact from "../views/public/landing/Contact.vue";

import Signin from "../views/public/auth/Signin.vue";
import Signup from "../views/public/auth/Signup.vue";

import Quiz from "../views/private/user/Quiz.vue";

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
                    title: "Fun Learning and Quiz Platform",
                }
            },
            {
                path: "blog",
                component: Blog,
                meta: {
                    title: "Blog",
                }
            },
            {
                path: "leaderboard",
                component: Leaderboard,
                meta: {
                    title: "Leaderboard",
                }
            },
            {
                path: "faq",
                component: Faq,
                meta: {
                    title: "Faq",
                }
            },
            {
                path: "contact-us",
                component: Contact,
                meta: {
                    title: "Contact",
                }
            },
            {
                path: "quiz",
                component: Quiz,
                meta: {
                    title: "Quiz Lists"
                },
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
    },
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