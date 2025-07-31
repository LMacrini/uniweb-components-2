import React from 'react';
import { Icon } from '@uniwebcms/core-components';
import { twJoin } from '@uniwebcms/module-sdk';

export default function ListComparison(props) {
    const { block } = props;

    const { title, properties } = block.getBlockContent();

    const callout = properties?.callout || null;

    const items = block.getBlockItems();

    const { with_padding_top = true } = block.getBlockProperties();

    return (
        <section className={twJoin('container-7xl', !with_padding_top && '!pt-0')}>
            <div className="max-w-5xl mx-auto space-y-16">
                <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/5 p-0 relative overflow-hidden">
                    <div className="relative">
                        <div className="p-8 md:p-12">
                            <h3 className="text-3xl font-semibold text-center">{title}</h3>
                        </div>
                        <div className="space-y-8 p-8 pt-2 pb-4 md:p-16 md:pt-4 md:pb-6">
                            {items.map((item, index) => {
                                const { title, lists, icons } = item;
                                const list = lists[0] || [];
                                const icon = icons[0];

                                return (
                                    <div key={index}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Icon
                                                icon={icon}
                                                className={twJoin(
                                                    'w-6 h-6',
                                                    index % 2 === 0
                                                        ? 'text-primary-500'
                                                        : 'text-secondary-500'
                                                )}
                                            />
                                            <h4 className="text-xl font-semibold">{title}</h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {list.map((item, idx) => (
                                                <div key={idx}>
                                                    <h5
                                                        className={twJoin(
                                                            'font-semibold',
                                                            idx % 2 === 0
                                                                ? 'text-heading-color/80'
                                                                : 'text-primary-500'
                                                        )}
                                                    >
                                                        {item.paragraphs?.[0]}
                                                    </h5>
                                                    <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-text-color/40">
                                                        {item.lists[0]?.map((listItem, listIdx) => {
                                                            const feature = listItem.paragraphs[0];

                                                            return (
                                                                <li key={listIdx} className="">
                                                                    <span className="">
                                                                        {feature}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {callout && (
                            <div className="p-8 md:p-16 pt-0 md:pt-0">
                                <div className="bg-primary-50 p-6 rounded-md border-l-4 border-primary-500">
                                    <h4 className="font-semibold text-primary-500">
                                        {callout.title}
                                    </h4>
                                    <p className="mt-2 text-text-color/90">{callout.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
