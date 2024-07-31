import React from 'react';
import { Link, twJoin } from '@uniwebcms/module-sdk';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import Container from '../_utils/Container';
import Render from '../_utils/Section/Render';
import { buildArticleBlocks } from '../_utils/Section/parser';
import styles from '../_utils/Section/Section.module.scss';

export default function Article(props) {
    const { website, input, block } = props;

    const { width = 'lg', show_back_link = true } = block.getBlockProperties();

    const article = input?.profile || null;

    if (!article) return null;

    const activeLang = website.getLanguage();

    const articleData = article.getFullData();
    const { handle } = article.getBasicInfo();

    const { value } = articleData.find((item) => item.name === 'article_body');
    // const assets = articleData.find((item) => item.name === 'article_assets');

    let content = {};

    if (value.length) {
        const item = value[0];

        content = typeof item?.content?.value === 'string' ? JSON.parse(item?.content?.value) : item?.content?.value;
    }

    const langContent = content[activeLang];

    const parsedContent = buildArticleBlocks(website.parseLinksInArticle(langContent));

    const wrapperClassName = twJoin(
        'relative mx-auto w-full text-base md:text-lg 2xl:text-xl',
        width === 'md' && 'max-w-2xl',
        width === 'lg' && 'max-w-3xl',
        width === 'xl' && 'max-w-5xl',
        width === '2xl' && 'max-w-7xl'
    );

    return (
        <Container as='article' className='w-screen min-h-screen py-20 space-y-12 px-4 md:px-0'>
            {show_back_link ? (
                <div className={wrapperClassName}>
                    <Link
                        to={window.location.pathname.replace(handle || article.contentId, '')}
                        className='block w-10 h-10 border rounded-full p-1.5 border-neutral-200 bg-neutral-100 hover:bg-neutral-50'>
                        <IoReturnUpBackOutline className='w-full h-full' />
                    </Link>
                </div>
            ) : null}
            <div className={twJoin(wrapperClassName, styles.SectionWrapper)}>
                <Render {...props} content={parsedContent}></Render>
            </div>
        </Container>
    );
}
