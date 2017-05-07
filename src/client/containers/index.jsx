import React from 'react';
import { browserHistory, Router } from 'react-router';

import routers from '../routers';


const App = () => <Router history={browserHistory} routes={routers} />;


export default App;
