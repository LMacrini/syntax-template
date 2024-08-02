import React, { useRef, useState, useEffect } from 'react';

import Prose from '../Prose';
import DocsHeader from '../DocsHeader';

(props) => {
    const { page, header, footer, body, leftPanel, rightPanel } = props;

    const containerRef = useRef(null);

    // Function to reset scroll position to the top of the container
    const resetScrollPosition = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    };

    useEffect(() => {
        resetScrollPosition();
    }, [page.options.pathname]);

    return (
        <div className={`bg-white`}>
            <div className={`h-[80px]`}>{header}</div>
            <div className={`relative flex h-[calc(100vh-80px)]`}>
                <div className={`w-[300px] pl-6 border-r hidden md:!flex flex-col bg-white h-full overflow-y-auto`}>
                    {leftPanel}
                </div>
                <div className={`flex flex-1 overflow-auto`} ref={containerRef}>
                    <div className={`flex h-full flex-grow flex-col md:px-16`}>
                        {body}
                        {footer}
                    </div>
                    {rightPanel}
                </div>
            </div>
        </div>
    );
}

export default function Layout(props) {
    const { page, header, footer, body, leftpanel, rightpanel, website } = props;

    return (
        <div className="flex w-full flex-col">
            {header}

            <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
                <div className="hidden lg:relative lg:block lg:flex-none">
                <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
                <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
                <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
                <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
                    {leftpanel}
                </div>
                </div>
                <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
                    <article>
                        <DocsHeader page={page} />
                        <Prose>{body}</Prose>
                    </article>
                    {footer}
                </div>
                {/* <TableOfContents tableOfContents={tableOfContents} /> */}
                {rightpanel}
            </div>
        </div>
    )
}