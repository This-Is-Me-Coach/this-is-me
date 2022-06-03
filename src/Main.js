
import React from 'react'

import Auth from './navigation/authentication/Auth'
import Initializing from './navigation/Initializing'
import MainNav from './navigation/features/MainNav'

import { Auth as AmplifyAuth } from 'aws-amplify'

class App extends React.Component {
  state = {
    currentView: 'initializing'
  }
  componentDidMount() {
    this.checkAuth()
  }
  updateAuth = (currentView) => {
    this.setState({ currentView })
  }
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
      console.log('user is signed in')
      this.setState({ currentView: 'mainNav' })
    } catch (err) {
      console.log('user is not signed in')
      this.setState({ currentView: 'auth' })
    }
  }
  render() {
    const { currentView } = this.state
    console.log('currentView: ', currentView)
    return (
      <>
        { currentView === 'initializing' && <Initializing />}
        { currentView === 'auth' && <Auth updateAuth={this.updateAuth} />}
        { currentView === 'mainNav' && <MainNav updateAuth={this.updateAuth} />}
      </>
    )
  }
}

export default App