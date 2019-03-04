import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { Actions, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store/src/actions_subject";
import { CourseActionTypes, CourseRequested, CourseLoaded } from "./course.action";
import { mergeMap } from "rxjs/internal/operators/mergeMap";
import { CoursesService } from "./services/courses.service";
import { map } from "rxjs/internal/operators/map";

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourses$ = this.actions$
        .pipe(
            ofType<CourseRequested>(CourseActionTypes.CourseRequested), /* Request que estamos aguardando */
            mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)), /* Adiciona o novo course */
            map(course => new CourseLoaded({course})) /* Disponibiliza na store a nova lista de courses */
        );
            

    constructor(private actions$: Actions, private coursesService: CoursesService) {

    }

}