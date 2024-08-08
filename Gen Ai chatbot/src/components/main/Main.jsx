import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Chat</p>
        <img src={assets.user} alt="user" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev </span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() => handleCardClick("Suggest some places to visit in Kerala")}
              >
                <p>Suggest Some Places to Visit in Siegen</p>
                <img src={assets.compass_icon} alt="compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Brainstorm team bonding activities for our work retreat")
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="message" />
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("How to create a gyroscope using a disc?")}
              >
                <p>How to Create a Website using React.js?</p>
                <img src={assets.bulb_icon} alt="bulb" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Create a script for a YouTube video about coding")
                }
              >
                <p>Create a Script for a YouTube video about coding</p>
                <img src={assets.code_icon} alt="code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img
                src={assets.send_icon}
                alt="send"
                onClick={() => {
                  onSent();
                }}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Chatbot may display inaccurate info, including about people, so
              double-check its responses. Your privacy & Chatbot Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
