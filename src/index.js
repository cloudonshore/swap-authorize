import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { Grommet, Box, Heading, Button } from "grommet";
import getSigner from "airswap.js/src/wallet/getSigner";
import { submitSwapRevoke } from "airswap.js/src/swap/contractFunctions";
import gas from "./gas";

const AuthButton = styled(Button)`
  background: #2b71ff;
  display: inline-block;
  color: white;
  padding: 10px;
  border-radius: 40px;
  width: auto;
  text-align: center;
  width: 300px;
`;

let signer;
if (window.ethereum) {
  window.ethereum.enable().then(() => {
    signer = getSigner(
      { web3Provider: window.ethereum },
      {
        startWalletAction: () => {
          return gas.getGasSettingsForTransaction();
        },
        finishWalletAction: () => {
          console.log("transaction submitted");
        }
      },
      "metamask"
    );
  });
}

function App() {
  return (
    <Box
      fill
      pad="large"
      align="center"
      alignContent="center"
      justify="center"
      direction="row"
    >
      <Box align="center" alignContent="center" direction="column">
        <Heading>AirSwap Authorizations</Heading>
        <AuthButton
          onClick={async () => {
            try {
              await submitSwapRevoke(
                "0x5abcfbd462e175993c6c350023f8634d71daa61d",
                signer
              );
            } catch (e) {
              console.log("tx rejected", e);
            }
          }}
        >
          Click to Revoke Authorization
        </AuthButton>
      </Box>
    </Box>
  );
}

const rootElement = document.getElementById("root");

const myTheme = {
  global: {
    font: {
      family: "Lato"
    }
  }
};

const Index = () => (
  <Grommet full={true} theme={myTheme}>
    <App />
  </Grommet>
);

ReactDOM.render(<Index />, rootElement);
