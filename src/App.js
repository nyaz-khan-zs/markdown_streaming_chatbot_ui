import React from "react";
import "./styles/App.css";
import ChatDisplay from "./ChatDisplay";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Markdown Streaming Chatbot UI</div>
      </header>
      <main>
        <ChatDisplay />
      </main>
    </div>
  );
}

export default App;
