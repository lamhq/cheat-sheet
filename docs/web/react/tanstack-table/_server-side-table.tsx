// @ts-nocheck
import { faker } from '@faker-js/faker';
import {
  CircleAlert,
  CircleCheck,
  CircleDot,
  CircleX,
  Clock,
  ListFilter,
  MoreHorizontal,
  Pencil,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Tag,
  Trash2,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { filterFn_includesString } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import IconBadge from './common/components/IconBadge';
import TopLoadingBar from './common/components/TopLoadingBar';
import TableSkeleton from './common/components/TableSkeleton';
import {
  ColumnFilter,
  MultiSelectForm,
  createAppColumnHelper,
  useServerTable,
  useTableContext,
} from './data-table';
import type { QueryFn } from './data-table';

// ============================================================================
// Types
// ============================================================================

type TaskStatus = 'todo' | 'in-progress' | 'done' | 'cancelled';

type TaskLabel = 'bug' | 'feature' | 'documentation' | 'maintenance';

type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  labels: TaskLabel[];
  priority: TaskPriority;
};

// ============================================================================
// Data
// ============================================================================

const taskStatuses = [
  {
    id: 'todo',
    name: 'To do',
    icon: CircleDot,
    className: 'bg-neutral-300/40 border-neutral-300',
  },
  {
    id: 'in-progress',
    name: 'In progress',
    icon: Clock,
    className: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
  },
  {
    id: 'done',
    name: 'Done',
    icon: CircleCheck,
    className: 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
  },
  {
    id: 'cancelled',
    name: 'Cancelled',
    icon: CircleX,
    className:
      'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  },
] as const;

const taskLabels = [
  {
    id: 'bug',
    name: 'Bug',
    className:
      'bg-red-100 text-red-900 border-red-300 dark:bg-red-950 dark:text-red-100 dark:border-red-800',
  },
  {
    id: 'feature',
    name: 'Feature',
    className:
      'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800',
  },
  {
    id: 'documentation',
    name: 'Documentation',
    className:
      'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800',
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    className:
      'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800',
  },
] as const;

const taskPriorities = [
  {
    id: 'low',
    name: 'Low',
    icon: SignalLow,
    className:
      'text-slate-700 border-slate-300 dark:text-slate-200 dark:border-slate-700',
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: SignalMedium,
    className:
      'text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:border-cyan-700',
  },
  {
    id: 'high',
    name: 'High',
    icon: SignalHigh,
    className:
      'text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-700',
  },
  {
    id: 'urgent',
    name: 'Urgent',
    icon: CircleAlert,
    className:
      'text-rose-700 border-rose-300 dark:text-rose-300 dark:border-rose-700',
  },
] as const;

// ============================================================================
// Utility Functions
// ============================================================================

function getTaskLabelById(label: (typeof taskLabels)[number]['id']) {
  return taskLabels.find((item) => item.id === label);
}

function getTaskPriorityById(priority: (typeof taskPriorities)[number]['id']) {
  return taskPriorities.find((item) => item.id === priority);
}

function getTaskStatusById(status: (typeof taskStatuses)[number]['id']) {
  return taskStatuses.find((item) => item.id === status);
}

function createTask(): Task {
  return {
    id: faker.string.uuid(),
    title: faker.hacker.phrase(),
    status: faker.helpers.arrayElement(['todo', 'in-progress', 'done', 'cancelled']),
    labels: faker.helpers.arrayElements([
      'bug',
      'feature',
      'documentation',
      'maintenance',
    ]),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
  };
}

const tasks = Array.from({ length: 100 }, createTask);

const fetchTasks: QueryFn<Task> = async ({
  pagination,
  columnFilters,
  sorting,
  globalFilter,
}) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const filteredTasks = tasks.filter((task) => {
    if (
      globalFilter &&
      !task.title.toLowerCase().includes(globalFilter.toLowerCase())
    ) {
      return false;
    }

    return columnFilters.every(({ id, value }) => {
      const filterValue = value as string | string[];
      const taskValue = task[id as keyof Task];

      if (!filterValue.length) return true;
      if (id === 'title' && typeof taskValue === 'string') {
        return taskValue.toLowerCase().includes(String(filterValue).toLowerCase());
      }
      if (Array.isArray(filterValue) && Array.isArray(taskValue)) {
        return taskValue.some((item) => filterValue.includes(item));
      }
      return Array.isArray(filterValue)
        ? filterValue.includes(String(taskValue))
        : taskValue === filterValue;
    });
  });

  const sortedTasks = [...filteredTasks].sort((firstTask, secondTask) => {
    for (const { id, desc } of sorting) {
      const firstValue = firstTask[id as keyof Task];
      const secondValue = secondTask[id as keyof Task];
      const firstComparable = Array.isArray(firstValue)
        ? firstValue.join(',')
        : String(firstValue);
      const secondComparable = Array.isArray(secondValue)
        ? secondValue.join(',')
        : String(secondValue);
      const comparison = firstComparable.localeCompare(secondComparable);

      if (comparison !== 0) return desc ? -comparison : comparison;
    }

    return 0;
  });

  const start = pagination.pageIndex * pagination.pageSize;
  return [sortedTasks.length, sortedTasks.slice(start, start + pagination.pageSize)];
};

// ============================================================================
// Column Definition
// ============================================================================

const columnHelper = createAppColumnHelper<Task>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={
          table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
        }
        onCheckedChange={(checked) => table.toggleAllRowsSelected(checked === true)}
        aria-label="Select all"
        className="data-indeterminate:border-primary data-indeterminate:text-primary"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        aria-label="Select row"
      />
    ),
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    enableMultiSort: true,
    filterFn: filterFn_includesString,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => <TaskStatusBadge status={getValue()} />,
    filterFn: (row, id, value) => !value.length || value.includes(row.getValue(id)),
    enableMultiSort: true,
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: ({ getValue }) => <TaskPriorityBadge priority={getValue()} />,
    filterFn: (row, id, value) => !value.length || value.includes(row.getValue(id)),
    enableMultiSort: true,
  }),
  columnHelper.accessor('labels', {
    header: 'Labels',
    enableSorting: false,
    cell: ({ getValue }) => <TaskLabels labels={getValue()} />,
    filterFn: (row, id, value) => {
      const rowValues = row.getValue(id) as string[];
      return !value.length || rowValues.some((label) => value.includes(label));
    },
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => <TaskRowActions task={row.original} />,
  }),
]);

// ============================================================================
// Components
// ============================================================================

function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const statusMetadata = getTaskStatusById(status);
  if (!statusMetadata) return null;

  return (
    <IconBadge
      label={statusMetadata.name}
      icon={statusMetadata.icon}
      className={statusMetadata.className}
    />
  );
}

function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const priorityMetadata = getTaskPriorityById(priority);
  if (!priorityMetadata) return null;

  return (
    <IconBadge
      label={priorityMetadata.name}
      icon={priorityMetadata.icon}
      className={priorityMetadata.className}
    />
  );
}

function TaskLabels({ labels }: { labels: TaskLabel[] }) {
  return (
    <div className="inline-flex flex-wrap gap-2">
      {labels.map((label) => (
        <TaskLabelBadge key={label} label={label} />
      ))}
    </div>
  );
}

function TaskLabelBadge({ label }: { label: TaskLabel }) {
  const labelMetadata = getTaskLabelById(label);

  return (
    <IconBadge
      label={labelMetadata?.name ?? label}
      className={labelMetadata?.className}
    />
  );
}

function TaskRowActions({ task }: { task: Task }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal size={16} />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-40">
        {/* Update Task */}
        <DropdownMenuItem
          onClick={() => alert(`Edit action clicked for ${task.id}`)}
        >
          <span>Edit</span>
          <DropdownMenuShortcut>
            <Pencil size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Change Status */}
        {taskStatuses.map((status) => (
          <DropdownMenuItem
            key={status.id}
            onClick={() => alert(`Changing task ${task.id} to ${status.id}`)}
          >
            Set {status.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => alert(`Delete action clicked for ${task.id}`)}
          className="text-red-500!"
        >
          <span>Delete</span>
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TaskBulkActions() {
  const table = useTableContext<Task>();
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleBulkStatusUpdate = (status: TaskStatus) => {
    alert(
      `Changing status for ${selectedRows.length} task${selectedRows.length === 1 ? '' : 's'} to ${status}`,
    );
    table.resetRowSelection();
  };

  const handleBulkPriorityUpdate = (priority: TaskPriority) => {
    alert(
      `Changing priority for ${selectedRows.length} task${selectedRows.length === 1 ? '' : 's'} to ${priority}`,
    );
    table.resetRowSelection();
  };

  const handleBulkLabelsUpdate = async (labels: string[]) => {
    alert(
      `Changing labels for ${selectedRows.length} task${selectedRows.length === 1 ? '' : 's'} to ${labels.join(', ')}`,
    );
    table.resetRowSelection();
  };

  const handleBulkDelete = () => {
    alert(
      `Show delete confirmation for ${selectedRows.length} task${selectedRows.length === 1 ? '' : 's'}`,
    );
    table.resetRowSelection();
  };

  return (
    <>
      {/* Update task status */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    aria-label="Update status"
                    title="Update status"
                  />
                }
              />
            }
          >
            <CircleCheck />
            <span className="sr-only">Update status</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update status</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent sideOffset={14}>
          {taskStatuses.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => handleBulkStatusUpdate(status.id)}
            >
              <status.icon size={16} className="text-muted-foreground" />
              <span>{status.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update task priority */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    aria-label="Update priority"
                    title="Update priority"
                  />
                }
              />
            }
          >
            <ListFilter />
            <span className="sr-only">Update priority</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update priority</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent sideOffset={14}>
          {taskPriorities.map((priority) => (
            <DropdownMenuItem
              key={priority.id}
              onClick={() => handleBulkPriorityUpdate(priority.id)}
            >
              <priority.icon size={16} className="text-muted-foreground" />
              <span>{priority.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update task labels */}
      <Popover>
        <Tooltip>
          <TooltipTrigger
            render={
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    aria-label="Update labels"
                    title="Update labels"
                  />
                }
              />
            }
          >
            <Tag />
            <span className="sr-only">Update labels</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update labels</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent sideOffset={14} className="w-35 p-2" align="start">
          <MultiSelectForm
            onSubmit={handleBulkLabelsUpdate}
            options={taskLabels.map((label) => ({
              label: label.name,
              value: label.id,
            }))}
          />
        </PopoverContent>
      </Popover>

      {/* Delete tasks */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="destructive"
              size="icon"
              onClick={handleBulkDelete}
              className="size-8"
              aria-label="Delete selected tasks"
              title="Delete selected tasks"
            />
          }
        >
          <Trash2 />
          <span className="sr-only">Delete selected tasks</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete selected tasks</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

function TaskToolbar() {
  const table = useTableContext<Task>();

  function getFilterValue<T>(columnId: string, fallback: T): T {
    const filter = table.state.columnFilters.find((item) => item.id === columnId);
    return filter ? (filter.value as T) : fallback;
  }

  return (
    <>
      <Input
        placeholder="Filter by title..."
        value={getFilterValue('title', '')}
        onChange={(event) =>
          table.getColumn('title')?.setFilterValue(event.target.value)
        }
        className="h-8 w-70 sm:w-50"
      />
      <ColumnFilter
        title="Status"
        values={getFilterValue('status', [])}
        onChange={(values) => table.getColumn('status')?.setFilterValue(values)}
        options={taskStatuses.map(({ id, name }) => ({ label: name, value: id }))}
      />
      <ColumnFilter
        title="Labels"
        values={getFilterValue('labels', [])}
        onChange={(values) => table.getColumn('labels')?.setFilterValue(values)}
        options={taskLabels.map(({ id, name }) => ({ label: name, value: id }))}
      />
      <ColumnFilter
        title="Priority"
        values={getFilterValue('priority', [])}
        onChange={(values) => table.getColumn('priority')?.setFilterValue(values)}
        options={taskPriorities.map(({ id, name }) => ({
          label: name,
          value: id,
        }))}
      />
    </>
  );
}

// ============================================================================
// Main Export
// ============================================================================

export default function TaskTable() {
  const { table, data, isFetching } = useServerTable({
    columns,
    queryKeyPrefix: 'tasks',
    queryFn: fetchTasks,
  });

  return (
    <table.AppTable>
      <table.Container>
        <TopLoadingBar open={isFetching} />

        <table.Toolbar>
          <TaskToolbar />
        </table.Toolbar>

        {isFetching && !data && <TableSkeleton columnCount={columns.length} />}

        {(!isFetching || data) && (
          <>
            <table.Table
              className={cn({
                'pointer-events-none opacity-50': isFetching && data,
              })}
            />
            <table.Pagination />
          </>
        )}

        <table.BulkActions>
          <TaskBulkActions />
        </table.BulkActions>
      </table.Container>
    </table.AppTable>
  );
}
