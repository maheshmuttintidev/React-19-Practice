import { createContext, use, useCallback, useState } from "react";

interface ValueTypes {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const SampleContext = createContext(null);

const SampleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(() => {
    setCount((prevState) => prevState + 1);
  }, []);
  const handleDecrement = useCallback(() => {
    setCount((prevState) => prevState - 1);
  }, []);

  const value: ValueTypes | null = { count, handleIncrement, handleDecrement };
  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
};

const SampleButton = () => {
  const { count, handleIncrement, handleDecrement } = use(SampleContext);
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
     <p className="text-3xl">sample counter actions using <strong>new react 19 </strong><code className="underline bg-slate-200">use</code> hook with context</p>
     <div className="flex gap-4 text-2xl">
      <button
        className="border border-1 p-2 bg-green-400"
        onClick={handleIncrement}
      >
        Increment
      </button>
      <button
        className="border border-1 p-2 bg-red-400"
        onClick={handleDecrement}
      >
        Decrement
      </button>
      </div> 
      <p className="text-4xl">{count}</p>
    </div>
  );
};

function App() {
  return (
    <SampleContextProvider>
      <SampleButton />
    </SampleContextProvider>
  );
}

export default App;
