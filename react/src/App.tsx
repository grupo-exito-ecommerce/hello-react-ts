import * as React from "react";
import "../global.css";
import logo from "./logo.svg";

class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          wswww
        </p>
      </div>
    );
  }
}

export default App;
