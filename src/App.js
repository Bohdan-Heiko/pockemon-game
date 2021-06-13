import { useState } from "react"

import HomePage from './components/Routes/Home';
import GamePage from './components/Routes/Game'







const App = () => {

  const [page, setPage] = useState('app')

  const handleChanchePage = (page) => {
    console.log("###: App");
    setPage(page)
  }

  switch (page) {
    case 'app':
      return <HomePage
        onChangePage={handleChanchePage}
      />
    case 'game':
      return <GamePage />
    default:
      return <HomePage />
  }

}


export default App