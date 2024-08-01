import React from 'react'
import clsx from 'clsx'

import { Icon } from './Icon'

const styles = {
  info: {
    container:
      'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-sky-900 dark:text-sky-400',
    body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300',
  },
}

const icons = {
  info: (props) => <Icon icon="lightbulb" {...props} />,
  warning: (props) => <Icon icon="warning" color="amber" {...props} />,
}

export default function Callout(props) {
  if (props === undefined) {
    return
  }

  const block = props.block.content.content[0]
  if (block.type !== "WarningBlock") {
    return
  }

  const { content, attrs: { type } } = block;
  if (!type in icons) {
    return
  }
  let IconComponent = icons[type];

  const hasTitle = content[0].marks.find((mark) => mark.type === 'bold');
  
  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent className="h-8 w-8 flex-none" />
      <div className="ml-4 flex-auto">
        <p className={clsx('m-0 font-display text-xl', styles[type].title)}>
            {hasTitle ? content[0].text : ''}
        </p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>
            {(hasTitle ? content.slice(1) : content).map(obj => obj.text).join('').trim()}
        </div>
      </div>
    </div>
  )
}
