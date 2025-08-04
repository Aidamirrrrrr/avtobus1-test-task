export const App = () => (
    <div class="container">
        <Hello name="Aidamir" />
        <p>Strictly typed and minimal.</p>
        <button onclick={() => alert('Clicked!')}>Click me</button>
    </div>
);

const Hello = ({ name }: { name: string }) => <h1>Hello, {name}</h1>;
