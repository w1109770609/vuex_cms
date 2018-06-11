import Home from '../components/home/home';
import Login from '../components/login/index';
import Account from '../components/account/account';
import Business from '../components/business/business';
import App from '../components/app/app';
import Rename from '../components/rename/rename';
import BusinessChild from '../components/businesschild/businesschild';

let routes =  [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      name: 'home',
      path: '/home',
      redirect: '/home/account',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          name: 'account',
          path: 'account',
          component: Account,
        },
        {
          name: 'business',
          path: 'business',
          component: Business,
          children: [
            {
              name: 'BusinessChild',
              path: '/business/:id',
              component: BusinessChild,
            },
          ],
        },
        {
          name: 'app',
          path: 'app',
          component: App,
        },
        {
          name: 'rename',
          path: 'rename',
          component: Rename,
        }
      ],
    },
  ]
export default routes
