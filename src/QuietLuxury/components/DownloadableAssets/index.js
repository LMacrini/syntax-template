import React from 'react';
import { Asset, FileLogo, stripTags } from '@uniwebcms/module-sdk';
import Container from '../_utils/Container';
import { FaFileDownload } from 'react-icons/fa';

function Layout(props) {
    const { profiles } = props;

    const getValueRenderer = (profile) => {
        const data = profile.at('info');

        const displayName = data.name;
        const { filename, url } = data.metadata;

        return (
            <div
                className={`relative w-full h-full rounded-lg border border-text-color-20 flex flex-col overflow-hidden group shadow-md`}>
                <div className={`h-44`}>
                    <Asset
                        {...{
                            value: url,
                            profile
                        }}
                    />
                </div>
                {/* <div className='absolute -z-10 group-hover:z-10 w-full h-44 bg-neutral-700/60 flex items-center justify-center cursor-pointer'>
                    <FaFileDownload className='w-10 h-10 text-blue-500' />
                </div> */}
                <div
                    className={`flex items-center space-x-1 px-4 py-3 border-t border-text-color-30 bg-heading-color-10`}>
                    <div className='w-8'>{<FileLogo filename={filename}></FileLogo>}</div>
                    <div className={`flex flex-col space-y-0.5 max-w-[calc(100%-40px)]`}>
                        <h3 className='text-[16px] font-medium line-clamp-1' title={displayName}>
                            {displayName}
                        </h3>
                    </div>
                </div>
            </div>
        );
    };

    const markup = profiles.map((profile, index) => {
        return <React.Fragment key={index}>{getValueRenderer(profile)}</React.Fragment>;
    });

    return markup;
}

export default function DownloadableAssets({ input, block, website }) {
    const { main } = block;

    const { header } = main;

    const { title = '', subtitle = '' } = header || {};

    return (
        <Container className='px-6 mx-auto max-w-7xl lg:px-8'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-center'>
                {stripTags(title)}
            </h2>
            {subtitle ? (
                <p className='mt-2 text-lg leading-8 sm:text-xl text-text-color-80 text-center'>
                    {stripTags(subtitle)}
                </p>
            ) : null}
            <div>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-20 mt-12'>
                    <Layout profiles={input.profiles} />
                </div>
            </div>
        </Container>
    );
}
