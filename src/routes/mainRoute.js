import {
    createRouter,
    createWebHistory
} from "vue-router";
import authApi from "../api/authApi";
import Swal from "sweetalert2";

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
    // landing before login (public routes)
    {
        path: "/",
        component: MainLayout,
        children: [{
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

    // landing after login (user routes - requires auth)
    {
        path: "/app/",
        component: MainLayout,
        meta: {
            requiresAuth: true,
            role: 'user'
        },
        children: [{
                path: "quiz",
                component: Quiz,
                meta: {
                    title: "Quiz Lists",
                    requiresAuth: true,
                    role: 'user'
                },
            },
            {
                path: "profile",
                component: Profile,
                meta: {
                    title: "Profile",
                    requiresAuth: true,
                    role: 'user'
                }
            },
        ]
    },

    // admin routes (requires auth and admin role)
    {
        path: "/private/admin/",
        component: AdminLayout,
        meta: {
            // requiresAuth: true,
            role: 'admin'
        },
        children: [{
            path: "dashboard",
            component: Dashboard,
            meta: {
                title: "Dashboard",
                // requiresAuth: true,
                role: 'admin'
            }
        }]
    },

    // auth routes (only accessible when not logged in)
    {
        path: "/signin",
        component: Signin,
        meta: {
            title: "Signin",
            guestOnly: true
        }
    },
    {
        path: "/signup",
        component: Signup,
        meta: {
            title: "Signup",
            guestOnly: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = authApi.isAuthenticated();
    const currentUser = authApi.getCurrentUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.meta.role;
    const guestOnly = to.meta.guestOnly;

    if (guestOnly && isAuthenticated) {
        Swal.fire({
            icon: 'info',
            title: 'Already Logged In',
            text: 'You are already logged in',
            confirmButtonColor: '#2563eb',
            timer: 2000,
            timerProgressBar: true
        });

        if (currentUser ?.role === 'admin') {
            return next('/private/admin/dashboard');
        } else {
            return next('/');
        }
    }

    if (requiresAuth && !isAuthenticated) {
        Swal.fire({
            icon: 'warning',
            title: 'Authentication Required',
            text: 'Please login to access this page',
            confirmButtonColor: '#2563eb'
        });
        return next('/signin');
    }

    if (requiresAuth && requiredRole && currentUser ?.role !== requiredRole) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: `This page is only accessible for ${requiredRole}s`,
            confirmButtonColor: '#dc2626'
        });

        if (currentUser ?.role === 'admin') {
            return next('/private/admin/dashboard');
        } else {
            return next('/');
        }
    }

    next();
});

router.afterEach((to) => {
    const defaultTitle = "Kwizia"
    document.title = to.meta.title ? `${to.meta.title} | Kwizia` : defaultTitle
})

export default router;