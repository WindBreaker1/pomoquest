import { UserContextProvider } from './Providers/UserContext';
import Main from './Components/Main';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <UserContextProvider>
      <Header/>
      <Main/>
      <Footer/>
    </UserContextProvider>
  )
}

export default App
