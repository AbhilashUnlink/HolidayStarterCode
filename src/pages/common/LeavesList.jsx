import React, { useEffect, useState } from "react";
import DataTable from "../../components/table/DataTable";
import { useDispatch, useSelector } from "react-redux";

import { CancelRounded, DeleteOutlineTwoTone, Done } from "@mui/icons-material";
import { Button } from "@mui/material";
import Loader from "../../components/loader/Loader";
import {
  getLeavesList,
  patchLeave,
  deleteLeave,
  resetLeavesResponse,
} from "../../redux/features/leavesList";
import { BasicPopup } from "../../components/popup/BasicPopup";
import dayjs from "dayjs";
import Heading from "../../components/heading/Heading";

const LeavesList = () => {
  const [popupData, setPopupData] = useState({
    open: false,
    data: {},
    heading: "",
    onAccept: () => {},
  });
  const { open, heading, data, onAccept } = popupData;

  const schema = [
    {
      field: "Approve",
      headerClassName: "super-app-theme--header",
      headerName: "Approve",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.leaveStatus === "PENDING" ? (
              <Button
                style={{ color: "green" }}
                onClick={() => {
                  setPopupData({
                    data: params?.row,
                    open: true,
                    heading: "Do You Want To Approve?",
                    onAccept: () => {
                      dispatch(
                        patchLeave({ id: params?.row?.id, status: "ACCEPTED" })
                      );

                      setPopupData({ ...data, open: false });
                    },
                  });
                }}
              >
                <Done />
              </Button>
            ) : (
              <center style={{ width: "100%" }}>
                <Done style={{ color: "gray" }} />
              </center>
            )}
          </>
        );
      },
    },
    {
      field: "Reject",
      headerClassName: "super-app-theme--header",
      headerName: "Reject",
      minWidth: 70,
      maxWidth: 70,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ color: "red" }}
              onClick={() => {
                setPopupData({
                  data: params?.row,
                  open: true,
                  heading: "Do You Want To Reject?",
                  onAccept: () => {
                    dispatch(
                      patchLeave({ id: params?.row?.id, status: "ACCEPTED" })
                    );

                    setPopupData({ ...data, open: false });
                  },
                });
              }}
            >
              <CancelRounded />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerClassName: "super-app-theme--header",
      headerName: "Delete",
      minWidth: 70,
      maxWidth: 70,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ color: "red" }}
              onClick={() => {
                setPopupData({
                  data: params?.row,
                  open: true,
                  heading: "Do You Want To Delete?",
                  onAccept: () => {
                    dispatch(deleteLeave(params?.row?.id));

                    setPopupData({ ...data, open: false });
                  },
                });
              }}
            >
              <DeleteOutlineTwoTone />
            </Button>
          </>
        );
      },
    },
    {
      field: "firstName",
      headerClassName: "super-app-theme--header",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "casualleave",
      headerClassName: "super-app-theme--header",
      headerName: "Casual Leave",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "sickleave",
      headerClassName: "super-app-theme--header",
      headerName: "Sick Leave",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "earnedleave",
      headerClassName: "super-app-theme--header",
      headerName: "Earned Leave",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "from",
      headerClassName: "super-app-theme--header",
      headerName: "From",
      flex: 1,
      minWidth: 200,
      valueGetter: (param) => dayjs(param.row.from).format("DD MMMM, YYYY"),
    },
    {
      field: "to",
      headerClassName: "super-app-theme--header",
      headerName: "To",
      flex: 1,
      minWidth: 150,
      valueGetter: (param) => dayjs(param.row.TO).format("DD MMMM, YYYY"),
    },
    {
      field: "leaveStatus",
      headerClassName: "super-app-theme--header",
      headerName: "Leave Status",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "leaveType",
      headerClassName: "super-app-theme--header",
      headerName: "Leave Type",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "reasonForLeave",
      headerClassName: "super-app-theme--header",
      headerName: "Reason For Leave",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "userId",
      headerClassName: "super-app-theme--header",
      headerName: "User Id",
      flex: 1,
      minWidth: 150,
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeavesList());
  }, [dispatch]);
  const { response } = useSelector((store) => store.leaves);
  useEffect(() => {
    if (response?.status === 200) {
      dispatch(resetLeavesResponse());
    }
  }, [dispatch, response]);
  const { leaves, loading } = useSelector((store) => store?.leaves);
  const rows = leaves;

  return (
    <>
      <Loader loading={loading} />
      <Heading title="Leaves List" />

      <BasicPopup
        open={open}
        onYes={onAccept}
        heading={heading}
        onCancel={() => {
          setPopupData({
            ...popupData,
            open: false,
          });
        }}
        data={data}
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

export default LeavesList;
