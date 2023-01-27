import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "./App.css";
function App() {
  const [gptPrompt, setGptPrompt] = useState<string>("");
  const [paragraphs, setParagraphs] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const sendGptReq = async (e: any) => {
    e.preventDefault();
    if (gptPrompt) {
      setParagraphs(undefined);
      setLoading(true);
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: gptPrompt,
          temperature: 1,
          max_tokens: 4000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        setParagraphs(completion.data.choices[0].text?.split("\n"));
        setLoading(false);
      } catch (error: any) {
        if (error.response) {
          console.log({ err: error.response.status });
          console.log({ err: error.response.data });
        } else {
          console.log({ err: error.response.message });
        }
      }
    }
  };
  return (
    <div className="app">
      <form onSubmit={sendGptReq} className="prompt-form">
        <input
          value={gptPrompt}
          className="prompt-input"
          placeholder="ask..."
          onChange={(e: any) => {
            setGptPrompt(e.target.value);
          }}
        />
        <button className="prompt-submit">submit</button>
      </form>
      <div className="res-wrapper">
        <p className="gpt-response">{}</p>
        {paragraphs ? (
          paragraphs?.map((par) => {
            return (
              <div className="par-div">
                <p className="gpt-response">{par}</p>
              </div>
            );
          })
        ) : (
          <p className="gpt-response">{loading && "loading..."}</p>
        )}
      </div>
    </div>
  );
}

export default App;
