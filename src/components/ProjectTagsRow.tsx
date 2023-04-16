import { ProjectTag, projectTagOptions } from 'models/project-tags'

import { ProjectTagElem } from './ProjectTagElem'

/**
 * Displays project tags in a formatted row.
 *
 * @param tags The tags to be rendered. If undefined, all tag options will be rendered.
 * @param onClickTag Function called when a tag is clicked.
 * @param tagClassName Classname applied to individual tag elements.
 */
export function ProjectTagsRow({
  tags,
  onClickTag,
  tagClassName,
  disabled,
}: {
  tags?: ProjectTag[] | undefined
  onClickTag?: (tag: ProjectTag) => void
  tagClassName?: string
  disabled?: boolean
}) {
  // If tags are undefined, show all tags
  const _tags = tags ?? projectTagOptions

  return (
    <div className="flex flex-wrap gap-y-2 gap-x-1">
      {_tags.map(t => (
        <ProjectTagElem
          key={t}
          tag={t}
          onClick={onClickTag ? () => onClickTag(t) : undefined}
          className={tagClassName}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
