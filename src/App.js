import React, {useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from "axios";

import Home from './components/Home'
import Dashboard from './components/Dashboard'

export default function App() {
  // ログイン状態の確認(複数コンポーネントで使用する為、親要素に追加)
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }

  // 追加
  useEffect(() => {
    checkLoginStatus()
  })

  // 追加
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if(response.data.logged_in && loggedInStatus === "未ログイン"){
          setLoggedInStatus("ログインなう")
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "ログインなう"){
          setLoggedInStatus("未ログイン")
          setUser({})
        }
      })
      .catch(error => {
        console.log("ログインエラー")
      })
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact path={"/"}
            render={props => (
              <Home {...props} handleLogin={handleLogin} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            exact path={"/dashboard"}
            render={props => (
              <Dashboard {...props} loggedInStatus={loggedInStatus} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
