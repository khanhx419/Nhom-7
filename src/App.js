// App.js
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
  createContext,
} from 'react';
import './App.css';

const ThemeContext = createContext();

const InputComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return <input ref={inputRef} placeholder="Focus me with a button" />;
});

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [a, setA] = useState(5);
  const [b, setB] = useState(10);

  const theme = useContext(ThemeContext);
  const inputRef = useRef();
  const customInputRef = useRef();
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const expensiveValue = useMemo(() => {
    console.log('🧮 useMemo: Tính toán giá trị đắt đỏ...');
    return a * b;
  }, [a, b]);

  const memoizedLog = useCallback(() => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`🧠 useCallback executed at ${timestamp} with a=${a}, b=${b}`);
    alert(`Callback called!\na=${a}, b=${b}\nThời gian: ${timestamp}`);
  }, [a, b]);

 useEffect(() => {
  console.log(`✅ useEffect: Component mounted hoặc count thay đổi → count = ${count}`);

  return () => {
    console.log(`🧹 useEffect cleanup: Trước khi count thay đổi tiếp theo hoặc unmount → count = ${count}`);
  };
}, [count]);


  return (
    <div className={`App ${theme}`}>
      <section>
        <h2>1. useState</h2>
        <p>Bạn đã nhấn {count} lần</p>
        <button onClick={() => setCount(count + 1)}>Nhấn tôi</button>
      </section>

      <section>
        <h2>2. useEffect</h2>
        <p>Mở console để xem log khi <b>count</b> thay đổi hoặc khi component bị hủy.</p>
      </section>

      <section>
        <h2>3. useContext</h2>
        <p>Theme hiện tại: {theme}</p>
      </section>

      <section>
        <h2>4. useRef</h2>
        <input ref={inputRef} placeholder="Ref input" />
        <button onClick={() => inputRef.current.focus()}>Focus input</button>
      </section>

      <section>
        <h2>5. useReducer</h2>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      </section>

      <section>
        <h2>6. useMemo</h2>
        <input type="number" value={a} onChange={e => setA(+e.target.value)} />
        <input type="number" value={b} onChange={e => setB(+e.target.value)} />
        <p>Giá trị tính toán (a * b): {expensiveValue}</p>
      </section>

      <section>
        <h2>7. useCallback</h2>
        <p>Callback hiện tại sẽ log giá trị a = {a} và b = {b}</p>
        <button onClick={memoizedLog}>Log giá trị</button>
      </section>

      <section>
        <h2>8. useImperativeHandle</h2>
        <InputComponent ref={customInputRef} />
        <button onClick={() => customInputRef.current.focus()}>
          Focus custom input
        </button>
      </section>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ThemeContext.Provider value="light">
      <App />
    </ThemeContext.Provider>
  );
}
