// hooks/index.ts
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import simpleContractAbi from "../abi/SimpleContract.json";
import { simpleContractAddress } from "../contracts";

const simpleContractInterface = new ethers.utils.Interface(simpleContractAbi);

const contract = new Contract(simpleContractAddress, simpleContractInterface);

export function useCount() {
  const [count]: any = useContractCall({
    abi: simpleContractInterface,
    address: simpleContractAddress,
    method: "count",
    args: [],
  }) ?? [];
  return count;
}

export function useIncrement() {
  const { state, send } = useContractFunction(contract, "incrementCount", {});
  // 使用contract中incrementCount函数，并暴露出去。send是调用该incrementCount方法，而state是该方法的返回值
  return { state, send };
}

export function useSetCount() {
  const { state, send } = useContractFunction(contract, "setCount", {});
  return { state, send };
}