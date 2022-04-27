import React, {Fragment} from 'react'
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
    <>
      {wallet.status === 'connected' ? ( 
      <div className="nav justify-content-end pe-5">
          <div className="nav-item px-4" >
            Account: &nbsp;  
            <a target="_blank"
               alt=""
               text="blue"
               className="nav-item pe-3"
               rel="noopener noreferrer"
               href={"https://etherscan.io/address/" + wallet.account}>
              {wallet.account ? wallet.account.substring(0,6) : ''}...{wallet.account ? wallet.account.substring(38,42) : '0x0'}
            </a>
            Balance: {web3.utils.fromWei(wallet.balance, 'ether')} ETH  
          </div>
        <Button className="nav-item" variant="primary" onClick={() => wallet.reset()}> Disconnect </Button> 
      </div>
      ) : (
      <>
        <Button className="nav-item justify-content-end" variant="outline-secondary" onClick={connectWallet}> Connect MetaMask </Button>
      </>
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


