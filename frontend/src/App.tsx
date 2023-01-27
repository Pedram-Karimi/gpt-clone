import axios from "axios";
import { useState } from "react";
function App() {
  const [gptPrompt, setGptPrompt] = useState<string>("");
  const [gptRes, setGptRes] = useState<string>("");
  const sendGptReq = async (e: any) => {
    e.preventDefault();
    if (gptPrompt) {
      const { data } = await axios.post("http://127.0.0.1:4000/chat", {
        text: "what color is an apple",
      });
      setGptRes(data);
    } else {
    }
  };
  return (
    <div className="app">
      <form onSubmit={sendGptReq}>
        <input
          value={gptPrompt}
          placeholder="ask..."
          onChange={(e: any) => {
            setGptPrompt(e.target.value);
          }}
        />
        <button>submit</button>
      </form>
      <p>{gptRes}</p>
    </div>
  );
}

export default App;
