import { t, Trans } from '@lingui/macro'
import { Button, Empty } from 'antd'
import { Callout } from 'components/Callout'
import Loading from 'components/Loading'
import { RewardsList } from 'components/NftRewards/RewardsList'
import { useUpdateCurrentCollection } from 'components/v2v3/V2V3Project/V2V3ProjectSettings/pages/EditNftsPage/hooks/useUpdateCurrentCollection'
import { useHasNftRewards } from 'hooks/JB721Delegate/useHasNftRewards'

import { useCallback, useState } from 'react'
import { useEditingNfts } from '../../EditNftsPage/hooks/useEditingNfts'

export function EditNftsSection() {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const { rewardTiers, setRewardTiers, editedRewardTierIds, loading } =
    useEditingNfts()
  const { value: hasExistingNfts } = useHasNftRewards()
  const updateExistingCollection = useUpdateCurrentCollection({
    editedRewardTierIds,
    rewardTiers,
  })

  const onNftFormSaved = useCallback(async () => {
    if (!rewardTiers) return

    setSubmitLoading(true)
    await updateExistingCollection()
    setSubmitLoading(false)
  }, [rewardTiers, updateExistingCollection])

  // this component only renders when data source is not 0x000..
  // so if there are no rewardTiers here, it's safe to assume they're still loading
  const noTiers = !rewardTiers || rewardTiers.length === 0

  if (loading || noTiers) return <Loading className="mt-20" />

  return (
    <>
      <Callout.Info className="text-primary mb-5 bg-smoke-100 dark:bg-slate-500">
        <Trans>Changes to NFTs will take effect immediately.</Trans>
      </Callout.Info>

      <div className="mb-8">
        {rewardTiers && rewardTiers.length > 0 && (
          <RewardsList
            value={rewardTiers}
            onChange={setRewardTiers}
            allowCreate
            withEditWarning
          />
        )}

        {rewardTiers?.length === 0 && (
          <Empty
            className="mb-0"
            description={t`No NFTs`}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>

      {hasExistingNfts && rewardTiers?.length === 0 && (
        <Callout.Warning className="mb-5 bg-smoke-100 dark:bg-slate-500">
          <Trans>
            <p>
              You're about to delete all NFTs from your collection. This will
              take effect immediately, and you can add NFTs back to the
              collection at any time.
            </p>
            <p>
              If you want to COMPLETELY detach NFTs from your project, you can
              do so in the <strong>Danger Zone</strong> section below.
            </p>
          </Trans>
        </Callout.Warning>
      )}

      <Button
        onClick={onNftFormSaved}
        htmlType="submit"
        type="primary"
        loading={submitLoading}
      >
        <span>
          <Trans>Deploy edited NFTs</Trans>
        </span>
      </Button>
    </>
  )
}
