import { Request, Response } from 'express';
import { isEmpty, isLength, startsWith } from 'lodash';
import Web3 from 'web3';
import { infuraMain } from '../constants';

const web3 = new Web3(infuraMain.href);

export const index = (req: Request, res: Response) => {
  console.log(`Balance Path for Address: ${req.header('address')}`);

  const address: string | undefined = req.header('address');

  if (address !== undefined && isValidAddress(address)) {
    web3.eth
      .getBalance(address.trim())
      .then((balance: string) => {
        res.json({
          balance: web3.utils.fromWei(balance, 'ether')
        });
      })
      .catch((err: any) => console.log(`Error in web3: ${err.message}`));
  } else {
    res.json({
      message: 'ERROR: Address is not valid'
    });
  }
};

const isValidAddress = (address: string) => {
  return (
    !isEmpty(address) &&
    isLength(address.length) &&
    address.length === 42 &&
    startsWith(address, '0x')
  );
};
