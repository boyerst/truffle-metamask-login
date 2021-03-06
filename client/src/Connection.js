import React, {Fragment} from 'react'
import './App.css'
import { useWallet, UseWalletProvider } from 'use-wallet'
import Web3 from 'web3';
import { Button } from 'react-bootstrap';
import {ReactComponent as Wallet } from './wallet.svg'

function Connection() {
  const wallet = useWallet()
  const web3 = new Web3(Web3.currentProvider)
  
  const connectWallet = async (e) => {
    e.preventDefault()
    await wallet.connect()    
  }

  return (
    <>
      {wallet.status === 'connected' ? ( 
      <div className="nav justify-content-end mt-3 me-4">
         {/*   <img src={wallet} width="50" height="50" ></img>*/}
          <Button className="nav-item me-2" size="sm" variant="outline-secondary" > 
            <Wallet className="me-2" width="25" height="25"/>
            <a target="_blank"
               alt=""
               text="blue"
               className="nav-item pe-3"
               rel="noopener noreferrer"
               href={"https://etherscan.io/address/" + wallet.account}>
              {wallet.account ? wallet.account.substring(0,6) : ''}...{wallet.account ? wallet.account.substring(38,42) : '0x0'}
            </a>
            {web3.utils.fromWei(wallet.balance, 'ether')} ETH  
          </Button>
        <Button className="nav-item" size="sm" variant="primary" onClick={() => wallet.reset()}> Disconnect </Button> 
      </div>
      ) : (     
      <div className="nav">
        <Button className="nav-item mt-3 ms-auto me-4 px-2 rounded-6" size="sm" variant="outline-secondary" onClick={connectWallet}> Connect MetaMask </Button>
      </div>
      )}
    </>
  )
}



// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={1337}
    connectors={{
      // This is how connectors get configured
      provided: { provider: window.cleanEthereum },
    }}>
    <Connection />
  </UseWalletProvider>
)


