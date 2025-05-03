import React, { useEffect, useState } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface GridViewTableProps {
  title?: string;
  columns: Column[];
  fetchData: () => Promise<any[]>;
  searchFunction?: (query: string) => Promise<any[]>;
  rowsPerPage?: number;
  AddComponent?: React.FC<{ onClose: () => void; onCreated: () => void; id?: any; setId?: (id: any) => void }>;
  ViewComponent?: React.FC<{ onClose: () => void; id: any }>;
  actions?: (row: any, setId: (id: any) => void, openAdd: () => void, openView: () => void) => React.ReactNode;
}

const GridViewTable: React.FC<GridViewTableProps> = ({
  title,
  columns,
  fetchData,
  searchFunction,
  rowsPerPage = 6,
  AddComponent,
  ViewComponent,
  actions,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [id, setId] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');

  const refreshData = async () => {
    const res = await fetchData();
    setData(res);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSearch = async () => {
    if (!searchFunction) return;
    const res = await searchFunction(searchValue);
    setData(res);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = Array.from({ length: Math.ceil(data.length / rowsPerPage) }, (_, i) => i + 1);

  return (
    <>
      <h5 className="text-xl font-bold uppercase mb-4">{title}</h5>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        {AddComponent && (
          <button
            onClick={() => {
              setId(null);
              setShowAdd(true);
            }}
            className="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add
          </button>
        )}

        {searchFunction && (
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search here"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="border border-gray-300 rounded-3xl px-4 py-2 w-full sm:w-auto"
            />
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-2xl text-sm hover:bg-gray-500"
              onClick={() => {
                setSearchValue('');
                refreshData();
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {showAdd && AddComponent && (
        <AddComponent onClose={() => setShowAdd(false)} onCreated={refreshData} id={id} setId={setId} />
      )}

      {showView && ViewComponent && (
        <ViewComponent onClose={() => setShowView(false)} id={id} />
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white text-black rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-black min-w-[600px]">
          <thead className="text-xs text-black uppercase bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3">{col.label}</th>
              ))}
              {actions && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={idx} className="bg-white border-b border-gray-200">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-2">
                    {actions(row, setId, () => setShowAdd(true), () => setShowView(true))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center bg-white mt-4">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 h-10 text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((num) => (
            <li key={num}>
              <button
                onClick={() => setCurrentPage(num)}
                className={`px-4 h-10 border border-gray-300 hover:bg-gray-100 ${
                  currentPage === num
                    ? 'text-blue-600 bg-blue-100 font-semibold border-blue-300'
                    : 'text-gray-500 bg-white'
                }`}
              >
                {num}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))}
              disabled={currentPage === pageNumbers.length}
              className="px-4 h-10 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GridViewTable;
