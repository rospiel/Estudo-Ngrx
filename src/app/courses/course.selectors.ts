import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.reducers";

/* Seletor do adapter */
import * as fromCourse from './course.reducers';

/* Seletor com o tipo de entity */
export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

/* Seletor pelo id */
export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll /* Seletor do adapter */
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);