export class STAKINGPOOL {
  static CA = "0x30dB3bAcA6cfAD6C067203bCEFad3c867a72314D";
  static ABI = [
    {
      type: "function",
      selector: "0xa93460c8",
      sig: "LINEAR_MAXIMUM_DELAY_DURATION()",
      name: "LINEAR_MAXIMUM_DELAY_DURATION",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0xbd6b47a5",
      sig: "linearFlexLockDuration()",
      name: "linearFlexLockDuration",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0xc4690d3f",
      sig: "linearDeposit(uint256,uint128)",
      name: "linearDeposit",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0xd5e35184",
      sig: "linearPoolInfo(uint256)",
      name: "linearPoolInfo",
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
      type: "function",
      selector: "0xe67ec7e6",
      sig: "linearPendingWithdrawals(uint256,address)",
      name: "linearPendingWithdrawals",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0xee212464",
      sig: "linearPoolLength()",
      name: "linearPoolLength",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0xf2fde38b",
      sig: "transferOwnership(address)",
      name: "transferOwnership",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0xfe81ef58",
      sig: "linearCompoundReward(uint256)",
      name: "linearCompoundReward",
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
      type: "function",
      selector: "0x6dbe6cf1",
      sig: "linearSetAllowEmergencyWithdraw(bool)",
      name: "linearSetAllowEmergencyWithdraw",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "bool",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x715018a6",
      sig: "renounceOwnership()",
      name: "renounceOwnership",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0x736a9cc2",
      sig: "linearPendingReward(uint256,address)",
      name: "linearPendingReward",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x8da5cb5b",
      sig: "owner()",
      name: "owner",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0x97aba7f9",
      sig: "recoverSigner(bytes32,bytes)",
      name: "recoverSigner",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "bytes32",
          name: "",
        },
        {
          type: "bytes",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x9880a9b1",
      sig: "linearClaimReward(uint256)",
      name: "linearClaimReward",
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
      type: "function",
      selector: "0x32852f18",
      sig: "linearWithdraw(uint256,uint128)",
      name: "linearWithdraw",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x34b5143a",
      sig: "linearSetRewardDistributor(address)",
      name: "linearSetRewardDistributor",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x625aa6c9",
      sig: "linearBalanceOf(uint256,address)",
      name: "linearBalanceOf",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x66abdeae",
      sig: "__LinearPool_init(address)",
      name: "__LinearPool_init",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x66f74748",
      sig: "linearEmergencyWithdraw(uint256)",
      name: "linearEmergencyWithdraw",
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
      type: "function",
      selector: "0x68931760",
      sig: "linearAddPool(uint128,uint128,uint128,uint64,uint128,uint128,uint128,uint128)",
      name: "linearAddPool",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint64",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x6a316d84",
      sig: "linearSetFlexLockDuration(uint128)",
      name: "linearSetFlexLockDuration",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint128",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x0d752918",
      sig: "linearRewardDistributor()",
      name: "linearRewardDistributor",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0x1286fbcb",
      sig: "linearStakingData(uint256,address)",
      name: "linearStakingData",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint256",
          name: "",
        },
        {
          type: "address",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x1b3df40d",
      sig: "linearSetPool(uint128,uint128,uint128,uint128,uint64,uint128)",
      name: "linearSetPool",
      constant: false,
      payable: false,
      inputs: [
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
        {
          type: "uint64",
          name: "",
        },
        {
          type: "uint128",
          name: "",
        },
      ],
    },
    {
      type: "function",
      selector: "0x20b66d94",
      sig: "linearAcceptedToken()",
      name: "linearAcceptedToken",
      constant: false,
      payable: false,
      inputs: [],
    },
    {
      type: "function",
      selector: "0x213de833",
      sig: "linearTotalStaked(uint256)",
      name: "linearTotalStaked",
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
      type: "function",
      selector: "0x276569e9",
      sig: "linearClaimPendingWithdraw(uint256)",
      name: "linearClaimPendingWithdraw",
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
      type: "function",
      selector: "0x2fa8aaf2",
      sig: "linearAllowEmergencyWithdraw()",
      name: "linearAllowEmergencyWithdraw",
      constant: false,
      payable: false,
      inputs: [],
    },
  ];
}
