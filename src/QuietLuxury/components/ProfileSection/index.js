import React from 'react';
import Container from '../_utils/Container';
import { SafeHtml, twJoin } from '@uniwebcms/module-sdk';

export default function ProfileSection({ input, block }) {
    if (!input) return null;

    let sectionData = input.data;

    const { mainHeader } = block;

    sectionData = sectionData && typeof sectionData === 'string' ? sectionData : '';

    const { width = 'lg', columns = '1' } = block.getBlockProperties();

    return (
        <Container className='px-6 mx-auto max-w-7xl lg:px-8'>
            <h2
                className={twJoin(
                    'text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl mx-auto',
                    width === 'md' && 'max-w-2xl',
                    width === 'lg' && 'max-w-3xl',
                    width === 'xl' && 'max-w-5xl',
                    width === '2xl' && 'max-w-7xl'
                )}>
                {mainHeader?.title}
            </h2>
            <SafeHtml
                value={sectionData}
                className={twJoin(
                    'mt-8 leading-9 text-lg sm:text-xl mx-auto space-y-3',
                    width === 'md' && 'max-w-2xl',
                    width === 'lg' && 'max-w-3xl',
                    width === 'xl' && 'max-w-5xl',
                    width === '2xl' && 'max-w-7xl',
                    columns == '1' && 'columns-1',
                    columns == '2' && 'columns-2 gap-6 lg:gap-8 2xl:gap-10',
                    columns == '3' && 'columns-3 gap-4 2xl:gap-6'
                )}></SafeHtml>
        </Container>
    );
}
