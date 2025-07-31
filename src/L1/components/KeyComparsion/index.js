import React from 'react';
import { Icon } from '@uniwebcms/core-components';

export default function ListComparison(props) {
    const { block } = props;

    const { pretitle, title } = block.getBlockContent();

    const items = block.getBlockItems();

    return (
        <section className="container-7xl">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-semibold text-primary-500 uppercase tracking-wide">{pretitle}</p>
                <h2 className="font-semibold text-4xl sm:text-5xl mt-4">{title}</h2>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {items.map((item, index) => {
                    const { title, lists, paragraphs } = item;
                    const list = lists[0] || [];

                    return (
                        <div
                            key={index}
                            className="bg-text-color-0 rounded-lg shadow-default outline outline-1 outline-neutral-950/10 p-8"
                        >
                            <h3 className="text-2xl font-semibold text-heading-color/90 mb-4">
                                {title}
                            </h3>
                            <ul className="space-y-3">
                                {list.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <Icon
                                            icon={item.icons[0]}
                                            className="w-6 h-6 flex-shrink-0"
                                        />
                                        <p className="text-text-color/80">{item.paragraphs[0]}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-sm text-text-color/60 italic">
                                {paragraphs[0]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
