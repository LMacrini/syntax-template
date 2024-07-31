import React, { useState, useRef } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import { twMerge } from '@uniwebcms/module-sdk';
import localize from './translation';

export default function SearchBox(props) {
    const { placeholderText = '', searchText = '', handleOnChange, handleOnSearch, wrapperClassName = '' } = props;

    const [search, setSearch] = useState(searchText);

    const inputRef = useRef();

    return (
        <div
            className={twMerge(
                'relative w-44 md:w-56 2xl:w-64 3xl:w-80 px-2 2xl:px-2.5 py-1.5 flex items-center space-x-1.5 2xl:space-x-2 bg-neutral-200 rounded-lg overflow-hidden ring-0 focus-within:bg-neutral-50 focus-within:ring-2 focus-within:ring-indigo-600 shadow-sm',
                wrapperClassName
            )}
            onClick={() => inputRef.current.focus()}>
            <BsSearch className='flex-shrink-0 w-[18px] h-[18px] text-neutral-600' />
            <input
                ref={inputRef}
                type='text'
                name='search'
                id='search'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    if (handleOnChange) handleOnChange(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && handleOnSearch) {
                        handleOnSearch(search);
                    }
                }}
                placeholder={placeholderText || localize('search')}
                className='block flex-grow pr-5 border-0 bg-inherit text-neutral-900 placeholder:text-neutral-400 sm:text-sm sm:leading-6 lg:text-base lg:leading-7 focus:outline-none'
            />
            <div
                className={twMerge(
                    'absolute inset-y-0 right-0.5 cursor-pointer',
                    search ? 'flex items-center' : 'hidden'
                )}>
                <BsX
                    className='w-6 h-6 text-neutral-600 hover:text-neutral-800'
                    onClick={() => {
                        setSearch('');
                        if (handleOnChange) handleOnChange('');
                        if (handleOnSearch) handleOnSearch('');
                    }}
                />
            </div>
        </div>
    );
}
