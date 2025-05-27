import React, { useState, useRef, useMemo, useCallback } from "react";
import ProductList from "./ProductList";
import Content from "./Content";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const [count, setCount] = useState(60);
  const [value, setValue] = useState(0);

  const timerId = useRef(null);

  const handleIncrease = useCallback(() => {
    setValue((prev) => prev + 1);
  }, []);

  const handleStart = () => {
    if (timerId.current) return;
    timerId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const total = useMemo(() => {
    const result = products.reduce((sum, prod) => {
      console.log("Tính lại total...");
      return sum + prod.price;
    }, 0);
    return result;
  }, [products]);

  const handleSubmit = () => {
    setProducts([
      ...products,
      {
        name,
        price: +price,
      },
    ]);
    setName("");
    setPrice("");
  };

  return (
    <div className="app-container">
      {/* Countdown Timer */}
      <div className="card">
        <h2>Countdown Timer</h2>
        <p>Time left: {count}s</p>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop} style={{ marginLeft: 10 }}>
          Stop
        </button>
      </div>

      {/* Product Manager */}
      <div className="card">
        <h2>🛒 Product Manager</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
          type="number"
        />
        <button onClick={handleSubmit}>Add</button>

        <ProductList products={products} total={total} />
      </div>

      {/* Content Area */}
      <div className="card">
        <h2>Content Area</h2>
        <Content onIncrease={handleIncrease} />
        <h1>{value}</h1>
      </div>
    </div>
  );
}

export default App;
