import { t } from '@lingui/macro'
import { JB721DelegateContractsContext } from 'contexts/NftRewards/JB721DelegateContracts/JB721DelegateContractsContext'
import { TransactionContext } from 'contexts/Transaction/TransactionContext'
import { ProjectMetadataContext } from 'contexts/shared/ProjectMetadataContext'
import { TransactorInstance } from 'hooks/useTransactor'
import { NftCollectionMetadata } from 'models/nftRewards'
import { JB721DelegateVersion } from 'models/v2v3/contracts'
import { useContext } from 'react'
import { ipfsUri } from 'utils/ipfs'
import { pinNftCollectionMetadata } from 'utils/nftRewards'
import { useV2ProjectTitle } from '../useProjectTitle'

function buildArgs(
  version: JB721DelegateVersion,
  { contractUri }: { contractUri: string | undefined },
) {
  switch (version) {
    case JB721DelegateVersion.JB721DELEGATE_V3_2:
      return [undefined, contractUri, undefined, undefined, undefined]
    default: // v3, v3.1
      return [contractUri]
  }
}

export function useReconfigureNftCollectionMetadata(): TransactorInstance<NftCollectionMetadata> {
  const { transactor } = useContext(TransactionContext)
  const { projectMetadata } = useContext(ProjectMetadataContext)

  const {
    contracts: { JB721TieredDelegate },
    version,
  } = useContext(JB721DelegateContractsContext)

  const projectTitle = useV2ProjectTitle()

  return async ({ name, description }, txOpts) => {
    if (!transactor || !JB721TieredDelegate || !name || !version) {
      txOpts?.onDone?.()
      return Promise.resolve(false)
    }

    const uri = await pinNftCollectionMetadata({
      collectionName: name,
      collectionDescription: description ?? '',
      collectionLogoUri: projectMetadata?.logoUri,
      collectionInfoUri: projectMetadata?.infoUri,
    })

    return transactor(
      JB721TieredDelegate,
      version === JB721DelegateVersion.JB721DELEGATE_V3 ||
        version === JB721DelegateVersion.JB721DELEGATE_V3_1
        ? 'setContractUri'
        : 'setMetadata',
      buildArgs(version, { contractUri: ipfsUri(uri) }),
      {
        ...txOpts,
        title: t`Update ${projectTitle}'s NFT collection details.`,
      },
    )
  }
}
