// ログイン処理完了後のリダイレクトページ
import React from "react";
import { useHistory } from "react-router";

export default function Dashboard(props) {
  const history = useHistory()
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <button onClick={() => history.goBack()}>戻る</button>
    </div>
  )
}