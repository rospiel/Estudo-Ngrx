import { Course } from "./model/course";
import { Lesson } from "./model/lesson";
import { EntityState, EntityAdapter } from "@ngrx/entity/src/models";
import { createEntityAdapter } from "@ngrx/entity/src/create_adapter";

export interface CoursesState extends EntityState<Course> {}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();