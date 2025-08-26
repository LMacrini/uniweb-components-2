import React from 'react';
import clsx from 'clsx/lite';
import { Link } from '@uniwebcms/core-components';
import CoursePage from './CoursePage';

export default function Layout(props) {
    const route = props.website.activePage.activeRoute;

    document.getElementsByTagName('html')[0].className = clsx('scroll-pt-16 font-sans antialiased'); // dark:bg-gray-950
    document.getElementById('Uniweb-Root').className = clsx('isolate');

    let Child = CourseLayout;
    if (route.toLowerCase() === 'courses') {
        Child = CourseList;
    } else if (route.toLowerCase().startsWith('courses/')) {
        Child = CoursePage;
    }
    return <Child {...props} />;
}

function CourseLayout({ ...props }) {
    console.log(props);
    return (
        <Link to="courses">
            <h1 className="prose">this is the layout</h1>
        </Link>
    );
}

function CourseList({ website: { docufolio, websiteLang }, ...props }) {
    const coursesPage = docufolio.documents[0].pages.find((element) => element.route === 'courses');
    const courses = coursesPage.child_items;
    return (
        <ul>
            {courses.map((course) => (
                <li>
                    <Link to={course.route}>{JSON.parse(course.title)[websiteLang]}</Link>
                </li>
            ))}
        </ul>
    );
}
