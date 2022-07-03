import './posts.css';

export default function Posts({ children }) {
 
  return (
    <div className="container">
      <div className="app-grid">
        
          { children }
        
      </div>
    </div>
  )
}



