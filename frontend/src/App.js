import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import FirstRegistrationScreen from './screens/firstRegistrationScreen/FirstRegistrationScreen'
import LastRegistrationScreen from './screens/lastRegistrationScreen/LastRegistrationScreen'
import HomePage from './screens/homePage/HomePage'

function App() {
  return (
    <Router>
      <main>
        <Route path='/' component={HomePage} exact />
        <Route path='/homepage' component={HomePage} exact />
        <Route path='/homepage/:accesstoken' component={HomePage} />
        <Route path='/firstregistration' component={FirstRegistrationScreen} />
        <Route
          path='/lastregistration/'
          component={LastRegistrationScreen}
          exact
        />
        <Route
          path='/lastregistration/:accesstoken'
          component={LastRegistrationScreen}
        />
      </main>
    </Router>
  )
}

export default App
