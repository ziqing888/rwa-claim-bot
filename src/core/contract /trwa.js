export class TRWA {
  static CA = "0x66b43eF7f5316fA62CbEB2D9C2a66c57d8d74792";
  static ABI = [
    {
      type: "function",
      selector: "0x42966c68",
      sig: "burn(uint256)",
      name: "burn",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
      ],
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      type: "function",
      selector: "0x79cc6790",
      sig: "burnFrom(address,uint256)",
      name: "burnFrom",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
        {
          type: "uint256",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x95d89b41",
      sig: "symbol()",
      name: "symbol",
      constant: false,
      payable: false,
      inputs: [],
      stateMutability: "view",
    },
    {
      type: "function",
      selector: "0xa9059cbb",
      sig: "transfer(address,uint256)",
      name: "transfer",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
        {
          type: "uint256",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0xdd62ed3e",
      sig: "allowance(address,address)",
      name: "allowance",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
        {
          type: "address",
          name: "",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      selector: "0x06fdde03",
      sig: "name()",
      name: "name",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0x095ea7b3",
      sig: "approve(address,uint256)",
      name: "approve",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
        {
          type: "uint256",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x18160ddd",
      sig: "totalSupply()",
      name: "totalSupply",
      constant: false,
      payable: false,
      inputs: [],
      stateMutability: "view",
    },
    {
      type: "function",
      selector: "0x23b872dd",
      sig: "transferFrom(address,address,uint256)",
      name: "transferFrom",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
        {
          type: "address",
          name: "",
        },
        {
          type: "uint256",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x313ce567",
      sig: "decimals()",
      name: "decimals",
      constant: false,
      payable: false,
      inputs: [],
      stateMutability: "view",
    },
  ];
}
