import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import {
    TbSortDescending,
    TbSortAscendingLetters,
    TbSortDescendingLetters,
    TbSortDescending2,
    TbSortAscending2
} from 'react-icons/tb';
import { website, twMerge } from '@uniwebcms/module-sdk';

function SorterMenu(props) {
    const { category, categoryInfo, selection, handleOnChange } = props;

    const hasValue = selection._sort;

    return (
        <Menu as='div' className='relative inline-block z-10'>
            <div>
                <Menu.Button
                    className={twMerge(
                        'flex items-center rounded-lg border border-text-color-20 hover:shadow pl-[10px] pr-[6px] h-9 2xl:h-10 focus:outline-none group',
                        hasValue ? 'bg-primary-200 hover:bg-primary-400' : 'bg-text-color-10 hover:bg-text-color-0'
                    )}>
                    <TbSortDescending className='h-5 w-5 text-text-color-60' aria-hidden='true' />
                    <span
                        className={twMerge(
                            'text-md 2xl:text-lg ml-2 mr-1.5 text-text-color-80',
                            hasValue && 'text-primary-900'
                        )}>
                        {categoryInfo[selection._sort]?.label || category}
                    </span>
                    <HiChevronDown className='h-6 w-6 text-text-color-50' aria-hidden='true' />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute right-0 mt-2 w-36 2xl:w-40 origin-top-right divide-y divide-text-color-20 rounded-md bg-text-color-0 shadow-lg ring-1 ring-text-color-20 focus:outline-none overflow-hidden'>
                    <div>
                        {Object.entries(categoryInfo).map(([type, { label, icon: Icon }], index) => {
                            const selected = selection._sort === type;

                            return (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <button
                                            className={twMerge(
                                                'w-full px-3.5 py-2 flex items-center space-x-2 text-text-color-80 bg-text-color-0 focus:outline-none',
                                                selected && 'bg-primary-200 text-primary-900',
                                                active ? 'bg-text-color-10 text-text-color-100' : ''
                                            )}
                                            onClick={() => {
                                                handleOnChange(selected ? '' : type);
                                            }}>
                                            <Icon className='h-5 w-5' />
                                            <span className='truncate text-base 2xl:text-lg' title={label}>
                                                {label}
                                            </span>
                                        </button>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function RadioSorter({ category, categoryInfo, selection, handleOnChange }) {
    return (
        <React.Fragment>
            <label className='text-base 2xl:text-lg 3xl:text-xl font-semibold'>{category}</label>
            <fieldset className='mt-2'>
                <legend className='sr-only'>{category}</legend>
                <div className='space-y-2'>
                    {Object.entries(categoryInfo).map(([key, value], index) => {
                        const selected = selection._sort === key;

                        return (
                            <div key={index} className='flex items-center'>
                                <input
                                    id={key}
                                    type='radio'
                                    checked={selected}
                                    onChange={() => {}}
                                    onClick={() => {
                                        handleOnChange(selected ? '' : key);
                                    }}
                                    className='h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-600'
                                />
                                <label
                                    htmlFor={key}
                                    className='ml-3 text-sm 2xl:text-base 3xl:text-lg font-medium leading-6 text-neutral-900'>
                                    {value.label}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </fieldset>
        </React.Fragment>
    );
}

export default function ({ filter, setFilter, component = 'menu' }) {
    const { selection } = filter;

    const handleOnChange = (value) => {
        setFilter({
            ...selection,
            _sort: value
        });
    };

    const category = website.localize({ en: 'Sort by', fr: 'Trier par' });

    const info = {
        title: {
            label: website.localize({
                en: 'Ascending',
                fr: 'Ordre croissant'
            }),
            icon: TbSortAscendingLetters
        },
        'title-reverse': {
            label: website.localize({
                en: 'Descending',
                fr: 'Ordre décroissant'
            }),
            icon: TbSortDescendingLetters
        },
        'lastedit-reverse': {
            label: website.localize({
                en: 'Newest',
                fr: 'Plus récent'
            }),
            icon: TbSortDescending2
        },
        lastedit: {
            label: website.localize({
                en: 'Oldest',
                fr: 'Plus ancien'
            }),
            icon: TbSortAscending2
        }
    };

    if (component === 'radio') {
        return (
            <RadioSorter
                category={category}
                categoryInfo={info}
                handleOnChange={handleOnChange}
                selection={selection}
            />
        );
    }

    return <SorterMenu category={category} categoryInfo={info} handleOnChange={handleOnChange} selection={selection} />;
}
