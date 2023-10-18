import { Link } from 'react-router-dom'
import './ScanCode.css'

function ScanCode(){
          return(     
          <div className='Box'>
          <div><Link to = "/">Home</Link></div>
             <img className = "Logo" src="LL.jpeg"></img>
             <div className = "ScanButton">Scan</div>  
          </div>       
          );
}

export default ScanCode;