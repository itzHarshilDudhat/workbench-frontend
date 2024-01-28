import { Props } from "../../helper/interface";

const Table = <T,>(props: Props<T>) => {
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {props.columns.map((col, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`px-6 py-3 text-${
                        col.align || "left"
                      } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                    >
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.data.map((item, i) => (
                  <tr key={i}>
                    {props.columns.map((col, key) => (
                      <td className="px-6 py-4 whitespace-nowrap" key={key}>
                        <div
                          className={`flex items-center justify-${
                            col.align === "right"
                              ? "end"
                              : col.align === "center"
                                ? "center"
                                : "start"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {col.render(item, key)}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={props.columns.length}
                    className="px-6 py-2 whitespace-nowrap border-t border-gray-200"
                  >
                    {/* Pagination goes here */}
                    <div className="whitespace-nowrap">
                      <nav className="flex items-center justify-between">
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing
                            {props.pagination.total >
                              props.pagination.limit && (
                              <>
                                <span className="font-medium ml-1 mr-1">
                                  {props.pagination.limit}
                                </span>
                                of
                              </>
                            )}
                            <span className="font-medium ml-1 mr-1">
                              {props.pagination.total}
                            </span>
                            results
                          </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                          <button
                            disabled={
                              !props.pagination.paginationAvailability.pre
                            }
                            onClick={props.setPagination.onPreviousPage}
                            className="relative inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </button>
                          <button
                            disabled={
                              !props.pagination.paginationAvailability.next
                            }
                            onClick={props.setPagination.onNextPage}
                            className="ml-3 relative inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </button>
                        </div>
                      </nav>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
