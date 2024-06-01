import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  Modal,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { CustomFetch } from "../axios/CustionFetch";

import CardMedia from "@mui/material/CardMedia";

import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MainCard from "./MainCard";
import Icon from "@mdi/react";
import { mdiDelete, mdiSquareEditOutline } from "@mdi/js";
import { mdiClose } from "@mdi/js";
import { mdiEyeOutline } from "@mdi/js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 990,
  bgcolor: "background.paper",

  borderRadius: "10px",
  boxShadow: 14,
  p: 2,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 150,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Result() {
  const theme = useTheme();
  const [singleData, setSingleData] = useState([]);

  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [total, setTotal] = React.useState("");
  const handleClose2 = () => setOpen2(false);
  const HandleOpen = (id) => {
    setOpen2(true);
    setDeleteId(id);
  };
  const HandleOpen1 = (id) => {
    handleSingleData(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    setOpen2(false);
    handleSingleDelete(deleteId);
  };
  const [data, setData] = useState([]);

  const handleSingleDelete = (id) => {
    CustomFetch.delete(`/api/form/deleteSingle/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CustomFetch.get("/api/form/get")
      .then((res) => {
        console.log(res);
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handleSingleDelete]);

  const handleSingleData = async (id) => {
    CustomFetch.get(`/api/form/getSingle/${id}`)
      .then((res) => {
        console.log(res);
        setSingleData(res.data);
        console.log(singleData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <MainCard title="View Pets Details">
        <h1 className="font-bold text-2xl">Total Pets : {total}</h1>
        <Box>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table
              sx={{ minWidth: "75vw", width: "auto" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl.NO</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>

                  <StyledTableCell>Pet Name</StyledTableCell>
                  <StyledTableCell>Category Name</StyledTableCell>
                  <StyledTableCell>kids friendly</StyledTableCell>
                  <StyledTableCell
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {data.map((value, index) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <img
                            src={`${value.image}`}
                            alt=""
                            style={{ width: "150px", height: "150px" }}
                          />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {value.petName}
                        </StyledTableCell>

                        <StyledTableCell>{value.petType}</StyledTableCell>
                        <StyledTableCell>
                          {value.friendlyWithKids}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <Icon
                              path={mdiDelete}
                              size={1.2}
                              color="red"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                HandleOpen(value._id);
                              }}
                            />

                            <Icon
                              path={mdiEyeOutline}
                              size={1.2}
                              color="green"
                              style={{ cursor: "pointer" }}
                              onClick={() => HandleOpen1(value._id)}
                            />
                            <Link to={`/UpdatePet/${value._id}`}>
                              {" "}
                              <Icon
                                path={mdiSquareEditOutline}
                                size={1.2}
                                color="purple"
                                style={{ cursor: "pointer" }}
                              />
                            </Link>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MainCard>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleClose}>
              <Icon path={mdiClose} size={1.5} color="black" />
            </Button>
          </Box>

          <Card sx={{ display: "flex", width: "900px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}></Box>

            <CardMedia
              component="img"
              sx={{ width: 300 }}
              image={singleData?.image}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <TableHead>
                        {" "}
                        <StyledTableCell1
                          align="left"
                          component="th"
                          scope="row"
                        >
                          petType
                        </StyledTableCell1>
                      </TableHead>
                      <StyledTableCell align="left">
                        {singleData?.petType}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableHead>
                        {" "}
                        <StyledTableCell1
                          align="left"
                          component="th"
                          scope="row"
                        >
                          petName
                        </StyledTableCell1>
                      </TableHead>
                      <StyledTableCell align="left">
                        {singleData?.petName}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableHead>
                        {" "}
                        <StyledTableCell1
                          align="left"
                          component="th"
                          scope="row"
                        >
                          Any disease
                        </StyledTableCell1>
                      </TableHead>
                      <StyledTableCell align="left">
                        {singleData?.anyIllness}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableHead>
                        <StyledTableCell1
                          align="left"
                          component="th"
                          style={{ maxWidth: "200px" }}
                          scope="row"
                        >
                          Description
                        </StyledTableCell1>
                      </TableHead>
                      <StyledTableCell
                        align="left"
                        style={{ maxWidth: "200px" }}
                      >
                        {singleData?.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <h3>Attempting to delete !</h3>
            <Typography variant="h5" color="text.secondary">
              Are you sure, you want to delete the record ?
            </Typography>
          </CardContent>
          <CardActions sx={{ float: "right" }}>
            <Button color="error" onClick={() => handleClose()} size="small">
              Cancel
            </Button>
            <Button color="primary" onClick={() => handleDelete()} size="small">
              Yes, Delete
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
