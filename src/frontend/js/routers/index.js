import Main from '../containers/main';
import Signup from '../containers/signup';
import Search from '../containers/search';
import Home from '../containers/home';
import Pm from '../containers/pm';
import Profile from '../containers/profile';
import NoMatch from '../components/no-match';


const routes = {
  path: '/',
  component: Main,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/signup', component: Signup },
    { path: '/profile/edit', component: Profile },
    { path: '/pm/:dialogId', component: Pm },
    { path: '/search', component: Search },
    { path: '*', component: NoMatch },
  ],
};


export default routes;
