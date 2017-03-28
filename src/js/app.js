// import router from './router';
import App from 'App.vue';
// require( "./util/GoogleAuth" );

/*
const router = new VueRouter( {
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        { path: '/'     , component: require( "Dashboard.vue" ) },
        { path: '/dashboard'     , component: require( "Dashboard.vue" ) },
        // { path: '/create'     , component: require( "CreateNewTask.vue" ) },
        { path: '/repos', component: require( "Repos.vue" ) },
        { path: '/task' , component: require( "Task.vue" ) },
        { path: '/task/detail/:task_id' , component: require( "TaskDetail.vue" ) },
        { path: '/task/add' , component: require( "AddNewTask.vue" ) },
        { path: '/chat/:id' , component: require( "Task.vue" ) },
        // { path: '/login', component: require( "GoogleSign.vue" ) },
        { path: '/setting', component: require( "Setting.vue" ) },
        { path: '/user', component: require( "User.vue" ) },
        { path: '/test', component: require( "Test.vue" ) },
        // { path: '*'     , component: require( "404.vue" ) },
    ]
});*/
// import io from 'io';

import { init } from './clientIO';
init();

export default new Vue({
    className: 'main.js',
    el: '#app',
    // components: { 'app': require( 'App' ) },
    // router,
    // store,
    render: h => h(App),
    // store
});

