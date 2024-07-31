import React from 'react';
import { Carousel } from 'flowbite-react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { SafeHtml, Link, Image, twJoin, stripTags, getPageProfile } from '@uniwebcms/module-sdk';
import Container from '../_utils/Container';
import './style.css';

const Item = ({ item, properties }) => {
    let { banner, pretitle, title, subtitle, paragraphs, links, titleAlign } = item;

    const { show_back_drop = true, background_overlay = false } = properties;

    const alignmentH = properties.horizontal_alignment || titleAlign || 'center';
    const alignmentV = properties.vertical_alignment || 'center';

    paragraphs = paragraphs?.filter(Boolean);

    const hasContent = title || pretitle || subtitle || paragraphs?.length || links?.length;

    const content = (
        <div
            className={twJoin(
                'flex min-h-[inherit] xl:px-12 2xl:px-32',
                alignmentH === 'center' ? 'justify-center' : '',
                alignmentH === 'left' ? 'justify-start' : '',
                alignmentH === 'right' ? 'justify-end' : '',
                alignmentV === 'center' ? 'items-center py-12' : '',
                alignmentV === 'top' ? 'items-start pb-24' : '',
                alignmentV === 'bottom' ? 'items-end pt-24' : ''
            )}>
            <div
                className={twJoin(
                    'z-10 max-w-7xl relative flex justify-center text-center px-12 md:px-16 rounded-2xl',
                    !hasContent ? 'hidden' : '',
                    show_back_drop ? 'my-12 md:my-16 py-10 md:py-16' : 'my-4 md:my-6 py-12 md:py-16'
                )}>
                <div className='relative lg:w-full lg:max-w-2xl'>
                    <div className='relative'>
                        <div>
                            {pretitle ? (
                                <h3 className='mb-1 lg:mb-3 font-medium text-xl sm:text-2xl'>{stripTags(pretitle)}</h3>
                            ) : null}
                            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
                                {stripTags(title)}
                            </h2>
                            {subtitle ? (
                                <p className='mt-2 leading-8 lg:mt-4 text-lg sm:text-xl text-text-color-80'>
                                    {stripTags(subtitle)}
                                </p>
                            ) : null}
                            {paragraphs?.length ? (
                                <SafeHtml value={paragraphs} className='text-base mb-2 mt-4 lg:mt-6 lg:text-[17px]' />
                            ) : null}
                            {links?.length ? (
                                <div className='flex mt-10 items-center justify-center md:space-x-6 space-x-4'>
                                    {links.map((link, index) => {
                                        if (index === 0) {
                                            return (
                                                <Link
                                                    key={index}
                                                    to={link.href}
                                                    className='rounded-md bg-primary-200 px-4 py-2.5 text-sm sm:text-base text-primary-800 font-semibold shadow-sm hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                                    {link.label}
                                                </Link>
                                            );
                                        } else
                                            return (
                                                <Link
                                                    key={index}
                                                    to={link.href}
                                                    className='text-sm sm:text-base font-semibold leading-6 hover:underline'>
                                                    {link.label} <span className='!text-primary-200'>→</span>
                                                </Link>
                                            );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                {show_back_drop ? (
                    <div
                        className='absolute w-full h-full top-0 left-0 bg-text-color-10 opacity-90 rounded-2xl'
                        style={{ zIndex: -1 }}></div>
                ) : null}
            </div>
        </div>
    );

    return (
        <div
            className={
                background_overlay
                    ? 'after:absolute after:inset-0 after:w-full after:h-full after:z-0 after:bg-text-color-30 after:opacity-70'
                    : ''
            }
            style={{ minHeight: '700px' }}>
            {banner && (
                <div className='absolute inset-0'>
                    <Image
                        profile={getPageProfile()}
                        value={banner.value}
                        alt={banner.alt}
                        url={banner.url}
                        className='object-cover w-full min-h-[inherit]'
                    />
                </div>
            )}
            {content}
        </div>
    );
};

export default function Slider(props) {
    const { block, website } = props;

    const properties = block.getBlockProperties();

    const items = block.getBlockItems();
    const bannerSize = items[0].banner?.size || 'basic';

    const showIndicator = properties.slider_indicator;

    if (!items.length) return null;
    else if (items.length === 1) {
        return (
            <Container className='!py-0'>
                <div className={bannerSize === 'basic' ? 'relative max-w-7xl mx-auto rounded-lg overflow-hidden' : ''}>
                    <Item item={items[0]} properties={properties} website={website} />
                </div>
            </Container>
        );
    } else {
        return (
            <Container className='!py-0'>
                <div className={bannerSize === 'basic' ? 'relative max-w-7xl mx-auto rounded-lg overflow-hidden' : ''}>
                    <Carousel
                        indicators={showIndicator}
                        pauseOnHover
                        leftControl={
                            <div className='w-10 h-10 p-2 rounded-full bg-text-color/60 hover:bg-text-color/80 bg-opacity-50 ring-1 ring-text-color-20'>
                                <HiOutlineChevronLeft className='w-full h-full text-text-color-10' />
                            </div>
                        }
                        rightControl={
                            <div className='w-10 h-10 p-2 rounded-full bg-text-color/60 hover:bg-text-color/80 bg-opacity-50 ring-1 ring-text-color-20'>
                                <HiOutlineChevronRight className='w-full h-full text-text-color-10' />
                            </div>
                        }
                        theme={{
                            root: {
                                leftControl:
                                    'absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none controlParent',
                                rightControl:
                                    'absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none controlParent'
                            },
                            indicators: {
                                active: {
                                    off: 'bg-neutral-600 hover:bg-neutral-900 focus:outline-none',
                                    on: 'bg-neutral-900 focus:outline-none'
                                }
                            },
                            scrollContainer: {
                                base:
                                    bannerSize === 'basic'
                                        ? 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg'
                                        : 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none'
                            }
                        }}>
                        {items.map((item, index) => (
                            <Item key={index} item={item} properties={properties} website={website} />
                        ))}
                    </Carousel>
                </div>
            </Container>
        );
    }
}
