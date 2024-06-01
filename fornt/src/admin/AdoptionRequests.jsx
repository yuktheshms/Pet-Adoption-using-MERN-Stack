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
import RequestsDetails from "./requestDetails";

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
import { mdiSquareEditOutline } from "@mdi/js";
import { mdiDelete } from "@mdi/js";
import { mdiClose } from "@mdi/js";
import { mdiEyeOutline } from "@mdi/js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SingleBed } from "@mui/icons-material";
import { CustomFetch } from "../axios/CustionFetch";

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

export default function AdoptionRequests() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    CustomFetch.get("/api/request/get")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteRequest = (id) => {
    CustomFetch.delete(`/api/request/deleteSingle/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("Successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <MainCard title="View Adoption Request">
        <Box>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table
              sx={{ minWidth: "75vw", width: "auto" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl.NO</StyledTableCell>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone no</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((value, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{value.fullName}</StyledTableCell>
                    <StyledTableCell>{value.email}</StyledTableCell>
                    <StyledTableCell>{value.phone}</StyledTableCell>
                    <StyledTableCell>{value.address}</StyledTableCell>
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
                          onClick={() => handleDeleteRequest(value._id)}
                        />
                        <Link
                          to={`/requestsDetails/${value.reqpet}/${value._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="contained">View</Button>
                        </Link>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MainCard>
    </div>
  );
}
