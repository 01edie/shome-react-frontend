import { useState } from "react";

function TestComponent() {
  const [count, setCount] = useState<number>(0);

  if (count > 1) {
    throw new Error("Count exceeded the limit!");
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}

export default TestComponent;
