
import * as React from 'react';
import './styles.css'

function Footer() {
 

  return (
    <div className="footer bg-white flex  min-h-full p-2 border-t-2 border-x-orange-900 ">
            <img
              className="mx-auto h-16 w-auto"
              src="/logos/unir.jpeg"
              alt="Your Company"
            />
             <img
              className="mx-auto h-16 w-auto"
              src="/logos/labioquim.png"
              alt="Your Company"
            />
             <img
              className="mx-auto h-16 w-auto"
              src="/logos/fiocruz.png"
              alt="Your Company"
            />
             <img
              className="mx-auto h-16 w-auto"
              src="/logos/fiocruzro.png"
              alt="Your Company"
            />
           
          </div>
        
  );
}
export default Footer;
