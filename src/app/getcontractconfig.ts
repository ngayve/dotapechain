import { dotContractConfig } from './dotcontract';

export function getContractConfig(collection: string) {
  let contractconfig;
  if (collection === 'DOT') {
    contractconfig = dotContractConfig;
  }
  return contractconfig;
}
