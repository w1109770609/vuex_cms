import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes'
Vue.use (Router);
let router = new Router({
  routes
});
export default router;

router.beforeEach ((to, from, next) => {
  if (to.name === 'login') {
    next ();
  } else {
    if (sessionStorage.getItem ('login')) {
      next ();
    } else {
      next ('/login');
    }
  }
})
