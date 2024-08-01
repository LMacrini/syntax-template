import React from 'react'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
}

function EmptyButton( props ) {
  const variant = 'primary'
  let className = ''
  className = clsx(variantStyles[variant], className)

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <a className={className} {...props} />
  )
}

export default function Button( props ) {
    const { block: { main: { body: { paragraphs, links } } } } = props;
    return <EmptyButton href={links[0]?.href} {...props}>{[links.map(link => link.label).join('\n').trim(), paragraphs.join('\n').trim()].join('\n')}</EmptyButton>
}

// Okay so i know this code looks impossible to read but trust me it's simple. Basically, if the docufolio has multiple links and paragraphs, the button will lead to the first link.
// The button itself will also containt all of the text for each, but the links will be first. See? simple.