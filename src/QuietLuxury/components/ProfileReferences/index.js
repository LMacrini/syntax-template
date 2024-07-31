import React from 'react';
import { website, useBlockInputFilterState, stripTags } from '@uniwebcms/module-sdk';
import Container from '../_utils/Container';
import Sorter from '../_utils/Sorter';
import Searcher from '../_utils/Searcher';

function getMonthName(monthNumber, locale = 'en-CA') {
    if (monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString(locale, { month: 'short' });
    }

    return '';
}

const Publication = ({ publication }) => {
    let { reference_name, abstract, journal, year, month, day, start_page, end_page, authors } = publication.rawHead;

    abstract = website.localize(abstract);

    return (
        <div className='flex justify-between space-x-4 px-6 py-3'>
            <div className='flex-1'>
                <p className='line-clamp-2 font-semibold text-text-color' title={reference_name}>
                    {reference_name}
                </p>
                <p className='line-clamp-1 text-text-color-50 text-[15px] mt-1' title={abstract}>
                    {abstract}
                </p>
                <p className='line-clamp-1 text-text-color-70 font-medium mt-3.5' title={journal}>
                    {journal}
                </p>
                <p className='mt-2 text-sm font-base text-text-color-90 line-clamp-1' title={authors}>
                    <span className='font-medium text-text-color-70'>
                        {website.localize({ en: 'Authors', fr: 'Auteurs' })}:{' '}
                    </span>
                    <span>{authors}</span>
                </p>
            </div>
            <div className='w-64 pl-12 space-y-2.5'>
                <p className='space-x-1.5'>
                    {month || day || year ? (
                        <span className='text-text-color-70 font-medium'>
                            {website.localize({ en: 'Date', fr: 'Date' })}:
                        </span>
                    ) : null}
                    <span className='text-text-color-90'>
                        {[[getMonthName(month), day].filter(Boolean).join(' '), year].filter(Boolean).join(', ')}
                    </span>
                </p>
                <p className='space-x-1.5'>
                    {start_page || end_page ? (
                        <span className='text-text-color-70 font-medium'>
                            {website.localize({ en: 'Pages', fr: 'Pages' })}:
                        </span>
                    ) : null}
                    <span className='text-text-color-90'>{[start_page, end_page].filter(Boolean).join(' - ')}</span>
                </p>
            </div>
        </div>
    );
};

export default function ProfileReferences({ block, input }) {
    const title = block.mainTitle || '';

    const [filter, setFilter] = useBlockInputFilterState(block);

    const { filtered } = filter;

    return (
        <Container className='px-6 mx-auto max-w-7xl lg:px-8'>
            {title ? (
                <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-8'>{stripTags(title)}</h2>
            ) : null}
            <div className='flex space-x-2 items-center justify-end mb-6'>
                <Searcher filter={filter} setFilter={setFilter} />
                <Sorter filter={filter} setFilter={setFilter} />
            </div>
            {filtered.length ? (
                <div className='w-full bg-bg-color-80 border border-text-color-60 rounded-xl divide-y divide-text-color-60'>
                    {filtered.map((publication) => (
                        <Publication key={publication.key} publication={publication} />
                    ))}
                </div>
            ) : null}
        </Container>
    );
}
