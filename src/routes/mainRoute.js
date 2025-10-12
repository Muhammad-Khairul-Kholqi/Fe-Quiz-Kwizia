import { createRouter, createWebHistory } from "vue-router";

// landing before login
import Home from "../views/public/landing/Home.vue";
import Blog from "../views/public/landing/Blog.vue";
import DetaiBlog from "../views/public/landing/DetaiBlog.vue";
import Leaderboard from "../views/public/landing/Leaderboard.vue";
import Faq from "../views/public/landing/Faq.vue";
import Contact from "../views/public/landing/Contact.vue";

// auth
import Signin from "../views/public/auth/Signin.vue";
import Signup from "../views/public/auth/Signup.vue";

// landing after login
import Quiz from "../views/private/user/Quiz.vue";
import Profile from "../views/private/user/Profile.vue";

// admin
import Dashboard from "../views/private/admin/Dashboard.vue";

// layout
import MainLayout from "../layouts/MainLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

const routes = [
    // landing before login
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
                path: "detail-blog",
                component: DetaiBlog,
                meta: {
                    title: "Detail Blog",
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
        ]
    },

    // landing after login
    {
        path: "/app/",
        component: MainLayout,
        children: [
            {
                path: "quiz",
                component: Quiz,
                meta: {
                    title: "Quiz Lists"
                },
            },
            {
                path: "profile",
                component: Profile,
                meta: {
                    title: "Profile",
                }
            },
        ]
    },

    // admin
    {
        path: "/private/admin/",
        component: AdminLayout,
        children: [
            {
                path: "dashboard",
                component: Dashboard,
                meta: {
                    title: "Dashboard"
                }
            }
        ]
    },

    // auth
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