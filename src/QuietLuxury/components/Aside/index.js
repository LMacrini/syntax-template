import React from 'react';
import { Image, Link, MediaIcon, useLoadProfileBody, getPageProfile } from '@uniwebcms/module-sdk';
import { getMediaLinkType } from '../_utils';
import Container from '../_utils/Container';

export default function Aside(props) {
    const { block, input, website } = props;

    const profile = input.profile;

    return (
        <Container as='aside' className='!py-0'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col items-center'>
                {profile ? (
                    <Profile profile={profile} website={website} />
                ) : (
                    <Content main={block.main} website={website} />
                )}
            </div>
        </Container>
    );
}

const Profile = ({ profile, website }) => {
    const { title, subtitle } = profile.getBasicInfo();

    let mediaLinks = [];

    if (useLoadProfileBody(profile)) {
        mediaLinks = profile.getSocialMediaLinks('social_media_links');
    }

    return (
        <>
            <Image
                profile={profile}
                type={profile.contentType === 'members' ? 'avatar' : 'banner'}
                rounded={profile.contentType === 'members'}
                className='w-32 h-32 lg:w-44 lg:h-44'
            />
            <h2 className='mt-5 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl'>{title}</h2>
            <h3 className='mt-3 leading-8 text-base md:text-lg lg:text-xl text-text-color-80'>{subtitle}</h3>
            <div className='mt-4 flex flex-wrap justify-center'>
                {mediaLinks.map((link, index) => (
                    <Link
                        key={index}
                        className='mr-4 py-2'
                        href={link.href}
                        target='_blank'
                        title={website.localize({
                            en: `${link.type} link of the ${title}`,
                            fr: `Lien ${link.type} du site ${title}`
                        })}>
                        <span className='sr-only'>{link.type}</span>
                        <MediaIcon type={link.type} size='7' />
                    </Link>
                ))}
            </div>
        </>
    );
};

const Content = ({ main, website }) => {
    let image, title, subtitle, links;

    ({ title = '', subtitle = '' } = main?.header || {});

    image = main?.banner;
    links = main?.body?.links || [];

    let mediaLinks = [],
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

    return (
        <>
            {image ? (
                <Image
                    profile={getPageProfile()}
                    value={image.value}
                    alt={image.alt}
                    url={image.url}
                    rounded
                    className='w-32 h-32 lg:w-44 lg:h-44'
                />
            ) : null}
            {title ? <h2 className='mt-5 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl'>{title}</h2> : null}
            {subtitle ? (
                <h3 className='mt-3 leading-8 text-base md:text-lg lg:text-xl text-text-color-80'>{subtitle}</h3>
            ) : null}
            {plainLinks.length ? (
                <div className='mt-4 flex flex-col items-center w-full'>
                    {plainLinks.map((link, index) => (
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
            {mediaLinks.length ? (
                <div className='mt-2 flex flex-wrap justify-center'>
                    {mediaLinks.map((link, index) => (
                        <Link
                            key={index}
                            className='mr-4 py-2'
                            href={link.href}
                            target='_blank'
                            title={website.localize({
                                en: `${link.type} link of the ${title}`,
                                fr: `Lien ${link.type} du site ${title}`
                            })}>
                            <span className='sr-only'>{link.type}</span>
                            <MediaIcon type={link.type} size='7' />
                        </Link>
                    ))}
                </div>
            ) : null}
        </>
    );
};
