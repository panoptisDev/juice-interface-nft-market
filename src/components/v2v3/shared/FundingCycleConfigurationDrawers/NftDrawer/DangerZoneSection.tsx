import { AddressZero } from '@ethersproject/constants'
import { Trans } from '@lingui/macro'
import { Button } from 'antd'
import { Callout } from 'components/Callout'
import { useAppDispatch } from 'redux/hooks/AppDispatch'
import { useAppSelector } from 'redux/hooks/AppSelector'
import { editingV2ProjectActions } from 'redux/slices/editingV2Project'

export function DangerZoneSection({ close }: { close?: VoidFunction }) {
  const { fundingCycleMetadata } = useAppSelector(
    state => state.editingV2Project,
  )
  const dispatch = useAppDispatch()

  function onDetach() {
    dispatch(editingV2ProjectActions.setNftRewardTiers([]))
    dispatch(
      editingV2ProjectActions.setFundingCycleMetadata({
        ...fundingCycleMetadata,
        dataSource: AddressZero,
      }),
    )
    close?.()
  }

  return (
    <div>
      <Callout.Warning className="mb-5">
        <Trans>
          Detaching NFTs from your funding cycle has the following effects:
          <ul>
            <li>
              Contributors won't receive NFTs when they fund your project.
            </li>
            <li>Existing NFT holders won't be able to redeem their NFTs.</li>
          </ul>
          <p>This will take effect in your next funding cycle.</p>
        </Trans>
      </Callout.Warning>
      <Button onClick={onDetach} type="primary">
        <Trans>Detach NFTs from funding cycle</Trans>
      </Button>
    </div>
  )
}