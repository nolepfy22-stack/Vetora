import { Course } from '../../types';
import { UNDERGRADUATE_COURSES } from './undergraduateCourses';
import { PPDH_COURSES, PPDH_ROTATION_DETAILS } from './ppdhCurriculum';

export { UNDERGRADUATE_COURSES } from './undergraduateCourses';
export { PPDH_COURSES, PPDH_ROTATION_DETAILS } from './ppdhCurriculum';

export const ALL_COURSES: Course[] = [...UNDERGRADUATE_COURSES, ...PPDH_COURSES];

export const getCoursesBySemester = (semester: number | 'ppdh'): Course[] => {
  if (semester === 'ppdh') {
    return PPDH_COURSES;
  }
  return UNDERGRADUATE_COURSES.filter((c) => c.semesterNumber === semester);
};

export const getCourseById = (id: string): Course | undefined => {
  return ALL_COURSES.find((c) => c.id === id);
};
