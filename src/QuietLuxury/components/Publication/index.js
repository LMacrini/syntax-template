import React from 'react';
import Container from '../_utils/Container';
import { Image, FileLogo, Link, useLoadProfileBody, MediaIcon, stripTags } from '@uniwebcms/module-sdk';
import { IoMdDownload } from 'react-icons/io';
import { HiOutlineLink } from 'react-icons/hi';
import { getMediaLinkType, getMediaLinkLabel } from '../_utils';
import './style.css';

const { Cite: Citation } = uniweb.getServices();

const parsePublication = (profile, website) => {
    const { contentId } = profile;

    const { head } = profile.getBasicInfo();

    let {
        reference_name,
        authors,
        journal,
        month = '',
        volume,
        year = '',
        _banner,
        end_page,
        start_page,
        doi,
        abstract
    } = head;

    authors = authors
        ? authors.split(';').map((author) => {
              const p = author.split(',');
              return {
                  given: p[1].trim(),
                  family: p[0].trim()
              };
          })
        : [];

    const info = {
        'container-title': journal,
        author: authors,
        DOI: doi || '',
        id: contentId,
        volume,
        page: start_page ? start_page + (end_page ? ` - ${end_page}` : '') : '',
        issued: {
            'date-parts': [[year, month]]
        },
        year,
        title: reference_name,
        abstract: website.localize(abstract),
        banner: _banner
    };

    return info;
};

const langs = {
    en: 'en-US',
    fr: 'fr-FR'
};

export default function Publication(props) {
    const { block, website, input } = props;

    const { title = '' } = block.main?.header || {};

    let { cite_format } = block.getBlockProperties();

    cite_format = cite_format || 'apa';

    const publications = input.profiles;

    return (
        <Container>
            {title ? (
                <div className='px-6 mx-auto max-w-7xl lg:px-8 mb-8 md:mb-12 flex items-center justify-between'>
                    <h2 className='text-3xl font-bold tracking-tight  md:text-4xl lg:text-5xl'>{stripTags(title)}</h2>
                </div>
            ) : null}
            {publications.length ? (
                <Publications publications={publications} website={website} format={cite_format} />
            ) : null}
        </Container>
    );
}

const Publications = ({ publications, website, format }) => {
    const parsed = publications.map((pub) => parsePublication(pub, website));

    const citation = new Citation(parsed);

    const html = citation.format('bibliography', {
        format: 'html',
        template: format,
        lang: langs[website.getLanguage()] || 'en-US'
    });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const divElements = tempDiv.querySelectorAll('.csl-entry');

    const entries = [];

    divElements.forEach((div) => {
        const textWithoutTags = div.textContent;
        entries.push(textWithoutTags);
    });

    return (
        <div className='px-6 mx-auto max-w-7xl lg:px-8 space-y-12'>
            {entries.map((entry, index) => {
                const pub = publications[index];
                const { title, banner } = pub.getBasicInfo();

                return (
                    <div key={pub.contentId} className='flex items-start space-x-4 md:space-x-6 lg:space-x-8'>
                        <div className='max-w-4xl pr-8'>
                            <div className='text-lg md:text-xl lg:text-2xl text-text-color mb-4'>{title}</div>
                            <div className='text-sm md:text-base lg:text-lg text-text-color-80'>{entry}</div>
                            <div className='mt-4 flex items-center flex-wrap divide-x divide-text-color-20 space-x-3'>
                                <Files publication={pub} website={website} title={title} />
                                <Links publication={pub} title={title} website={website} />
                            </div>
                        </div>
                        <div className='w-36 h-36 flex-shrink-0'>
                            {banner ? <Image profile={pub} type='banner' rounded='rounded-md' /> : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const Files = ({ publication, website, title }) => {
    let attachments = null;

    if (useLoadProfileBody(publication)) {
        attachments = publication.at('attachments');
    }

    let markup = [];
    if (attachments?.length) {
        markup = attachments.map((attachment, index) => {
            const { file } = attachment;
            const { href } = publication.getAssetInfo(file, true, file);
            const filename = file.substring(file.lastIndexOf('/') + 1);

            return (
                <div key={index} className='flex items-center space-x-2 group'>
                    <FileLogo filename={file} size='5' />
                    <a
                        className='flex items-center space-x-1 group cursor-pointer'
                        alt={website.localize({
                            en: `Download file for ${title}`,
                            fr: `Télécharger le fichier pour ${title}`
                        })}
                        onClick={() => {
                            fetch(href + '&download=true')
                                .then((res) => res.json())
                                .then((res) => {
                                    window.location.href = res;
                                });
                        }}>
                        <span className='max-w-[70px] truncate' title={filename}>
                            {filename}
                        </span>
                        <IoMdDownload className='w-5 h-5' />
                    </a>
                </div>
            );
        });
    }

    return <div className='flex items-center space-x-3'>{markup}</div>;
};

const Links = ({ publication, website, title }) => {
    let urls = '';

    if (useLoadProfileBody(publication)) {
        urls = publication.at('urls/urls');
    }

    let links = [];

    try {
        links = JSON.parse(urls);
    } catch {}

    if (links?.length) {
        const mediaLinks = [],
            plainLinks = [];

        links.forEach((link) => {
            const type = getMediaLinkType({ href: link, label: '' });

            if (type) {
                mediaLinks.push({ href: link, type, label: getMediaLinkLabel(type) });
            } else {
                plainLinks.push(link);
            }
        });

        return (
            <div className='flex items-center space-x-3 pl-3'>
                {mediaLinks.map(({ href, type, label }, index) => {
                    const linkTitle = {
                        en: `${type} link of ${title}`,
                        fr: `Lien ${type} de ${title}`
                    };

                    return (
                        <Link
                            key={index}
                            className='flex items-center space-x-2'
                            to={href}
                            target='_blank'
                            title={website.localize(linkTitle)}>
                            <MediaIcon type={type} size='5' />
                            <span className='max-w-[80px] truncate' title={label}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
                {plainLinks.map((link, index) => {
                    let domain = link;

                    try {
                        const parsedUrl = new URL(link);
                        domain = parsedUrl.hostname;
                    } catch {}

                    return (
                        <Link
                            key={index}
                            to={link}
                            target='_blank'
                            title={website.localize({
                                en: `Website link of ${title}`,
                                fr: `Lien vers le site web de ${title}`
                            })}
                            className='flex items-center space-x-1'>
                            <HiOutlineLink className='w-5 h-5' />
                            <span className='max-w-[80px] truncate' title={domain}>
                                {domain}
                            </span>
                        </Link>
                    );
                })}
            </div>
        );
    }

    return null;
};
