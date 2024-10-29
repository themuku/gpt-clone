import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import { useGenerateResponse } from "./hooks/useGenerateResponse";
import { useGetCurrentTime } from "./hooks/useGetCurrentTime";

export default function App() {
  const [req, setReq] = useState("");
  const [res, setRes] = useState("");

  const [loading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (req.trim().length < 0) return;
    const response = await useGenerateResponse(req);
    console.log(response);

    setRes(response);
  };

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) ?? [];
    setChatHistory(history);
  }, []);

  useEffect(() => {
    if (req.trim().length > 0 && res.trim().length > 0) {
      const time = useGetCurrentTime();
      setChatHistory((prevState) => [...prevState, { req, res, time }]);

      localStorage.setItem(
        "history",
        JSON.stringify([...chatHistory, { req, res, time }])
      );
    }

    setReq("");
  }, [res]);

  const handleChange = (event) => {
    setReq(event.target.value);
  };

  return (
    <>
      <div className="response">
        {chatHistory.map(({ req, res, time }) => (
          <ChatBox key={Math.random()} req={req} res={res} time={time} />
        ))}
      </div>

      <form
        onSubmit={(event) => {
          setIsLoading(true);
          handleSubmit(event);
          setIsLoading(false);
        }}
      >
        <div className="form-field">
          <label htmlFor="prompt">Enter prompt</label>
          <textarea
            value={req}
            onChange={handleChange}
            type="text"
            id="prompt"
            className="prompt-input"
            rows={1}
          ></textarea>
          <button disabled={loading} type="submit" className="btn">
            <img className="icon" src="/paper-plane-svgrepo-com.svg" />
          </button>
        </div>
      </form>
    </>
  );
}
