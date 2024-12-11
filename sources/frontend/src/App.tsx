import './styles/App.scss'
import CitySearchPage from './pages/CitySearch/CitySearch'

function App() {
  return (
    <div className="main-container">
      <div className="header">
          <h1>Fullstack Team Lead Simulation</h1>
          <h3>implemented by <a href="https://www.linkedin.com/in/virstiuk/" target='_blank'>Serhii Virstiuk</a></h3>
      </div>
      <div className="content">
        <CitySearchPage />
      </div>
    </div>
  )
}

export default App
