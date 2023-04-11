import { Task, TaskImport } from "../../modules/task/task.type";
import { useTWGet, useTWFetch } from "./useTWFetch.hook";
import { TWTasklist } from "./tasklist.service";
import { computed, reactive, Ref, watch } from "vue";
import { UseFetchOptions, UseFetchReturn } from "@vueuse/core";
import { t } from "vitest/dist/index-2f5b6168";

export type TWTask = {
  id: number;
  name: string;
  tasklistId: number;
  description: string;
};

type CustomFieldTask = {
  customfieldId: number;
  taskId: number;
  value: number | string;
  createdBy: number;
};

type TWTasksFetchResponce = {
  tasks: TWTask[];
  included: {
    customfieldTasks: Record<number, CustomFieldTask>;
    tasklists: Record<number, TWTasklist>;
  };
};

export const useTWTaskCustomfieldUpdate = (
  taskRef: Ref<Task | Partial<Task>>,
) => {
  const asd = computed(() =>
    taskRef.value ? `/tasks/${taskRef.value.id}.json` : "",
  );
  const reqBody = computed(() => ({
    "todo-item": {
      id: taskRef.value.id,
      customFields: [
        {
          customFieldId: 1072,
          value: taskRef.value.estimate,
          customfieldId: 1072,
        },
      ],
    },
  }));

  return useTWFetch(asd, {
    immediate: false,
  }).put(reqBody);
};

export const useTWTaskFetch = (
  taskListId: Ref<number>,
  estimationFieldId: number,
): UseFetchReturn<TaskImport[]> => {
  const url = computed(
    () =>
      `/projects/api/v3/tasklists/${taskListId.value}/tasks.json?includeCustomFields=true&include=taskLists`,
  );
  console.log("wtf");
  const res = useTWGet(url, {
    immediate: false,
    afterFetch: ctx => {
      if (ctx.data.tasks.length > 0) {
        const normalizedTasks = formatTWTasksToFB(ctx.data, estimationFieldId);
        // todo: what the reactive fuck
        ctx.data = reactive(normalizedTasks);
      } else {
        ctx.data = [];
      }

      return ctx;
    },
  });

  watch(taskListId, () => {
    res.execute();
  });

  return res;
};

const formatTWTasksToFB = (
  sourceResponce: TWTasksFetchResponce,
  estimationFieldId: number,
) => {
  const {
    tasks,
    included: { customfieldTasks, tasklists },
  } = sourceResponce;

  const customFieldTasksArray = Object.values(customfieldTasks || {});
  const estimationCustomFields = customFieldTasksArray.filter(
    customfieldTask => customfieldTask.customfieldId === estimationFieldId,
  );
  const taskEstimationsDict = estimationCustomFields.reduce(
    (dict, estimationCustomField) => {
      dict[estimationCustomField.taskId] = estimationCustomField;
      return dict;
    },
    {} as Record<number, CustomFieldTask>,
  );

  const tasklistsArray = Object.values(tasklists);
  const tasklistsDict = tasklistsArray.reduce((dict, tasklist) => {
    dict[tasklist.id] = tasklist.name;
    return dict;
  }, {} as Record<number, string>);

  const fbTasks = tasks.map(
    (twTask): TaskImport => ({
      id: twTask.id,
      name: twTask.name,
      description: twTask.description,
      taskListName: tasklistsDict[twTask.tasklistId],
      estimate: taskEstimationsDict[twTask.id]?.value || null,
      twCustomFieldId: taskEstimationsDict[twTask.id]?.customfieldId || null,
      isIncluded: false,
      updated: false,
    }),
  );
  return fbTasks;
};
