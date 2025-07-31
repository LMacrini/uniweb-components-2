import React from 'react';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import { LuChevronDown } from 'react-icons/lu';
import { Link, Icon } from '@uniwebcms/core-components';

const NavigationMenuTrigger = ({ children, ...props }) => {
    const [enteredWhileClosed, setEnteredWhileClosed] = React.useState(false);
    const [hasClicked, setHasClicked] = React.useState(false);
    const triggerRef = React.useRef(null);

    return (
        <RadixNavigationMenu.Trigger
            ref={triggerRef}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg-color px-4 py-2 text-sm font-medium transition-colors text-text-color/80 hover:bg-primary-200 hover:text-text-color focus:bg-primary-200 focus:text-text-color focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-text-color data-[state=open]:bg-primary-200/50 data-[state=open]:hover:bg-primary-200 data-[state=open]:focus:bg-primary-200"
            onPointerEnter={(e) => {
                // Check if menu is currently closed
                const isOpen = triggerRef.current?.getAttribute('data-state') === 'open';

                if (!isOpen) {
                    setEnteredWhileClosed(true);
                    setHasClicked(false);
                }

                // Call original handler
                props.onPointerEnter?.(e);
            }}
            onPointerLeave={(e) => {
                // Reset tracking when mouse leaves
                setEnteredWhileClosed(false);
                setHasClicked(false);

                // Call original handler
                props.onPointerLeave?.(e);
            }}
            onClick={(e) => {
                // If mouse entered while closed and this is the first click,
                // ignore it because hover already opened the menu
                if (enteredWhileClosed && !hasClicked) {
                    e.preventDefault();
                    setHasClicked(true);
                    return;
                }

                // Reset the entered state after a successful click
                setEnteredWhileClosed(false);

                // Call original handler
                props.onClick?.(e);
            }}
        >
            {children}
            <LuChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                aria-hidden="true"
            />
        </RadixNavigationMenu.Trigger>
    );
};

export default function NavigationMenu(props) {
    const { navigation } = props;

    return (
        <RadixNavigationMenu.Root className="relative z-10 flex max-w-max flex-1 items-center justify-center">
            <RadixNavigationMenu.List className="group flex flex-1 list-none items-center justify-center gap-1">
                {navigation.map((item) =>
                    item.items.length ? (
                        <RadixNavigationMenu.Item key={item.trigger}>
                            <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
                            <RadixNavigationMenu.Content className="absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {item.items.map(({ icon, title, description, href }, index) => (
                                        <li key={index}>
                                            <RadixNavigationMenu.Link asChild>
                                                <div
                                                    className={`flex select-none flex-col justify-end rounded-md bg-gradient-to-b from-neutral-100/50 to-neutral-100 p-4 no-underline outline-none h-full hover:from-primary-200/50 hover:to-primary-200 focus:shadow-md`}
                                                >
                                                    <Link to={href}>
                                                        <Icon
                                                            icon={icon}
                                                            className="h-6 w-6 text-text-color/70"
                                                        />
                                                        <div className="mb-2 mt-4 text-lg text-text-color font-medium">
                                                            {title}
                                                        </div>
                                                        <p className="text-sm leading-tight text-text-color/60">
                                                            {description}
                                                        </p>
                                                    </Link>
                                                </div>
                                            </RadixNavigationMenu.Link>
                                        </li>
                                    ))}
                                </ul>
                            </RadixNavigationMenu.Content>
                        </RadixNavigationMenu.Item>
                    ) : (
                        <RadixNavigationMenu.Item key={item.trigger}>
                            <RadixNavigationMenu.Link asChild>
                                <div className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg-color px-4 py-2 text-sm font-medium text-text-color/80 transition-colors hover:bg-primary-200 hover:text-text-color focus:bg-primary-200 focus:text-text-color focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-text-color data-[state=open]:bg-primary-200/50 data-[state=open]:hover:bg-primary-200 data-[state=open]:focus:bg-primary-200">
                                    <Link to={item.href}>{item.trigger}</Link>
                                </div>
                            </RadixNavigationMenu.Link>
                        </RadixNavigationMenu.Item>
                    )
                )}
            </RadixNavigationMenu.List>
            <div className="absolute left-0 top-full flex justify-center">
                <RadixNavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-bg-color transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)] ring-1 ring-text-color/10 shadow" />
            </div>
        </RadixNavigationMenu.Root>
    );
}
