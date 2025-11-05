// id student_id course_name: createdAt

import { randomUUID as uuid } from "crypto";

export class Enrollment {
  public readonly id: string;
  public student_id: string;
  public course_name: string;
  public readonly createdAt: Date;

  constructor(props: {student_id: string, course_name: string}, id?: string, createdAt?: Date ) {
    this.student_id = props.student_id;
    this.course_name = props.course_name;
    this.id = id ?? uuid();
    this.createdAt = createdAt ?? new Date();
  }
}