import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../Views/Home.vue";
import About from "../Views/About.vue";
import Table from "../Views/Table.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about",
        name: "about",
        component: About,//() => import(/* webpackChunkName: "About" */ "../Views/About.vue"),
    },
    {
        path: "/table",
        name: "table",
        component: () => import(/* webpackChunkName: "About" */ "../Views/Table.vue"),
    },
];

const router = new VueRouter({
    //mode: "history",
    routes,
});

export default router;