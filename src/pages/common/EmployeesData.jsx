import React, { useEffect, useState } from "react";
import DataTable from "../../components/table/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  getEmployees,
} from "../../redux/features/employeesList";
import { DeleteOutlineTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Popup } from "../../components/popup/Popup";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";
import Heading from "../../components/heading/Heading";

const EmployeesData = () => {
  const [popData, setPopupData] = useState({
    open: false,
    popData: {},
  });
  const schema = [
    {
      field: "Action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ color: "red" }}
              onClick={() => {
                setPopupData({ popData: params?.row, open: true });
              }}
            >
              <DeleteOutlineTwoTone />
            </Button>
          </>
        );
      },
    },
    {
      field: "id",
      headerClassName: "super-app-theme--header",

      headerName: "ID",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",

      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "employeeCode",
      headerClassName: "super-app-theme--header",

      headerName: "Employee Code",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "firstName",
      headerClassName: "super-app-theme--header",

      headerName: "First Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerClassName: "super-app-theme--header",

      headerName: "Last Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "age",
      headerClassName: "super-app-theme--header",

      headerName: "Age",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "birthday",
      headerClassName: "super-app-theme--header",

      headerName: "Birth Day",
      flex: 1,
      minWidth: 200,
      valueGetter: (params) =>
        dayjs(params?.row?.birthday).format("DD MMMM, YYYY"),
    },
    {
      field: "gender",
      headerClassName: "super-app-theme--header",

      headerName: "Gender",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "userType",
      headerClassName: "super-app-theme--header",

      headerName: "User Type",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "organisationId",
      headerClassName: "super-app-theme--header",

      headerName: "Organisation Id",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "appliedleave",
      headerClassName: "super-app-theme--header",

      headerName: "Applied Leave",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const leaves = params?.row?.applliedleaves.length;
        return <>{leaves}</>;
      },
    },
    {
      field: "casualleave",
      headerClassName: "super-app-theme--header",

      headerName: "Casual Leave",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "sickleave",
      headerClassName: "super-app-theme--header",

      headerName: "Sick Leave",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "earnedleave",
      headerClassName: "super-app-theme--header",

      headerName: "Earned Leave",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "country",
      headerClassName: "super-app-theme--header",

      headerName: "Country",
      flex: 1,
      minWidth: 100,
    },
  ];
  //   const rows = [{ ID: 1, AcquirerMID: "9" }];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);
  const { employees, loading } = useSelector((store) => store.employees);
  const rows = employees;

  return (
    <>
      <Loader loading={loading} />
      <Heading title="Employees List" />
      <Popup
        open={popData.open}
        onYes={() => {
          setPopupData({ ...popData, open: false });
          dispatch(deleteEmployee(popData?.popData?.id));
        }}
        onCancel={() => {
          setPopupData({ ...popData, open: false });
        }}
        data={popData}
      />
      <DataTable
        showFooter={false}
        rows={rows}
        rowId={({ id }) => id}
        columns={schema}
      />
    </>
  );
};

export default EmployeesData;
