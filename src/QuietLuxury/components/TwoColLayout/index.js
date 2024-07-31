import React from 'react';
import Container from '../_utils/Container';
import { twJoin } from '@uniwebcms/module-sdk';
import './style.css';

const layouts = {
    left: {
        '50/50': 'w-full lg:w-1/2 px-4 lg:pr-0 lg:pl-6 xl:pl-8',
        '40/60': 'w-full lg:w-[40%] px-4 lg:pr-0 lg:pl-6 xl:pl-8',
        '60/40': 'w-full lg:w-[60%] px-4 lg:pr-0 lg:pl-6 xl:pl-8',
        '70/30': 'w-full lg:w-[70%] px-4 lg:pr-0 lg:pl-6 xl:pl-8',
        '30/70': 'w-full lg:w-[30%] px-4 lg:pr-0 lg:pl-6 xl:pl-8',
        '75/25': 'w-full lg:w-[75%] px-4 lg:pr-0 lg:pl-6 xl:pl-8',
        '25/75': 'w-full lg:w-[25%] px-4 lg:pr-0 lg:pl-6 xl:pl-8'
    },
    right: {
        '50/50': 'w-full lg:w-1/2 px-4 lg:pl-0 lg:pr-6 xl:pr-8',
        '40/60': 'w-full lg:w-[60%] px-4 lg:pl-0 lg:pr-6 xl:pr-8',
        '60/40': 'w-full lg:w-[40%] px-4 lg:pl-0 lg:pr-6 xl:pr-8',
        '70/30': 'w-full lg:w-[30%] px-4 lg:pl-0 lg:pr-6 xl:pr-8',
        '30/70': 'w-full lg:w-[70%] px-4 lg:pl-0 lg:pr-6 xl:pr-8',
        '75/25': 'w-full lg:w-[25%] px-4 lg:pl-0 lg:pr-6 xl:pr-8',
        '25/75': 'w-full lg:w-[75%] px-4 lg:pl-0 lg:pr-6 xl:pr-8'
    }
};

export default function TwoColLayout(props) {
    const { block } = props;
    const { childBlocks, properties } = block;
    const {
        layout_configuration = '50/50',
        max_width = 'regular',
        vertical_padding = 'lg',
        column_padding = 'lg'
    } = properties || {};

    if (!childBlocks.length) return null;

    const ChildBlocks = block.getChildBlockRenderer();

    return (
        <Container
            className={twJoin(
                'mx-auto flex flex-col lg:flex-row lg:space-y-0',
                max_width === 'regular' ? 'max-w-7xl' : '',
                max_width === 'wide' ? 'max-w-9xl' : '',
                max_width === 'full' ? 'max-w-full' : '',
                vertical_padding === 'none' ? 'py-0 lg:py-0 space-y-2' : '',
                vertical_padding === 'sm' ? 'py-4 lg:py-6 space-y-4' : '',
                vertical_padding === 'lg' ? 'py-12 lg:py-24 space-y-8' : '',
                column_padding === 'none' ? 'gap-0' : '',
                column_padding === 'sm' ? 'lg:gap-2 2xl:gap-4' : '',
                column_padding === 'md' ? 'lg:gap-4 2xl:gap-8' : '',
                column_padding === 'lg' ? 'lg:gap-8 2xl:gap-12' : ''
            )}>
            {childBlocks.length === 1 ? (
                <div className='w-full'>
                    <ChildBlocks
                        block={block}
                        childBlocks={childBlocks}
                        extra={{ as: 'div', noPadding: true }}></ChildBlocks>
                </div>
            ) : (
                childBlocks.map((child, index) => (
                    <div
                        key={index}
                        className={
                            index % 2 === 0 ? layouts.left[layout_configuration] : layouts.right[layout_configuration]
                        }>
                        <ChildBlocks
                            block={block}
                            childBlocks={[child]}
                            extra={{ as: 'div', noPadding: true }}></ChildBlocks>
                    </div>
                ))
            )}
        </Container>
    );
}
