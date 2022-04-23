import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'
import Web3 from 'web3';

function Connection() {
  const wallet = useWallet()
  const web3 = new Web3(Web3.currentProvider)
  
  const connectWallet = async (e) => {
    e.preventDefault()
    console.log("Connect button...")
    console.log(wallet)
    await wallet.connect()    
  }

  return (
    <div>
      {
        wallet.account ? ( 
          <button onClick={() => wallet.reset()}> Disconnect </button> 

      ) : ( 
          <button onClick={connectWallet}> Connect Wallet </button> 
      )}
      <div id="account">
        <a target="_blank"
           alt=""
           text="blue"
           className="text-white"
           rel="noopener noreferrer"
           href={"https://etherscan.io/address/" + wallet.account}>
          Account: {wallet.account ? wallet.account.substring(0,6) : ''}...{wallet.account ? wallet.account.substring(38,42) : '0x0'}
        </a>
      </div>

      <div>
        Balance: {web3.utils.fromWei(wallet.balance, 'ether')} ETH  
      </div>
      

      
      
    </div>
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