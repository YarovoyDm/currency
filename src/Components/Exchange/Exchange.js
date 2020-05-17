import React from 'react';
import * as _ from 'lodash'
import { Link } from 'react-router-dom';

import './Exchange.css';

const axios = require('axios').default;
var cn = require('classnames');

class Exchange extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        axios.get('https://involve-it.com/test_front/api/payMethods')
            .then((res) => {
                this.setState({
                    data: res.data
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    onChange = (key) => (e) => {
        this.setState({
            [key + 'Input']: e.target.value,
            currentChangeInput: key
        }, () => this.sendRequestForCalculate(key))
    }

    sendRequestForCalculate = (key) => {
        if (!this.state.invoice || !this.state.withdraw) { return }
        axios.get('https://involve-it.com/test_front/api/payMethods/calculate', {
            params: {
                base: key,
                amount: this.state[key + 'Input'],
                invoicePayMethod: this.state.invoice,
                withdrawPayMethod: this.state.withdraw
            }
        })
            .then((res) => {
                this.setState({
                    calculatedValue: res.data.amount
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    renderExchangeBlock = () => {
        if (!this.state.data) { return null }
        return _.map(this.state.data, (type, key) => {
            return <div  key={key} className='typeBlock'>
                <div className="type">{key}</div>
                <div className='currency'>{_.map(type, item => {
                    return <button key={item} className={cn('currencyItem', { 'select': item.id === this.state[key] })} onClick={() => {
                        this.setState({
                            [key]: item.id
                        })
                    }}>{item.name}</button>
                })}</div>
                <input placeholder='Amount...'
                    type='number'
                    className='currencyInput'
                    onChange={this.onChange(key)}
                    value={this.state.currentChangeInput !== key ? this.state.calculatedValue : this.state[key + 'Input']}
                />
            </div>
        })
    }

    renderLink = () => {
        console.log({data: this.state.data})
        if(!this.state.data || !this.state.invoice || !this.state.withdraw || !this.state.currentChangeInput){return 'Select currency and input amount'}
        const fromCurrency = _.find(this.state.data[this.state.currentChangeInput], {id: this.state.currentChangeInput === 'invoice' ? this.state.invoice : this.state.withdraw})
        const toCurrency = _.find(this.state.data[this.state.currentChangeInput !== 'invoice' ? 'invoice' : 'withdraw'], {id: this.state.currentChangeInput !== 'invoice' ? this.state.invoice : this.state.withdraw})
        
        return <Link to={{
            pathname: '/confirm',
            params: {
                data: {
                    base: this.state.currentChangeInput,
                    amount: this.state[this.state.currentChangeInput + 'Input'],
                    invoicePayMethod: this.state.invoice,
                    withdrawPayMethod: this.state.withdraw
                },
                displayInformation: {
                    from: fromCurrency.name,
                    to: toCurrency.name
                }
            }
        }}><button className='exchangeButton'>Exchange</button>
        </Link>
    }

    render() {
        return <div className='exchangeBlock'>
            <div className='infoWrapper'>{this.renderExchangeBlock()}</div>
            {this.renderLink()}
        </div>
    }
}

export default Exchange;