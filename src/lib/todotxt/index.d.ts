export module TodoTxt {}

enum sortDirection {
  SORT_ASC = 'asc',
  SORT_DESC = 'desc',
}

type query = {
  [key: string]: string | Function | string[];
};

type sortField =
  | 'priority'
  | 'createdDate'
  | 'completedDate'
  | 'isComplete'
  | 'lineNumber';

interface sortFieldOptions {
  field: sortField;
  direction?: sortDirection;
}

interface collections {
  contexts: string[];
  projects: string[];
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
    addons: () => { [key: string]: string };
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
    removeItem: (item: Todo | string) => Todo;
    collections: (includeCompleted: boolean) => collections;
  }

  const parseFile = (blob: string) => Todos;
  const create = () => Todos;
}
