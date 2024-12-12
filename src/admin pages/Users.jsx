import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Avatar,
  Chip,
  TablePagination,
  TableSortLabel
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../components/Helper";
import { People, PersonAdd, Login } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Sidebar from "../components/AdminSide";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UsersManagement = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !user.isAuthenticated ||
      user.email !== "Larryckontsandaga21@gmail.com"
    ) {
      navigate("/");
      return;
    }
  }, [user.isAuthenticated, navigate, user.email]);
  // State variables
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loggedInUsersThisWeek, setLoggedInUsersThisWeek] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("signUpDate");
  const [order, setOrder] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [emailSearchTerm, setEmailSearchTerm] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get(
          "http://localhost:8080/users/getAllUsers"
        );

        // Calculate total users
        setTotalUsers(usersResponse.data.length);

        // Get List of active users for this month
        const getLog = await axios.get(
          "http://localhost:8080/loginTracker/getTracker"
        );
        setLoggedInUsersThisWeek(getLog.data.length);

        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Sorting function
  const getSortedUsers = (users) => {
    return users.sort((a, b) => {
      const isAsc = order === "asc";
      switch (orderBy) {
        case "signUpDate":
          return (
            (new Date(a.signUpDate) < new Date(b.signUpDate) ? -1 : 1) *
            (isAsc ? 1 : -1)
          );
        case "fullName":
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB) * (isAsc ? 1 : -1);
        default:
          return 0;
      }
    });
  };

  // Filter and paginate users
  const filteredUsers = getSortedUsers(users)
    .filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(nameSearchTerm.toLowerCase())
    )
    .filter((user) =>
      user.email.toLowerCase().includes(emailSearchTerm.toLowerCase())
    );

  // Pagination
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
    setOpenDetailsDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: "240px"
        }}
      >
        <Sidebar />
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: "secondary.main",
            fontWeight: "bold"
          }}
        >
          User Management
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <People sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                  <Typography variant="h6" color="secondary.main">
                    Total Users
                  </Typography>
                </Box>
                <Typography variant="h3" color="primary.main">
                  {totalUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Login sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                  <Typography variant="h6" color="secondary.main">
                    Users Active This Month
                  </Typography>
                </Box>
                <Typography variant="h3" color="primary.main">
                  {loggedInUsersThisWeek}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Users Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography>Full Name</Typography>
                      <TableSortLabel
                        active={orderBy === "fullName"}
                        direction={orderBy === "fullName" ? order : "asc"}
                        onClick={() => handleSort("fullName")}
                      />
                    </Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={nameSearchTerm}
                      onChange={(e) => setNameSearchTerm(e.target.value)}
                      placeholder="Name.."
                      sx={{ ml: 2, width: 150 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography>Email</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={emailSearchTerm}
                      onChange={(e) => setEmailSearchTerm(e.target.value)}
                      placeholder="Email.."
                      sx={{ ml: 2, width: 150 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>Sign-up Date</Typography>
                    <TableSortLabel
                      active={orderBy === "signUpDate"}
                      direction={orderBy === "signUpDate" ? order : "asc"}
                      onClick={() => handleSort("signUpDate")}
                    />
                  </Box>
                </TableCell>
                <TableCell>Is Handy</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user.userId}
                  sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {user.firstName[0]}
                      </Avatar>
                      {`${user.firstName} ${user.lastName}`}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.signUpDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isHandy ? "Yes" : "No"}
                      color={user.isHandy ? "primary" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenDetails(user)}
                      sx={{ minWidth: 100 }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>

        {/* Details Dialog */}
        <Dialog
          open={openDetailsDialog}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 0 }}>
            <Typography variant="h5" color="secondary.main">
              User Details
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {selectedUser && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "primary.main",
                        fontSize: "2rem"
                      }}
                    >
                      {selectedUser.firstName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {`${selectedUser.firstName} ${selectedUser.lastName}`}
                      </Typography>
                      <Chip
                        label={
                          selectedUser.isHandy ? "Handy User" : "Regular User"
                        }
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="secondary.main"
                    gutterBottom
                  >
                    Contact Information
                  </Typography>
                  <Typography>{selectedUser.email}</Typography>
                  <Typography>{selectedUser.phoneNumber || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="secondary.main"
                    gutterBottom
                  >
                    Account Details
                  </Typography>
                  <Typography>
                    Sign-up Date:{" "}
                    {new Date(selectedUser.signUpDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Account Status:{" "}
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDetails} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default UsersManagement;
