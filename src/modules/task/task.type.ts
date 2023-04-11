import { User } from "../user/user.type";

export type Task = {
  id: number;
  name: string;
  description: string;
  taskListName: string;
  estimate?: number | string | null;
  twCustomFieldId: number | null
  updated: boolean

  votes?: Record<User, Task["estimate"]>;
};

export type TaskImport = Task & {
  isIncluded: boolean;
};
