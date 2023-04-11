import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import ExtraFeatures from "./components/ExtraFeatures";
import githubLogo from "../src/assets/github.svg"

const GithubLogo = () => {
  return (
    <a href="https://github.com/WittyhacksCR002/WH002_Ctrl-Alt-Defeat/" className="githubLogo">
      <img src={githubLogo} alt="Github Logo" />
    </a>
  )
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Suggest yoga poses for backpain..."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(` ${prompt}`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 3,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data.map((data) => data.url));
  };

  return (
    <div className="app-main">
      {loading ? (
        <div className="imgDiv">
          <h2>Generating.. Keep Calmmm 🧘🏻‍♂️🧘🏻‍♂️🧘🏻‍♂️</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className="mainText">
            <GithubLogo />
            <h1>Yogagenie🧘🏻‍♂️</h1>
            <h2>Generate personalized yoga poses based on the physical or mental issues you are facing.</h2>
          </div>
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <button onClick={generateImage} className="btn">Generate an Image</button>
          {result.length > 0 ? (
            <div className="result-container">
              {result.map((url) => (
                <img className="result-image" src={url} alt="result" />
              ))}
            </div>
          ) : (
            <div className="placeholder-container">
              <p>What you can do here?</p>
              <ul>
                <li>Search for specific yoga poses or techniques based on the problem or pain you're experiencing</li>
                <li>Learn Yoga without paying expensive fees for yoga classes.</li>
                <li>Reliable and Efficient techniques.</li>
              </ul>
            </div>
          )}


        </>
      )}
    </div>
  );
}

export default App;
