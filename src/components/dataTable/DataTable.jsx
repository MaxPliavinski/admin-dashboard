import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data-table-source";
import { DarkModeContext } from "../../context/darkModeContext";
import "./DataTable.scss";

const DataTable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState(userRows);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkMenu");
    } else {
      document.body.classList.remove("darkMenu");
    }
  }, [darkMode]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="/users/test"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
