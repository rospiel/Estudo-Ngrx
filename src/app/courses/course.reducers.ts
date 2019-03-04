import { Course } from "./model/course";
import { Lesson } from "./model/lesson";
import { EntityState, EntityAdapter } from "@ngrx/entity/src/models";
import { createEntityAdapter } from "@ngrx/entity/src/create_adapter";

/* Objeto a ser mantido na store */
export interface CoursesState extends EntityState<Course> {}

/* Objeto da store com diversos métodos úteis */
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();
