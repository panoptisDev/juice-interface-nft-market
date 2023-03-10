import { CheckedCircle } from 'components/Create/components/Selection/components'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const RadioCard: React.FC<{
  icon?: ReactNode
  title: ReactNode
  checked?: boolean
}> = ({ icon, title, checked }) => {
  const selectable = !checked
  return (
    <div
      className={twMerge(
        'group flex select-none items-center justify-between border border-solid border-grey-200 py-3 pl-3 pr-4 transition-colors dark:border-slate-300',
        selectable
          ? 'hover:border-grey-300 dark:hover:border-slate-100'
          : undefined,
        checked ? 'border-haze-400 dark:border-haze-400' : undefined,
      )}
    >
      <span className="flex gap-x-3">
        <span
          className={twMerge(
            'transition-color fill-grey-400 text-2xl leading-none text-grey-400',
            selectable
              ? 'group-hover:fill-haze-400 group-hover:text-haze-400'
              : undefined,
            checked ? 'fill-haze-400 text-haze-400' : undefined,
          )}
        >
          {icon}
        </span>
        <span
          className={twMerge('text-base', checked ? 'font-medium' : undefined)}
        >
          {title}
        </span>
      </span>
      <CheckedCircle
        className="opacity-0 transition-opacity group-hover:opacity-100"
        checked={!!checked}
      />
    </div>
  )
}