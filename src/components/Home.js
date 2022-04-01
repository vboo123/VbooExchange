import React, { Component } from 'react'
import dai from '../dai.png'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
class Home extends Component {

  render() {
    
    return (
      <div>
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Tokens Deposited</th>
              <th scope="col">Interest Earned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
              <td>{window.web3.utils.fromWei(this.props.vbooTokenBalance, 'Ether')} DAPP</td>
            </tr>
          </tbody>
        </table>

        <Card style={{backgroundColor: 'black'}}>
          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.stakeTokens(amount)
              }}>
              <div>
                <Typography color="#90BDC0">
                  Balance: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')} mDAI
                </Typography>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </div>
              </div>
              <Button variant="contained" style={{backgroundColor:"#90BDC0"}}>DEPOSIT</Button>
            </form>
            <Button
              variant="contained" 
              style={{backgroundColor:"#90BDC0"}}
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                REVOKE
              </Button>
        </div>
        </Card>
      </div>
    );
  }
}

export default Home;
