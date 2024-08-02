import React from 'react';
import clsx from 'clsx';
import { Link } from "@uniwebcms/module-sdk";

export default function LeftPanel(props) {
    const { website } = props;
    const pages = website.getPageHierarchy();
    console.log(pages);

    const className = "";
    return (
        <nav className={clsx('text-base lg:text-sm', className)}>
            <ul role="list" className="space-y-9">
                {pages.map((section) => (
                    <li key={section.id}>
                        <h2 className="font-display font-medium text-slate-900 dark:text-white">
                            {section.label}
                        </h2>
                        <ul
                          role="list"
                          className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
                        >
                            {section.child_items.map((link) => (
                                <li key={link.id} className="relative">

                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    )
}