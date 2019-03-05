import { Course } from "./model/course";
import { Lesson } from "./model/lesson";
import { EntityState, EntityAdapter } from "@ngrx/entity/src/models";
import { createEntityAdapter } from "@ngrx/entity";
import { CourseActionTypes, CourseActions } from "./course.actions";

/* Objeto a ser mantido na store */
export interface CoursesState extends EntityState<Course> {}

/* Objeto da store com diversos métodos úteis */
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState();

export function coursesReducer(state = initialCoursesState, action: CourseActions): CoursesState {
    switch(action.type) {
        case CourseActionTypes.CourseLoaded:
            return adapter.addOne(action.payload.course, state);
        
        case CourseActionTypes.AllCoursesLoaded:
            return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded:true});    
        
        default: {
            return state;
        }

    }
}

/* Externalizando os métodos do adapter para não ter que implementalos no seletor */
export const { 
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
