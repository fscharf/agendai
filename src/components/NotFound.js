import React from "react";
import { Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="text-center my-3">
        <h2>Nada encontrado :/</h2>
        <Link to="/">Voltar ao início</Link>
      </div>
    );
  }
}

export default App;
