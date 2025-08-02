export const App = (
    <div className="container">
        <Hello name="Айдамир" />
        <p>JSX без React</p>
        <button onClick={(e) => console.log('hello', e.target)}>hello</button>
    </div>
);

export function Hello({ name }: { name: string }) {
    return <h1>Привет, {name}!</h1>;
}
