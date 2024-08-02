'use client'

import React from 'react'

export default function DocsHeader({ page }) {
    const {activeLang} = page;
    const parent = page.getParentPage()
    const title = page.options.activeContent.label;

    return (
        <header className="mb-9 space-y-1">
            {parent && (
                <p className="font-display text-sm font-medium text-sky-500">
                    {JSON.parse(parent.label)[activeLang]}
                </p>
            )}
            {title && (
                <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {JSON.parse(title)[activeLang]}
                </h1>
            )}
        </header>
    )
}
