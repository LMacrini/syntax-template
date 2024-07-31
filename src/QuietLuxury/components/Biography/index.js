import React from 'react';
import Container from '../_utils/Container';
import {
    Image,
    twJoin,
    SafeHtml,
    Link,
    MediaIcon,
    useLoadProfileBody,
    stripTags,
    getPageProfile
} from '@uniwebcms/module-sdk';
import { getMediaLinkType } from '../_utils';
import merge from 'lodash.mergewith';

const getContentFromMember = (member) => {
    let title,
        subtitle,
        biography,
        mediaLinks = [],
        plainLinks = [];

    if (member && useLoadProfileBody(member)) {
        ({ title, subtitle } = member.getBasicInfo());

        biography = {
            title: member.getSectionInfo('biography')?.label,
            text: member.stripTags(member.at('biography/academic_biography'))
        };

        const links = member.getSocialMediaLinks();

        links.map((link) => {
            link.href ??= link.url;
            link.label = link.label || link.url;

            if (link.type) {
                mediaLinks.push(link);
            } else {
                plainLinks.push(link);
            }
        });
    }

    return {
        avatar: member
            ? {
                  profile: member,
                  type: 'avatar',
                  noMerge: true
              }
            : undefined,
        title,
        subtitle,
        links: {
            media: mediaLinks,
            plain: plainLinks
        },
        biography
    };
};

const getContentFromBlock = (block, firstItem) => {
    const { title, subtitle } = block.main?.header || {};
    const avatar = block.main?.banner;
    const links = block.main?.body?.links;
    const biography = {
        title: firstItem?.title ? stripTags(firstItem.title) : undefined,
        text: firstItem?.paragraphs?.filter(Boolean).length ? firstItem.paragraphs : undefined
    };

    const mediaLinks = [],
        plainLinks = [];

    links.map((link) => {
        const type = getMediaLinkType(link);

        if (type) {
            link.type = type;
            mediaLinks.push(link);
        } else {
            plainLinks.push(link);
        }
    });

    return {
        avatar: avatar
            ? {
                  profile: getPageProfile(),
                  value: avatar.value,
                  alt: avatar.alt,
                  url: avatar.url,
                  noMerge: true
              }
            : undefined,
        title: stripTags(title) || undefined,
        subtitle: stripTags(subtitle) || undefined,
        links: {
            media: mediaLinks,
            plain: plainLinks
        },
        biography
    };
};

export default function Biography(props) {
    const { block, website, input } = props;

    const items = block.getBlockItems();

    const { image_rounded = false, content_mode = 'auto' } = block.getBlockProperties();

    const member = input.profile;

    const blockContent = getContentFromBlock(block, items[0]);
    const profileContent = getContentFromMember(member);

    let content =
        content_mode === 'auto'
            ? merge(profileContent, blockContent, (objValue, srcValue) => {
                  if (srcValue?.noMerge) {
                      return srcValue || objValue;
                  }
                  if (Array.isArray(objValue)) {
                      return srcValue.concat(objValue);
                  }
              })
            : content_mode === 'editor'
            ? blockContent
            : profileContent;

    const { avatar, title, subtitle, links, biography } = content;

    return (
        <Container>
            <div className='relative max-w-7xl mx-auto flex lg:flex-row flex-col space-y-12 lg:space-y-0'>
                <div className='flex flex-col items-center lg:w-2/5 w-full px-6'>
                    {avatar ? (
                        <div className={twJoin('w-44 h-44 mb-5')}>
                            <Image {...avatar} rounded={image_rounded} className='object-cover w-full h-full' />
                        </div>
                    ) : null}
                    <h2 className='text-2xl font-bold tracking-tight  md:text-3xl lg:text-4xl'>{title}</h2>
                    {subtitle ? (
                        <h3 className='mt-2 leading-8 text-base md:text-lg lg:text-xl !text-neutral-900'>{subtitle}</h3>
                    ) : null}
                    {links.plain.length ? (
                        <div className='mt-3 flex flex-col items-center w-full'>
                            {links.plain.map((link, index) => (
                                <Link
                                    key={index}
                                    className='py-1 text-sm font-medium md:text-base lg:text-lg hover:underline truncate max-w-full'
                                    href={link.href}
                                    target='_blank'>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    {links.media.length ? (
                        <div className='mt-1 flex flex-wrap justify-center'>
                            {links.media.map((link, index) => (
                                <Link
                                    key={index}
                                    className='mr-4 py-2'
                                    href={link.href}
                                    target='_blank'
                                    title={website.localize({
                                        en: `${link.type} link of the ${title || 'main website'} `,
                                        fr: `Lien ${link.type} du site ${title || 'principal'}`
                                    })}>
                                    <span className='sr-only'>{link.type}</span>
                                    <MediaIcon type={link.type} size='7' />
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className='lg:w-3/5 w-full px-6'>
                    <Item {...biography} />
                </div>
            </div>
        </Container>
    );
}

const Item = ({ title, text }) => {
    return (
        <div>
            <h3 className='text-3xl font-bold tracking-tight  md:text-4xl lg:text-5xl'>{title}</h3>
            {text ? <SafeHtml className='mt-8 text-base md:text-lg !text-neutral-900 space-y-3' value={text} /> : null}
        </div>
    );
};
