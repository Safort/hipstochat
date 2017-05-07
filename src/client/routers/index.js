import Main from '../containers/Main';
import Auth from '../containers/Auth';
import Search from '../containers/Search';
import Home from '../containers/Home';
import Pm from '../containers/PM';
import Profile from '../containers/Profile';
import NoMatch from '../components/NoMatch';


const routes = {
  path: '/',
  component: Main,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/auth', component: Auth },
    { path: '/profile/edit', component: Profile },
    { path: '/pm/:dialogId', component: Pm },
    { path: '/search', component: Search },
    { path: '*', component: NoMatch },
  ],
};


export default routes;
