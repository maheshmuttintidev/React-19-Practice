import React from "react";
import {
  useActionState,
  Suspense,
  createContext,
  use,
  useCallback,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { InfiniteScroll } from "./components/InfiniteScroll";

interface ValueTypes {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const initialState = {
  count: 0,
  handleIncrement: () => {},
  handleDecrement: () => {},
};

const SampleContext = createContext<ValueTypes>(initialState);

const SampleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount((prevState) => prevState + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((prevState) => prevState - 1);
  }, []);

  const value: ValueTypes = { count, handleIncrement, handleDecrement };
  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
};

const SampleButton = () => {
  const { count, handleIncrement, handleDecrement } = use(SampleContext);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-3xl">
          sample counter actions using <strong>new react 19 </strong>
          <code className="underline bg-slate-200">use</code> hook with context
        </p>
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
    </Suspense>
  );
};

const UpdateUsername = () => {
  const [name, setName] = useState("");

  const [error, submitAction, isPending] = useActionState(
    async (_: unknown, formData: HTMLFormElement) => {
      const err: unknown = await setName(formData.get("username"));

      if (err) {
        return err;
      }
      handleTellFormStatus();
      return null;
    },
    null
  );

  const { pending, data } = useFormStatus();

  const handleTellFormStatus = () => {
    console.log("🚀 ~ handleTellFormStatus ~ pending, data:", pending, data);
  };

  return (
    <>
      <form
        action={submitAction}
        className="flex flex-col gap-2 justify-center items-center"
      >
        <div>
          <input
            className="border p-2 rounded-sm"
            type="text"
            name="username"
            placeholder="username"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="border p-2 rounded-sm bg-orange-400"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error ? (
          <p className="text-red-500 text-xl text-center">{error}</p>
        ) : null}
        {name ? (
          <p className="text-xl text-center">Submitted Data: {name}</p>
        ) : null}
      </form>
    </>
  );
};

function App() {
  return (
    <SampleContextProvider>
      <SampleButton />
      <p className="text-center py-4 text-3xl text-black">
        Example for{" "}
        <code className="underline">useActionState(AnyPromiseFn)</code> and{" "}
        <code className="underline">useFormStatus()</code>
      </p>
      <UpdateUsername />
      <InfiniteScroll />
    </SampleContextProvider>
  );
}

export default App;
