import { useContext } from 'react';
import IconButton from '../icon-button';
import SidebarIcon from '../sidebar-icon';
import { Dialog, DialogBackdrop, DialogPanel, CloseButton } from '@headlessui/react';
import clsx from 'clsx';

import { SidebarContext } from '../Layout/CoursePage';

export default function LeftPanel({ ...props }) {
    let { isSidebarOpen, setIsSidebarOpen, isMobileDialogOpen, setIsMobileDialogOpen } =
        useContext(SidebarContext);

    let modules = undefined;

    return (
        <aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r border-gray-950/10 group-data-sidebar-collapsed:hidden max-xl:hidden dark:border-white/10">
            <nav aria-label="Course" className="px-6 py-4">
                <div className="sticky top-4 flex h-6">
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
                    </IconButton>
                    <MobileNavigation
                        open={isMobileDialogOpen}
                        onClose={() => setIsMobileDialogOpen(false)}
                        modules={modules}
                    />
                </div>
                <div className="mt-3">
                    <CourseNavigation props={props} modules={modules} className="max-xl:hidden" />
                </div>
            </nav>
        </aside>
    );
}

function MobileNavigation({ open, onClose, modules }) {
    return (
        <Dialog open={open} onClose={onClose} className="xl:hidden">
            <DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
            <DialogPanel className="fixed inset-y-0 left-0 isolate w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto bg-white ring ring-gray-950/10 sm:w-xs dark:bg-gray-950 dark:ring-white/10">
                <div className="sticky top-0 z-10 px-4 py-4 sm:px-6">
                    <div className="flex h-6 shrink-0">
                        <CloseButton as={IconButton}>
                            <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
                        </CloseButton>
                    </div>
                </div>
                <CourseNavigation
                    modules={modules}
                    onNavigate={onClose}
                    className="px-4 pb-4 sm:px-6"
                />
            </DialogPanel>
        </Dialog>
    );
}

function searchAllWithPaths(obj, predicate, path = [], results = [], visited = new WeakMap()) {
    const depth = path.length;

    if (obj && typeof obj === 'object') {
        const prevDepth = visited.get(obj);
        if (prevDepth !== undefined && prevDepth < depth) {
            return results; // already visited at shallower depth
        }
        visited.set(obj, depth);
    }

    for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
            const value = obj[key];
            const currentPath = [...path, key];

            if (predicate(key, value)) {
                results.push({ path: currentPath, key, value });
            }

            if (value && typeof value === 'object') {
                searchAllWithPaths(value, predicate, currentPath, results, visited);
            }
        }
    }

    return results;
}

function CourseNavigation({ props, modules, onNavigate, className }) {
    console.log(props);
    const foundProps = searchAllWithPaths(
        props,
        (_, value) => value === 'Orientation: Understanding Where You Are'
    );
    console.log(foundProps.sort((_, obj) => obj.path.length));
    let pathname = props.website.activePage.activeRoute;
    // let pathname = usePathname();

    // module.id: ???
    // module.title: Course Name
    // lesson.id: ???
    // lesson.title: Lesson Name

    return (
        <div className={clsx(className, 'space-y-8')}>
            {modules.map((module) => (
                <div key={module.id}>
                    <h2 className="text-base/7 font-semibold text-pretty text-gray-950 sm:text-sm/6 dark:text-white">
                        {module.title}
                    </h2>
                    <ul className="mt-4 flex flex-col gap-4 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-3 sm:text-sm/6 dark:border-white/10 dark:text-gray-400">
                        {module.lessons.map((lesson) => (
                            <li
                                key={lesson.id}
                                className={clsx(
                                    '-ml-px flex border-l border-transparent pl-4',
                                    'hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 dark:hover:text-white',
                                    'has-aria-[current=page]:border-gray-950 dark:has-aria-[current=page]:border-white'
                                )}
                            >
                                <Link
                                    href={`/${lesson.id}`}
                                    aria-current={`/${lesson.id}` === pathname ? 'page' : undefined}
                                    onNavigate={onNavigate}
                                    className="aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white"
                                >
                                    {lesson.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
