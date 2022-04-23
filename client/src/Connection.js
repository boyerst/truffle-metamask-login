import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

function Connection() {
  const wallet = useWallet()
  
  const connectWallet = async (e) => {
    e.preventDefault()
    console.log("Connect button...")
    console.log(wallet)
    await wallet.connect()    
  }

  return (
    <div>
      <button onClick={connectWallet}> Connect Wallet </button>
      <button onClick={() => wallet.reset()}> Disconnect </button>
      <div>Account: {wallet.account}</div>
      <div>Balance: {wallet.balance}</div>
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