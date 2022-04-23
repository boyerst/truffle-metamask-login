import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'
import Web3 from 'web3';
import { Button } from 'react-bootstrap';

function Connection() {
  const wallet = useWallet()
  const web3 = new Web3(Web3.currentProvider)
  
  const connectWallet = async (e) => {
    e.preventDefault()
    await wallet.connect()    
  }

  return (
    <div>
      {
        wallet.account ? ( 
          <Button variant="primary" onClick={() => wallet.reset()}> Disconnect </Button> 
        ) : ( 
          <Button variant="secondary" onClick={connectWallet}> Connect Wallet </Button> 
      )}

      {
        wallet.account? (
          <div>
            <div id="account">
              Account: &nbsp;  
              <a target="_blank"
                 alt=""
                 text="blue"
                 className=""
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + wallet.account}>
                {wallet.account ? wallet.account.substring(0,6) : ''}...{wallet.account ? wallet.account.substring(38,42) : '0x0'}
              </a>
            </div>
              Balance: {web3.utils.fromWei(wallet.balance, 'ether')} ETH  
          </div>
        ) : (
          <span></span>
      )}
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