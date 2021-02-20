import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <React.Fragment>
            <div className="col-xs-10 col-md-4 col-lg-4 mt-4 mb-4 "  >
                <div className="card">
                    <div className="card-body" style={{display: 'flex'}}>
                     <div className='col-4'>
                      <img src={props.imge} alt="pest" />
                     </div>
                     <div className='col-8' style={{margin:'auto'}}>
                     <Link to={props.link} className="card-text" style={{fontSize: '23px',fontFamily: 'fantasy'}}>{props.text}</Link>
                     
                     </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Card;