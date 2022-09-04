import React, { useState } from "react";
import { ethers } from "ethers";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function App() {
  const [wallet, setAddress] = useState({
    address: ""
  });

  const [balanse, setBalance] = useState({
    Balance: null
  });

  const [network, setNetworkVersion] = useState({
    network: null
  });

  const networkID = {
    1: "Ethereum Mainnet",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
    80001: "Polygon Testnet Mumbai"
  }

  const logout = () => {
    if (wallet.address != "") {
      setAddress({
        address: ""
      });
      setBalance({
        Balance: null
      });
      setNetworkVersion({
        network: null
      });
    } else {
      alert("You Are Not LogIn!");
    }
  };

  const btnhandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  const getbalance = async (address) => {
    await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    })
      .then((balance) => {
        setBalance({ Balance: ethers.utils.formatEther(balance) });
      });
  };

  const getNetwork = () => {
    const networkid = networkID[window.ethereum.networkVersion]
    setNetworkVersion({ network: networkid });
  };

  const networkVersion = window.ethereum.networkVersion

  const accountChangeHandler = (account) => {
    setAddress({ address: account });
    getbalance(account);
    getNetwork();
  };

  return (
    <div>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
          <Button onClick={btnhandler} variant="contained">Login & Save ETH Address</Button>
          {networkVersion == 1 ? (
            <>
              <p className="text-gray-600">Address: {wallet.address}</p>
              <p className="text-gray-600">ETH Balance: {balanse.Balance}</p>
              <p className="text-gray-600">Network: {network.network}</p>
              <Button onClick={logout} variant="contained">LogOut</Button>
              </>
          ) : (
            <Alert severity="error" sx={{ mt: "1rem" }}>Pleas Use Ethereum Mainnet In Your Wallet</Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
