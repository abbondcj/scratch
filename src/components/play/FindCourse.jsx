import React from "react";
import { Nav } from "../nav/Nav";
import { CourseSearch } from "./CourseSearch";

export const FindCourse = () => {
    return (
     <>
        <Nav />
        <h3>Find a course</h3>
        <CourseSearch />
     </>
    );
   };
