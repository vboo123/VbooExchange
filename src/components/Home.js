import React, { Component } from "react";
import dai from "../dai.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "../App.css";
class Home extends Component {
  render() {
    return (
      <div>
        <Box pl={60} pt={5} pb={5}>
          <Card
            style={{ backgroundColor: "black", width: "70%", height: "15vh" }}
            elevation={24}
          >
            <div className="card-body">
              <Typography color="#CEE2E2" sx={{ flexGrow: 1 }} variant="h5">
                Welcome to the Vboo Token Exchange! This is a crowdfunding site
                for you to exchange DAI tokens for Vboo Tokens! You will earn
                interest on your investments! If you have any questions, please
                don't hesitate to contact vaibhavgargpgw@gmail.com.
              </Typography>
            </div>
          </Card>
        </Box>
        <Box m={5}>
          <Card style={{ backgroundColor: "black" }}>
            <div className="card-body">
              <form
                className="mb-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  let amount;
                  amount = this.input.value.toString();
                  amount = window.web3.utils.toWei(amount, "Ether");
                  this.props.depositTokens(amount);
                }}
              >
                <Box pb={2}>
                  <span>
                    <Typography variant="h5" color="#CEE2E2">
                      Current Balance:{" "}
                      {window.web3.utils.fromWei(
                        this.props.daiTokenBalance,
                        "Ether"
                      )}{" "}
                      mDAI
                    </Typography>
                  </span>
                </Box>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    ref={(input) => {
                      this.input = input;
                    }}
                    className="form-control form-control-lg"
                    placeholder="Enter amount here"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <img src={dai} height="32" alt="" />
                      &nbsp;&nbsp;&nbsp; mDAI
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#2F3939" }}
                >
                  DEPOSIT
                </Button>
              </form>
              <Button
                variant="contained"
                style={{ backgroundColor: "#2F3939" }}
                onClick={(event) => {
                  event.preventDefault();
                  this.props.unDepositTokens();
                }}
              >
                REVOKE
              </Button>
            </div>
          </Card>
        </Box>
        s
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th color="#CEE2E2" scope="col">
                Tokens Deposited
              </th>
              <th scope="col">Interest Earned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                mDAI
              </td>
              <td>
                {window.web3.utils.fromWei(
                  this.props.vbooTokenBalance,
                  "Ether"
                )}{" "}
                DAPP
              </td>
            </tr>
          </tbody>
        </table>
        <Card
          style={{ backgroundColor: "#2F3939", width: "100%", height: "17vh" }}
        ></Card>
        <div className="background-red">
          <Typography align="center">
            @Copyright v0.0.1: Application not running on actual Ethereum
            Network
          </Typography>
        </div>
      </div>
    );
  }
}

export default Home;
