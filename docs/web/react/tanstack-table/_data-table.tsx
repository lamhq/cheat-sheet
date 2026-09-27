// @ts-nocheck
/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFnOption,
  type PaginationState,
  type SortingState,
  type SortDirection,
  createPaginatedRowModel,
  createFilteredRowModel,
  createSortedRowModel,
  createTableHook,
  columnFilteringFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Inbox,
  PlusCircle,
  RefreshCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table as TanstackTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ColumnMeta {
  className?: string;
  thClassName?: string;
  tdClassName?: string;
}

type RowData = { id: string };

const features = tableFeatures({
  rowPaginationFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnMeta: metaHelper<ColumnMeta>(),
  paginatedRowModel: createPaginatedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text },
});

type TableFeatures = typeof features;

type ColumnSelectorOption = {
  id: string;
  label: string;
  visible: boolean;
  onVisibilityChange: (visible: boolean) => void;
};

function ColumnSelector({ options: columns }: { options: ColumnSelectorOption[] }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" aria-label="Toggle columns" />}
      >
        <SlidersHorizontal />
        <span className="hidden sm:inline">Columns</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.visible}
              onCheckedChange={(value) => column.onVisibilityChange(value === true)}
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ResetFiltersButton({
  isFiltered,
  onResetFilters,
}: {
  isFiltered: boolean;
  onResetFilters: () => void;
}) {
  if (!isFiltered) return null;
  return (
    <Button variant="ghost" onClick={onResetFilters} className="h-8 px-2">
      <span>Reset</span>
      <X size={12} className="ms-2" />
    </Button>
  );
}

export function ColumnFilter({
  title,
  values,
  onChange,
  options,
}: {
  title?: string;
  values: string[];
  onChange: (selectedValues: string[]) => void;
  options: { label: string; value: string }[];
}) {
  const selectedValues = new Set(values);
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="h-8 border-dashed" />}
      >
        <PlusCircle size={12} />
        <span>{title}</span>
        {selectedValues.size > 0 && (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 h-4 data-vertical:self-auto"
            />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) selectedValues.delete(option.value);
                      else selectedValues.add(option.value);
                      onChange(Array.from(selectedValues));
                    }}
                  >
                    <div
                      className={cn(
                        'flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check size={16} className="text-background" />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onChange([])}
                    className="justify-center text-center"
                  >
                    <RefreshCcw size={16} className="text-muted-foreground/70" />
                    <span>Clear filters</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ColumnHeader({
  sortable,
  sortDirection,
  onAsc,
  onDesc,
  onReset,
  children,
  className,
}: {
  sortable: boolean;
  sortDirection: false | SortDirection;
  onAsc: () => void;
  onDesc: () => void;
  onReset: () => void;
  children?: ReactNode;
  className?: string;
}) {
  if (!sortable) return <div className={cn(className)}>{children}</div>;
  const isAsc = sortDirection === 'asc';
  const isDesc = sortDirection === 'desc';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="xs"
              className="h-8 data-[state=open]:bg-accent"
            />
          }
        >
          <span>{children}</span>
          {isDesc && <ArrowDown size={16} className="ms-2" />}
          {isAsc && <ArrowUp size={16} className="ms-2" />}
          {!isAsc && !isDesc && <ChevronsUpDown size={16} className="ms-2" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onAsc}>
            <ArrowUp size={14} className="text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDesc}>
            <ArrowDown size={14} className="text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {(isAsc || isDesc) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onReset}>
                <RefreshCcw size={14} className="text-muted-foreground/70" />
                Reset
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function EmptyRow({ colSpan, children }: { colSpan: number; children?: ReactNode }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Empty className="min-h-24 border-0 p-4">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>{children}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
}

function Table({
  className,
  emptyMessage = 'There are no rows to display for the current filters.',
}: {
  className?: string;
  emptyMessage?: ReactNode;
}) {
  const table = useTableContext<RowData>();
  return (
    <table.Subscribe
      selector={(state) => ({
        columnVisibility: state.columnVisibility,
        pagination: state.pagination,
        columnFilters: state.columnFilters,
        globalFilter: state.globalFilter,
        sorting: state.sorting,
        rowSelection: state.rowSelection,
      })}
    >
      {() => {
        const rows = table.getRowModel().rows;
        return (
          <div className={cn('overflow-hidden border', className)}>
            <TanstackTable>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="group/row">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        rowSpan={header.rowSpan}
                        className={cn(
                          'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                          { 'px-0': header.column.getCanSort() },
                          header.column.columnDef.meta?.className,
                          header.column.columnDef.meta?.thClassName,
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <ColumnHeader
                            sortable={header.column.getCanSort()}
                            sortDirection={header.column.getIsSorted()}
                            onAsc={() => header.column.toggleSorting(false, true)}
                            onDesc={() => header.column.toggleSorting(true, true)}
                            onReset={() => header.column.clearSorting()}
                          >
                            <table.FlexRender header={header} />
                          </ColumnHeader>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <EmptyRow colSpan={table.getVisibleLeafColumns().length}>
                    {emptyMessage}
                  </EmptyRow>
                ) : (
                  rows.map((row) => (
                    <TableRow key={row.id} className="group/row">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                            cell.column.columnDef.meta?.className,
                            cell.column.columnDef.meta?.tdClassName,
                          )}
                        >
                          <table.FlexRender cell={cell} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </TanstackTable>
          </div>
        );
      }}
    </table.Subscribe>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        'flex flex-1 flex-col gap-4',
      )}
    >
      {children}
    </div>
  );
}

function BulkActions({ children }: { children: ReactNode }): ReactNode | null {
  const table = useTableContext();
  return (
    <table.Subscribe selector={(state) => ({ rowSelection: state.rowSelection })}>
      {() => {
        const selectedCount = table.getFilteredSelectedRowModel().rows.length;
        if (selectedCount === 0) return null;
        return (
          <div
            role="toolbar"
            aria-label={`Bulk actions for ${selectedCount} item(s)`}
            aria-describedby="bulk-actions-description"
            tabIndex={-1}
            className={cn(
              'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl',
              'transition-all delay-100 duration-300 ease-out hover:scale-105',
              'focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none',
            )}
          >
            <div
              className={cn(
                'p-2 shadow-xl',
                'rounded-xl border',
                'bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60',
                'flex items-center gap-x-2',
              )}
            >
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => table.resetRowSelection()}
                      className="size-6 rounded-full"
                      aria-label="Clear selection"
                      title="Clear selection (Escape)"
                    />
                  }
                >
                  <X />
                  <span className="sr-only">Clear selection</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear selection</p>
                </TooltipContent>
              </Tooltip>
              <Separator
                className="h-4 data-vertical:self-auto"
                orientation="vertical"
                aria-hidden="true"
              />
              <div
                className="flex items-center gap-x-1 text-sm"
                id="bulk-actions-description"
              >
                <Badge
                  variant="default"
                  className="min-w-8 rounded-lg"
                  aria-label={`${selectedCount} selected`}
                >
                  {selectedCount}
                </Badge>{' '}
                <span className="hidden sm:inline">
                  item{selectedCount > 1 ? 's' : ''}
                </span>{' '}
                selected
              </div>
              <Separator
                className="h-4 data-vertical:self-auto"
                orientation="vertical"
                aria-hidden="true"
              />
              {children}
            </div>
          </div>
        );
      }}
    </table.Subscribe>
  );
}

function Toolbar({ children }: { children?: ReactNode }) {
  const table = useTableContext();
  return (
    <table.Subscribe
      selector={(state) => ({
        columnVisibility: state.columnVisibility,
        columnFilters: state.columnFilters,
        globalFilter: state.globalFilter,
      })}
    >
      {({ columnFilters, globalFilter }) => {
        const columns: ColumnSelectorOption[] = table
          .getAllLeafColumns()
          .filter((column) => column.getCanHide())
          .map((column) => ({
            id: column.id,
            label:
              typeof column.columnDef.header === 'string'
                ? column.columnDef.header
                : column.id,
            visible: column.getIsVisible(),
            onVisibilityChange: (visible) => column.toggleVisibility(visible),
          }));
        return (
          <div className="flex items-end gap-x-2">
            <div className="flex flex-1 flex-wrap gap-2">
              {children}
              <ResetFiltersButton
                isFiltered={columnFilters.length > 0 || Boolean(globalFilter)}
                onResetFilters={() => {
                  table.resetColumnFilters();
                  table.setGlobalFilter('');
                }}
              />
            </div>
            <ColumnSelector options={columns} />
          </div>
        );
      }}
    </table.Subscribe>
  );
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5;
  const rangeWithDots: (number | '...')[] = [];
  if (totalPages <= maxVisiblePages) {
    for (let page = 1; page <= totalPages; page++) rangeWithDots.push(page);
  } else {
    rangeWithDots.push(1);
    if (currentPage <= 3) {
      for (let page = 2; page <= 4; page++) rangeWithDots.push(page);
      rangeWithDots.push('...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      rangeWithDots.push('...');
      for (let page = totalPages - 3; page <= totalPages; page++)
        rangeWithDots.push(page);
    } else {
      rangeWithDots.push('...');
      for (let page = currentPage - 1; page <= currentPage + 1; page++)
        rangeWithDots.push(page);
      rangeWithDots.push('...', totalPages);
    }
  }
  return rangeWithDots;
}

function Pagination() {
  const table = useTableContext();
  return (
    <table.Subscribe selector={(state) => ({ pagination: state.pagination })}>
      {({ pagination }) => {
        const currentPage = pagination.pageIndex + 1;
        const totalPages = table.getPageCount();
        const pageNumbers = getPageNumbers(currentPage, totalPages);
        const onPageChange = (page: number) => table.setPageIndex(page - 1);
        return (
          <div
            className={cn(
              'flex items-center justify-between overflow-clip px-2',
              '@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4',
              'mt-auto',
            )}
            style={{ overflowClipMargin: 1 }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex w-25 items-center justify-center text-sm font-medium @2xl/content:hidden">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
                <Select
                  value={pagination.pageSize}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="h-8 w-17.5">
                    <SelectValue placeholder={pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="hidden text-sm font-medium sm:block">Rows per page</p>
              </div>
            </div>
            <div className="flex items-center sm:space-x-6 lg:space-x-8">
              <div className="flex w-25 items-center justify-center text-sm font-medium @max-3xl/content:hidden">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="size-8 p-0 @max-md/content:hidden"
                  onClick={() => onPageChange(1)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft size={16} />
                </Button>
                {pageNumbers.map((pageNumber, index) => (
                  <div key={`${pageNumber}-${index}`} className="flex items-center">
                    {pageNumber === '...' ? (
                      <span className="px-1 text-sm text-muted-foreground">...</span>
                    ) : (
                      <Button
                        variant={currentPage === pageNumber ? 'default' : 'outline'}
                        className="h-8 min-w-8 px-2"
                        onClick={() => onPageChange(pageNumber)}
                      >
                        <span className="sr-only">Go to page {pageNumber}</span>
                        {pageNumber}
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 p-0 @max-md/content:hidden"
                  onClick={() => onPageChange(totalPages)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    </table.Subscribe>
  );
}

type MultiSelectFormOption = {
  label: string;
  value: string;
  description?: string;
};
export function MultiSelectForm({
  onSubmit,
  options,
  defaultValues = [],
  submitLabel = 'Submit',
}: {
  onSubmit: (selectedValues: string[]) => Promise<void>;
  options: MultiSelectFormOption[];
  defaultValues?: string[];
  submitLabel?: ReactNode;
}) {
  const form = useForm<{ selectedValues: string[] }>({
    defaultValues: { selectedValues: defaultValues },
  });
  return (
    <form onSubmit={form.handleSubmit((data) => onSubmit(data.selectedValues))}>
      <Controller
        name="selectedValues"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldGroup data-slot="checkbox-group">
            {options.map((option) => {
              const id = `multi-select-form-${option.value}`;
              const checked = field.value.includes(option.value);
              return (
                <Field
                  key={option.value}
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id={id}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    checked={checked}
                    className={cn(
                      'rounded-sm border-primary',
                      !checked && 'opacity-50',
                    )}
                    onCheckedChange={(nextChecked) => {
                      field.onChange(
                        nextChecked
                          ? [...field.value, option.value]
                          : field.value.filter((value) => value !== option.value),
                      );
                      field.onBlur();
                    }}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor={id}>{option.label}</FieldLabel>
                    <FieldDescription>{option.description}</FieldDescription>
                  </FieldContent>
                </Field>
              );
            })}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {submitLabel}
            </Button>
          </FieldGroup>
        )}
      />
    </form>
  );
}

export const { useAppTable, useTableContext, createAppColumnHelper } =
  createTableHook({
    features,
    getRowId: (row) => row.id,
    tableComponents: { Table, Toolbar, Pagination, BulkActions, Container },
  });

type QueryOptions = {
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  globalFilter?: string;
  sorting: SortingState;
};

export type QueryFn<TData extends RowData> = (
  query: QueryOptions,
) => Promise<[rowCount: number, data: TData[]]>;

export function useServerTable<TData extends RowData>({
  columns,
  queryFn: fetchData,
  queryKeyPrefix,
  globalFilterFn,
}: {
  columns: ColumnDef<TableFeatures, TData>[];
  queryFn: QueryFn<TData>;
  queryKeyPrefix: string;
  globalFilterFn?: FilterFnOption<TableFeatures, TData>;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const state = { pagination, columnFilters, globalFilter, sorting };
  const {
    data: [totalCount, items] = [],
    error,
    isFetching,
  } = useQuery({
    queryKey: [queryKeyPrefix, pagination, globalFilter, columnFilters, sorting],
    queryFn: () => fetchData(state),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
  if (error) throw error;
  const table = useAppTable({
    data: items ?? [],
    state,
    columns,
    rowCount: totalCount ?? 0,
    globalFilterFn,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onSortingChange: (updater) => {
      setSorting(updater);
      setPagination((previous) => ({ ...previous, pageIndex: 0 }));
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
      setPagination((previous) => ({ ...previous, pageIndex: 0 }));
    },
    onGlobalFilterChange: (updater) => {
      setGlobalFilter(updater);
      setPagination((previous) => ({ ...previous, pageIndex: 0 }));
    },
    onPaginationChange: setPagination,
  });
  return { table, data: items, isFetching, pagination };
}
