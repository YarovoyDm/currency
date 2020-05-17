import React from 'react';
import * as _ from 'lodash'

import './Success.css';


class Success extends React.Component {

    render() {
        return <div className='successBlock'>
            <div className='successHeader'>Success!</div>
            <div>Your request successfully sent!</div>
        </div>
    }
}

export default Success;