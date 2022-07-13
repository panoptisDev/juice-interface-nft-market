import { t } from '@lingui/macro'
import { Input, Tooltip } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { AttachStickerModal } from 'components/modals/AttachStickerModal'
import { useContext, useState } from 'react'
import { ThemeContext } from 'contexts/themeContext'

export function MemoFormInput({
  value,
  onChange,
}: {
  value?: string
  onChange?: (memo: string) => void
}) {
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const [attachStickerModalVisible, setAttachStickerModalVisible] =
    useState<boolean>(false)

  return (
    <>
      <div
        style={{
          position: 'relative',
        }}
      >
        <Input.TextArea
          placeholder={t`WAGMI!`}
          maxLength={256}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          showCount
          autoSize
        />
        <div
          style={{
            color: colors.text.secondary,
            fontSize: '.8rem',
            position: 'absolute',
            right: 5,
            top: 7,
          }}
        >
          <Tooltip title={t`Attach a sticker`}>
            <SmileOutlined onClick={() => setAttachStickerModalVisible(true)} />
          </Tooltip>
        </div>
      </div>
      <AttachStickerModal
        visible={attachStickerModalVisible}
        onClose={() => setAttachStickerModalVisible(false)}
        onSelect={sticker => {
          if (typeof window === 'undefined') {
            return
          }
          const url = new URL(`${window.location.origin}${sticker.filepath}`)
          const urlString = url.toString()

          onChange?.(value?.length ? `${value} ${urlString}` : urlString)
        }}
      />
    </>
  )
}