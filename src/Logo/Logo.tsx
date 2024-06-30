import {useState,useEffect} from 'react'
import './logo.css'

const Logo = () => {
    const [isMobile,setIsMobile] = useState<boolean>(window.innerWidth < 600);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      return(
        <div className='logo-container'>
            {!isMobile&&<div className='logo logo-large'>MovieFlix</div>}
            {isMobile&&<div className='logo logo-small'>MF</div>}
        </div>
      )
 
}

export default Logo