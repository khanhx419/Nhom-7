import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./App.css";

function App() {
  console.log("🔁 App re-rendered");

  // ----------- Counter: setState thường vs callback -----------
  const [counter, setCounter] = useState(1);

  const handleWithoutCallback = () => {
    console.log("🚫 Increase without callback");
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
  };

  const handleWithCallback = () => {
    console.log("✅ Increase with callback");
    setCounter((prev) => {
      console.log("↪️ prevState #1:", prev);
      return prev + 1;
    });
    setCounter((prev) => {
      console.log("↪️ prevState #2:", prev);
      return prev + 1;
    });
    setCounter((prev) => {
      console.log("↪️ prevState #3:", prev);
      return prev + 1;
    });
  };

  // ----------- useEffect vs useLayoutEffect -----------
  const [effectCounter, setEffectCounter] = useState(0);
  const [layoutCounter, setLayoutCounter] = useState(0);

  useEffect(() => {
    if (effectCounter > 3) {
      setEffectCounter(0);
    }
  }, [effectCounter]);

  useLayoutEffect(() => {
    if (layoutCounter > 3) {
      setLayoutCounter(0);
    }
  }, [layoutCounter]);

  // ----------- So sánh: State vs Ref khi nhập liệu -----------
  const [stateInput, setStateInput] = useState("");
  const refInput = useRef("");

  const handleStateInputChange = (e) => {
    console.log("🔄 Cập nhật state → gây re-render");
    setStateInput(e.target.value);
  };

  const handleRefInputChange = (e) => {
    console.log("🆗 Cập nhật ref → không re-render");
    refInput.current = e.target.value;
  };

  return (
    <div className="app-container">
      <h2>🔢 Counter: {counter}</h2>
      <div className="button-group">
        <button onClick={handleWithoutCallback}>
          Increase ❌ (no callback)
        </button>
        <button onClick={handleWithCallback}>
          Increase ✅ (with callback)
        </button>
      </div>

      <hr />

      <h2>🆚 useEffect vs useLayoutEffect</h2>
      <div className="counter-section">
        <div>
          <h4>🔄 useEffect Counter</h4>
          <p>Giá trị: {effectCounter}</p>
          <button onClick={() => setEffectCounter((prev) => prev + 1)}>
            Tăng (Effect)
          </button>
          <p className="note">
            Sẽ thấy <strong>4</strong> rồi mới reset về 0.
          </p>
        </div>

        <div>
          <h4>⚡ useLayoutEffect Counter</h4>
          <p>Giá trị: {layoutCounter}</p>
          <button onClick={() => setLayoutCounter((prev) => prev + 1)}>
            Tăng (LayoutEffect)
          </button>
          <p className="note">
            Không thấy <strong>4</strong> – reset ngay trước khi hiển thị.
          </p>
        </div>
      </div>

      <hr />

      <h2>🧪useRef khi nhập liệu</h2>
      <div className="input-section">
        <div style={{ marginBottom: "1rem" }}>
          <label>
            ❌ Dùng state (gây re-render):
            <input
              type="text"
              value={stateInput}
              onChange={handleStateInputChange}
            />
          </label>
        </div>

        <div>
          <label>
            ✅ Dùng ref (không re-render):
            <input type="text" onChange={handleRefInputChange} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
