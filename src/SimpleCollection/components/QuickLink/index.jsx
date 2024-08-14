import React from 'react'
import { Link } from "@uniwebcms/module-sdk"

import { Icon, icons } from "../Icon"

export default function QuickLink(props) {
    const { block: { main: { header: { title }, body: { paragraphs } } } } = props;
    let { icon, href } = props.block.getBlockProperties();
    if (!(icon in icons)) {
        icon = 'installation';
    }

    return (
        <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
                <Icon icon={icon} className="h-8 w-8" />
            <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
                <Link to={href}>
                    <span className="absolute -inset-px rounded-xl" />
                {title}
                </Link>
            </h2>
            {paragraphs.map(paragraph => <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                {paragraph}
            </p>)}
        </div>
    </div>
    )
}
