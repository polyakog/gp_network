import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer2 from './components/Content/Users/UsersContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';




const App = (props) => {
  
  
  return (
    <div className="App-wrapper">

      <Header />
      <NavContainer store={props.store} />
      

      <div className='App-wrapper-content'>
        <Routes>
          <Route path='profile' element={<ProfileContainer/>} >
              <Route path=':userId' element={<ProfileContainer/>} />
          </Route>
          <Route path='dialogs/*' element={<DialogsContainer />} />
          <Route path='news' element={<News />} />
          <Route path='music' element={<Music />} />
          <Route path='users' element={<UsersContainer2 />}/>

          <Route path='settings' element={<Settings />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
