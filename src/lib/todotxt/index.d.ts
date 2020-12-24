export module TodoTxt {}

type sortField =
  | 'priority'
  | 'createdDate'
  | 'completedDate'
  | 'isComplete'
  | 'lineNumber';

enum sortDirection {
  SORT_ASC = 'asc',
  SORT_DESC = 'desc',
}

interface sortFieldOptions {
  field: sortField;
  direction?: sortDirection;
}

interface collections {
  contexts: string[];
  projects: string[];
}

interface addons {
  [key: string]: string;
}

type queryProp = string | string[];

interface queryFunction<T> {
  (arg: T): boolean;
}

interface query {
  id?: queryProp | queryFunction<string>;
  lineNumber?: queryProp | queryFunction<number>;
  isComplete?: queryProp | queryFunction<boolean>;
  completedDate?: queryProp | queryFunction<Date>;
  priority?: queryProp | queryFunction<string>;
  createdDate?: queryProp | queryFunction<Date>;
  contexts?: queryProp | queryFunction<string[]>;
  projects?: queryProp | queryFunction<string[]>;
  addons?: queryProp | queryFunction<addons>;
  textTokens?: queryProp | queryFunction<string[]>;
}

declare namespace TodoTxt {
  const SORT_ASC = sortDirection.SORT_ASC;
  const SORT_DESC = sortDirection.SORT_DESC;

  interface Todo {
    id: () => string;
    lineNumber: () => number;
    isComplete: () => false;
    completedDate: () => Date | null;
    priority: () => string;
    createdDate: () => Date | null;
    contexts: () => string[];
    projects: () => string[];
    addons: () => addons;
    textTokens: () => string[];
    completeTask: () => void;
    uncompleteTask: () => void;
    setCreatedDate: (dt?: Date) => void;
    addContext: (ctxt: string) => void;
    removeContext: (ctxt: string) => void;
    addProject: (prj: string) => void;
    removeProject: (prj: string) => void;
    setAddOn: (key: string, value: any) => void;
    removeAddOn: (key: string) => void;
    replaceWith: (text: string) => void;
    render: () => string;
  }

  interface Todos {
    length: number;
    items: (
      query?: query,
      sortFields?: sortFieldOptions[] | sortField[]
    ) => Todo[];
    render: (
      query?: query,
      sortFields?: sortFieldOptions[] | sortField[]
    ) => string;
    removeItem: (item: Todo | string, allMatches: boolean) => void;
    addItem: (item: Todo | string) => Todo;
    collections: (includeCompleted: boolean) => collections;
  }

  interface parseFile {
    (blob: string): Todos;
  }

  const parseFile: parseFile;

  interface create {
    (): Todos;
  }

  const create: create;
}
