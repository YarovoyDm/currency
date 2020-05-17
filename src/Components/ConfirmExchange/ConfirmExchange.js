import React from 'react';
import * as _ from 'lodash'

import './ConfirmExchange.css';
import { Redirect } from 'react-router-dom';
import history from '../../history'

const axios = require('axios').default;

class ConfirmExchange extends React.Component {

    state = {
        sendComplete: false,
        cancel: false
    }

    confirmRequest = () => {
        axios.post('https://involve-it.com/test_front/api/bids', {
            amount: this.props.location.params.data.amount,
            base: this.props.location.params.data.base,
            invoicePayMethod: this.props.location.params.data.invoicePayMethod,
            withdrawPayMethod: this.props.location.params.data.withdrawPayMethod
        })
            .then((response) => {
                this.setState({sendComplete: true})
            })
            .catch(function (error) {
                console.log(error);
            });
            return <Redirect to="/confirm/success" />
    }

    cancel = () => {
        
    }

    render() {
        const params = this.props.location.params
        return <div className='confirmBlock'>
            {this.state.sendComplete && <Redirect to="/confirm/success" />}
            {this.state.cancel && <Redirect to="/" />}
            <div className='confirmHeader'>
                Confirm
            </div>
            <div className='confirmInfo'>
                <div>
                    From: {params.displayInformation.from}
                </div>
                <div>
                    To: {params.displayInformation.to}
                </div>
                <div>
                    Amount: {params.data.amount}
                </div>
            </div>
            <div className='confirmButtons'>
                <button onClick={() => {
                    this.setState({cancel: true})
                }}>Cancel</button>
                <button onClick={this.confirmRequest}>Confirm</button>
            </div>
        </div>
    }
}

export default ConfirmExchange;