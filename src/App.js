import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import cn from 'classnames'
import s from './style.module.css'

import HomePage from './components/Routes/Home';
import GamePage from './components/Routes/Game'
import ContactPage from './components/Routes/Contact'
import AboutPage from './components/Routes/About'
import NotFoundPage from './components/Routes/NotFound'
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import Firebase from "./components/service/firebase";

import { FireBaseContext } from './context/firebaseContext'



const App = () => {
  // const match = useRouteMatch('/')
  const location = useLocation()
  console.log("location", location);
  const isPadding = location.pathname ==='/' || location.pathname === '/game/board'

  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path='/404' component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(s.wrap, {
              [s.isHomePage]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (
                  <Redirect to='/404' />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch >
    </FireBaseContext.Provider>

  )

}


export default App