import styles from './Section.module.scss';
import React from 'react';
import Render from './Render';
import { buildArticleBlocks } from './parser';
import { twJoin } from '@uniwebcms/module-sdk';

export default function (props) {
    const { website, block } = props;
    const { content } = block;

    const { width = 'lg', columns = '1' } = block.getBlockProperties();

    if (!content || !Object.keys(content).length) return null;

    const parsedContent = buildArticleBlocks(website.parseLinksInArticle(content));

    return (
        <div className={twJoin('max-w-full relative flex flex-col')}>
            <div
                className={twJoin(
                    'mx-auto w-full text-base md:text-lg 2xl:text-xl',
                    width === 'md' && 'max-w-2xl',
                    width === 'lg' && 'max-w-3xl',
                    width === 'xl' && 'max-w-5xl',
                    width === '2xl' && 'max-w-7xl',
                    styles.SectionWrapper,
                    columns == '1' && 'columns-1',
                    columns == '2' && 'columns-2 gap-6 lg:gap-8 2xl:gap-10',
                    columns == '3' && 'columns-3 gap-4 2xl:gap-6'
                )}>
                <Render {...props} content={parsedContent}></Render>
            </div>
        </div>
    );
}
