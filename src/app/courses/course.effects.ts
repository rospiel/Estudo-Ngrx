import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store/src/actions_subject";
import { CourseActionTypes, CourseRequested, CourseLoaded, AllCoursesRequested, AllCoursesLoaded } from "./course.actions";
import { mergeMap } from "rxjs/internal/operators/mergeMap";
import { CoursesService } from "./services/courses.service";
import { map } from "rxjs/internal/operators/map";

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$
        .pipe(
            ofType<CourseRequested>(CourseActionTypes.CourseRequested), /* Request que estamos aguardando */
            mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)), /* Adiciona o novo course */
            map(course => new CourseLoaded({course})) /* Disponibiliza novo course */
        );
            

    @Effect()
    loadAllCourses$ = this.actions$
        .pipe(
            ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
            mergeMap(action => this.coursesService.findAllCourses()),
            map(courses => new AllCoursesLoaded({courses}) )
        );

    constructor(private actions$: Actions, private coursesService: CoursesService) {

    }

}