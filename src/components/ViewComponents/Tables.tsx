import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import PropTypes from "prop-types";
//import ReactToPrint from "react-to-print";
//import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
//import Dialog from "../Dialog-Box/dialog";
//import SelectedRowsPrint from "../../Print/selectedRowsPrint";
//import { pageStyle } from "../../Print/printPagesStyles";

interface HeadCell {
  label: string;
  numeric?: boolean;
  id: (row: any) => any;
  color?: boolean;
}

interface Action {
  name: string;
  callBack: (event: MouseEvent<HTMLButtonElement>, selected: string[]) => Promise<void>;
}

interface TableViewProps {
  title: string;
  headCells: HeadCell[];
  service: any;
  noAdding?: boolean;
  AddComponent: React.ComponentType<any>;
  editable?: boolean;
  deletable?: boolean;
  actions?: Action[];
  searchable?: boolean;
  ViewComponent?: React.ComponentType<any>;
  dialogBoxWidth?: string;
  customService?: any;
  lockable?: boolean;
  periodicSearch?: boolean;
  withoutLocationFilter?: boolean;
  sendSms?: boolean;
  productSmsStatus?: boolean;
  [key: string]: any;
}

interface ServiceResponse {
  rows: any[];
  loading: boolean;
}

const TableView: React.FC<TableViewProps> = (props) => {
  const {
    title,
    headCells,
    service,
    noAdding,
    AddComponent,
    editable,
    deletable,
    actions,
    searchable,
    ViewComponent,
    dialogBoxWidth,
    customService,
    lockable,
    periodicSearch,
    withoutLocationFilter,
    sendSms,
    productSmsStatus,
    ...rest
  } = props;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [searchSubmitted, setSearchSubmitted] = useState<string | boolean>("");
  const [open, setOpen] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [lockAble, setLockable] = useState<boolean>(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [services, setServices] = useState<ServiceResponse>({ rows: [], loading: false });
  const [smsStatus, setSmsStatus] = useState<ServiceResponse>({ rows: [], loading: false });

  //const dispatch = useDispatch();

  const locationCode = JSON.parse(localStorage.getItem("BIZX_LOCATION") || "{}").code;

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const today = date.toISOString().split("T")[0];

  const fetchTableRows = async (searchVal?: string) => {
    setData([]);
    setLoading(true);
    try {
      const results =
        searchVal && searchVal !== ""
          ? await service.search(searchVal)
          : customService ? await customService : await service.getAll();

      const locationFilteredData = results.filter((row: any) => row.stockLocationCode === locationCode);
      withoutLocationFilter ? setData(results) : setData(locationFilteredData);
      setSelected([]);
    
    } catch (e) {
     // dispatch(openSnackbar(true, "error", e));
     console.log(e)
    }
    setLoading(false);
  };


  const handleDelete = async (code: string, setSelected: (selected: string[]) => void) => {
    try {
      await service.delete(code);
      fetchTableRows();
      setSelected([]);
      //dispatch(openSnackbar(true, "success", `Deleted successfully`));
    } catch (e) {
      //dispatch(openSnackbar(true, "error", e));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchTableRows();
    return () => {
      controller.abort();
    };
  }, [formSubmitted]);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchSubmitted(search);
      fetchTableRows(search);
      setPage(0);
    } else if (e.key === "Escape") {
      setSearch("");
      fetchTableRows();
      setSearchSubmitted(false);
    }
  };



  const EnhancedTableHead: React.FC<{ onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void; numSelected: number; rowCount: number }> = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">
            <input
              type="checkbox"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              className="form-checkbox"
            />
          </th>
          {headCells.map((headCell, index) => (
            <th
              key={index}
              className={`p-2 text-left ${headCell.numeric ? "text-right" : ""}`}
            >
              {headCell.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const EnhancedTableToolbar: React.FC<{ numSelected: number; title: string }> = (props) => {
    const { numSelected, title } = props;
    const componentRef = useRef<HTMLDivElement>(null);
    return (
      <div className={`flex justify-between items-center p-2 ${numSelected > 0 ? "bg-blue-500 text-white" : ""}`}>
        {numSelected > 0 && (
          <>
            <div className="flex-1 mr-3">
              {numSelected} selected
            </div>
            {numSelected === 1 && (
              <>
                {/* {editable && (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => {
                        if (data.find((row) => row.code === selected[0] && row.isLocked === 1)) {
                          alert(`This ${title} is Already Locked`);
                        } else
                          setEditOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <Dialog
                      maxWidth={dialogBoxWidth ? dialogBoxWidth : "md"}
                      open={editOpen}
                      setOpen={setEditOpen}
                      title={`Edit ${title === undefined ? "" : title}`}
                    >
                      <AddComponent
                        setSubmitted={setFormSubmitted}
                        code={selected.length === 1 ? selected : null}
                        setOpen={setEditOpen}
                        {...rest}
                      />
                    </Dialog>
                  </>
                )} */}
              </>
            )}
            {deletable && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  if (window.confirm("Are you sure want to delete this?"))
                    selected.length === 1 &&
                    handleDelete(selected[0], setSelected);
                }}
              >
                Delete
              </button>
            )}
            {/* {ViewComponent && (
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => {
                    setViewOpen(true);
                  }}
                >
                  View
                </button>
                <Dialog
                  fullScreen
                  open={viewOpen}
                  setOpen={setViewOpen}
                  title={`${title === undefined ? "" : title} View`}
                >
                  <ViewComponent
                    code={selected.length === 1 ? selected : null}
                    //pageStyle={pageStyle.a4}
                  />
                </Dialog>
              </div>
            )} */}
          </>
        )}
        {actions?.map((action, i) => (
          <button
            key={i}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={async (event) => {
              await action.callBack(event, selected);
              fetchTableRows();
            }}
          >
            {action.name}
          </button>
        ))}
        {/* <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Print
            </button>
          )}
          content={() => componentRef.current}
          //pageStyle={pageStyle.a4}
          documentTitle={`${title} report`}
        /> */}
        {/* <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <div className="p-4">
              <h1 className="text-2xl font-bold">{`${title} Information`}</h1>
              <SelectedRowsPrint
                code={selected}
                headCells={headCells}
                rows={data}
              />
            </div>
          </div>
        </div> */}
      </div>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<HTMLTableRowElement>, code: string) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);


  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center w-full">
          {/* {AddComponent && !noAdding && (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
                onClick={handleClickOpen}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add {title}
              </button>
              <Dialog
                maxWidth={dialogBoxWidth ? dialogBoxWidth : "md"}
                open={open}
                setOpen={setOpen}
                title={`Add ${title === undefined ? "" : title}`}
              >
                <AddComponent
                  setSubmitted={setFormSubmitted}
                  setOpen={setOpen}
                  {...rest}
                />
              </Dialog>
            </>
          )} */}
          {searchable && (
            <div className="flex items-center">
              <input
                type="text"
                value={search}
                className="border p-2 rounded-l-md focus:outline-none"
                placeholder="Search.."
                onKeyUp={handleSearch}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-r-md"
                onClick={() => {
                  setSearch("");
                  fetchTableRows();
                  setSearchSubmitted(false);
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
        {searchSubmitted && (
          <p className="text-center mb-2">
            Search result of{" "}
            <span className="text-red-500">"{searchSubmitted}"</span>{" "}
            <span
              onClick={() => {
                setSearch("");
                fetchTableRows();
                setSearchSubmitted(false);
              }}
              className="text-blue-500 underline cursor-pointer"
            >
              Clear it
            </span>
          </p>
        )}

        <div>
        
          {selected.length > 0 && (
            <EnhancedTableToolbar numSelected={selected.length} title={title} />
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={data.length}
              />
              <tbody>
                {data && data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.code);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <tr
                        key={index}
                        onClick={(event) => handleClick(event, row.code)}
                        className={`cursor-pointer ${isItemSelected ? "bg-gray-200" : ""}`}
                      >
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={isItemSelected}
                            className="form-checkbox"
                          />
                        </td>
                        {headCells.map((cell, index) => (
                          <td
                            key={index}
                            className={`p-2 ${cell.numeric ? "text-right" : "text-left"} ${
                              cell.color
                                ? cell.id(row) > 0
                                  ? "bg-red-200"
                                  : "bg-green-200"
                                : "bg-white"
                            }`}
                          >
                            {cell.id(row) !== null
                                ? cell.id(row)
                              : " - "}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={headCells.length + 1} className="text-center p-4">
                      {loading === true
                        ? "Loading..."
                        : `No ${title} to display.`}
                    </td>
                  </tr>
                )}
                {emptyRows > 0 && (
                  <tr style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <td colSpan={headCells.length + 1} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center p-2">
            <div>
              Rows per page:{" "}
              <select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                className="border p-2 rounded-md"
              >
                {[5, 10, 25, 100].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value={9999999999999}>All</option>
              </select>
            </div>
            <div>
              Page {page + 1} of {Math.ceil(data.length / rowsPerPage)}
              <button
                onClick={() => handleChangePage(null, page - 1)}
                disabled={page === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Previous
              </button>
              <button
                onClick={() => handleChangePage(null, page + 1)}
                disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
          <div className="flex items-center p-2">
            <input
              type="checkbox"
              checked={dense}
              onChange={handleChangeDense}
              className="form-checkbox mr-2"
            />
            <label>Dense padding</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableView;
