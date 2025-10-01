import Catalog from "./pages/Catalog";

function App() {
  return (
    <div>
      <header className="header">
        <h1>Mueblería Hermanos Jota</h1>
      </header>

      <main>
        <Catalog />
      </main>

      <footer className="footer">
        <p>2025 HJ. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;