import logo from './logo.svg';
import './App.css';
import  WalletConnect  from './components/WalletConnect';

function App() {
  return (
    <div className="App container">
      <div className='row mt-3 fs-2 fst-italic fw-bold'>
        <div class="col">
          Solana
        </div>
        <div class="col">
          Todo
        </div>
        <div class="col">
          <WalletConnect/>
        </div>
      </div>

      <div className='row'>
        <div class="col mt-3 fs-2 fw-bold">
          Todo List
        </div>
      </div>

      <div className='row'>
        <div class="col mt-3 fs-2 fw-bold">
          Finished
        </div>
      </div>
    </div>
  );
}

export default App;
