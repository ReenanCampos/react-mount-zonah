import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { useCookies } from 'react-cookie';

import Auth from './components/Auth';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <PrivateRoute path="/" name="Home" />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

const PrivateRoute = ({ ...rest }) => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  function isAuthenticated(){
    return !!cookies["user"];
  }

  return (
    <Route {...rest} render={props =>
      isAuthenticated() ? (
          <TheLayout {...props} />
      ) : (
          <Redirect
          to={{
          pathname: "/login"
          }}
          />
      )
    }/>
  )
};

export default App;

// import React, { Component } from 'react';
// // import './App.css';
// import  Header from './components/Header';
// import Router from './components/Router';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Header/>
//         <Router/>
//       </div>
//     );
//   }
// }
// export default App;