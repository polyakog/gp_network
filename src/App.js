// import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import { Routes, Route} from 'react-router-dom';
import Profile from './components//Content/Profile/Profile';
import Dialogs from './components/Content/Dialogs/Dialogs';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';





const App = (props) => {
  return (
    <div className="App-wrapper">

      <Header />
      <Nav />

      <div className='App-wrapper-content'>
        <Routes>
          <Route path='/profile/*' element={<Profile postData={props.postData} />} />
          <Route path='/dialogs/*' element={<Dialogs dialogData={props.dialogData} messageData={props.messageData} />} />
          <Route path='/news/*' element={<News />} />
          <Route path='/music/*' element={<Music />} />
          <Route path='/settings/*' element={<Settings />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
