import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.reducers";

/* Seletor com o tipo de entity */
export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

/* Seletor pelo id */
export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);