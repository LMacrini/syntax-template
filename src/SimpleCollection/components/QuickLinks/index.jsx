import React from 'react'

export default function QuickLinks(props) {
  const { block } = props;
  const ChildBlocks = block.getChildBlockRenderer();
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ChildBlocks block={block} />
    </div>
  )
}