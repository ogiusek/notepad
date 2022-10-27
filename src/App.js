import React, { useEffect, useState } from 'react';
import style from './App.module.css';

import AuthContext from './App/AuthContext';
import Header from './App/Header/Header';
import NotesMain from './App/Notes/NotesMain';
import MainLogin from './App/LoginScreen/MainLogin';

function App() {
  const [error, setError] = useState(<React.Fragment />);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
  const [note, setNote] = useState(localStorage.getItem('note'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [login, setLogin] = useState(true); // login/register

  const setLoggedIn = (state) => {
    if (state === null) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', state);
    }
    setUser(state);
    setIsLoggedIn(state !== null);
  }

  return (
    <AuthContext.Provider value={{
      setError: setError
    }}>
      < div className={style.wraper}>
        {error}
        <Header
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          login={login}
          setLogin={setLogin}
          user={user}
          note={note}
          setNote={setNote} />

        {isLoggedIn && <NotesMain
          user={user}
          setNote={setNote}
          note={note} />}

        {!isLoggedIn && <MainLogin
          setIsLoggedIn={setLoggedIn}
          login={login}
          setLogin={setLoggedIn} />}
      </div>
    </AuthContext.Provider >
  );
}

export default App;
