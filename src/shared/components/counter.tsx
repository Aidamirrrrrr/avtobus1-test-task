import { useState } from 'jsx';

export interface CounterProps {
    initialValue?: number;
    step?: number;
}

export const Counter = ({ initialValue = 0, step = 1 }: CounterProps) => {
    const [count, setCount] = useState(initialValue);

    return (
        <div>
            <h3>Счетчик: {count}</h3>
            <button onclick={() => setCount(count - step)}>-{step}</button>
            <button onclick={() => setCount(count + step)}>+{step}</button>
            <button onclick={() => setCount(0)}>Сброс</button>
        </div>
    );
};
