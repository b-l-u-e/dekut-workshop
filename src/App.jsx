import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Web3 } from "web3";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  // initialize with RPC //dapp communcation flow
  // const web3 = new Web3("https://arbitrum.llamarpc.com");

  // async function getchainId() {
  //   console.log("chain ID", await web3.eth.getChainId());
  // }

  // getchainId();

  // initialize the contract ABI and address
  const ADDRESS = "0x1961B02287f2f69077ad9B254326B73eAaefCE15";
  const ABI = [
    {
      inputs: [
        { internalType: "uint256", name: "_startingpoint", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "decreaseCounter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "increaseCounter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_newStartingPoint", type: "uint256" },
      ],
      name: "setCounter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // initialize with injected provider

  const web3 = new Web3(window.ethereum);

  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  async function getCounter() {
    //call read functions
    const result = await myContract.methods.getCounter().call();
    // console.log("result", result);

    //render frontend
    setCounter(result.toString());
  }

  getCounter();

  // async function getchainId() {
  //   console.log("chain ID", await web3.eth.getChainId());
  // }

  // getchainId();

  // CONNECT ACCOUNTS
  async function increaseCounter() {
    // connect to the accounts
    const accountsConnected = await web3.eth.requestAccounts();
    //  console.log("accountsConnected", accountsConnected);

    //call write functions
    const transactionReceipt = myContract.methods
      .increaseCounter()
      .send({ from: accountsConnected[0] });
    console.log("transactionReceipt", transactionReceipt);

    //update the frontend
    getCounter();
  }
  async function decreaseCounter() {
    // connect to the accounts
    const accountsConnected = await web3.eth.requestAccounts();
    //  console.log("accountsConnected", accountsConnected);

    //call write functions
    const transactionReceipt = myContract.methods
      .decreaseCounter()
      .send({ from: accountsConnected[0] });
    console.log("transactionReceipt", transactionReceipt);

    //update the frontend
    getCounter();
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Counter: {counter}</h1>
      <button onClick={increaseCounter}>Increase</button>
      <button onClick={decreaseCounter}>Decrease</button>
      <button onClick={getCounter}>Get Current Counter</button>
    </>
  );
}

export default App;
