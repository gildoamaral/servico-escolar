import { randomUUID as uuid } from "crypto";

export class Course {
  public readonly id: string;
  public title: string;
  public description: string | null;

  constructor(
    props: { title: string; description?: string | null },
    id?: string
  ) {
    this.title = props.title;
    this.description = props.description ?? null;
    this.id = id ?? uuid();
  }
}
