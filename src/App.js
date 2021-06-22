import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import cn from 'classnames'
import s from './style.module.css'

import HomePage from './components/Routes/Home';
import GamePage from './components/Routes/Game'
import ContactPage from './components/Routes/Contact'
import AboutPage from './components/Routes/About'
import NotFoundPage from './components/Routes/NotFound'
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";




const App = () => {
  const match = useRouteMatch('/')

  return (
    <Switch>
      <Route path='/404' component={NotFoundPage} />
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <div className={cn(s.wrap, {
            [s.isHomePage]: match.isExact
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
  )

}


export default App