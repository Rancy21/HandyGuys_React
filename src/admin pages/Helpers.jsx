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
  Rating,
  Avatar,
  Chip,
  TablePagination
} from "@mui/material";
import "../css/admin.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../components/Helper";
import { People, Category, Star } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Sidebar from "../components/AdminSide";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Helpers = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !user.isAuthenticated ||
      user.email !== "Larryckontsandaga21@gmail.com"
    ) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate, user.email]);
  // State variables
  const [helperSkills, setHelperSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalHelpers, setTotalHelpers] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [helperSearchTerm, setHelperSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [ratingSearchTerm, setRatingSearchTerm] = useState("");

  // Fetch helper skills and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all helper skills
        const helperSkillsResponse = await axios.get(
          "http://localhost:8080/skill/getAllSkills"
        );
        // Correct category names
        const correctedSkills = helperSkillsResponse.data.map((skill) => {
          if (skill.category === "Electrical_repair") {
            skill.category = "Electrical Repair";
          } else if (skill.category === "Event_Planing") {
            skill.category = "Event Planing";
          } else if (skill.category === "WoodWorking") {
            skill.category = "Wood Working";
          }
          return skill;
        });

        setHelperSkills(correctedSkills);

        // Calculate unique total helpers
        const Helpers = await axios.get(
          "http://localhost:8080/users/gethelpers"
        );
        const helpers = Helpers.data;
        setTotalHelpers(helpers.length);

        // Fetch categories
        const categoriesResponse = await axios.get(
          "http://localhost:8080/skill/getCategories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // TODO: Implement error handling toast or notification
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    console.log("Filtered Results:", filteredHelperSkills);
  }, [selectedCategory]);

  // Filter helper skills by category
  const filteredHelperSkills = helperSkills
    .filter((hs) => {
      if (selectedCategory === "All" || hs.category === selectedCategory) {
        return true;
      }
      return false;
    })
    .filter((hs) => {
      // Check if helper name matches search term
      const helperName = `${hs.handyGuy?.firstName || ""} ${
        hs.handyGuy?.lastName || ""
      }`;
      if (helperName.toLowerCase().includes(helperSearchTerm.toLowerCase())) {
        return true;
      }
      return false;
    })
    .filter((hs) => {
      // Check if category matches search term
      if (
        (hs.category || "")
          .toLowerCase()
          .includes(categorySearchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .filter((hs) => {
      // Check if rating matches search term
      if (
        (hs.rating || "")
          .toString()
          .toLowerCase()
          .includes(ratingSearchTerm.toLowerCase()) ||
        (hs.rating == null && ratingSearchTerm.toLowerCase() == "0")
      ) {
        return true;
      }
      return false;
    });

  // Pagination: get current items
  const paginatedHelperSkills = filteredHelperSkills.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handler to open skill details dialog
  const handleOpenDetails = (skill) => {
    setSelectedSkill(skill);
    setOpenDetailsDialog(true);
  };

  // Handler to close skill details dialog
  const handleCloseDetails = () => {
    setSelectedSkill(null);
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
          Service Providers Management
        </Typography>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <People sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                  <Typography variant="h6" color="secondary.main">
                    Total Providers
                  </Typography>
                </Box>
                <Typography variant="h3" color="primary.main">
                  {totalHelpers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Category
                    sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                  />
                  <Typography variant="h6" color="secondary.main">
                    Categories
                  </Typography>
                </Box>
                <Typography variant="h3" color="primary.main">
                  {categories.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Category Filtering */}
        <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant={selectedCategory === "All" ? "contained" : "outlined"}
            onClick={() => setSelectedCategory("All")}
            sx={{ px: 3 }}
          >
            All Skills
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(category)}
              sx={{ px: 3 }}
            >
              {category}
            </Button>
          ))}
        </Box>
        {/* Helper Skills Table */}
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
              {" "}
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                {" "}
                <TableCell
                  sx={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {" "}
                  <div className="table-header-content">
                    {" "}
                    <span>Helper</span>{" "}
                    <TextField
                      variant="outlined"
                      size="small"
                      value={helperSearchTerm}
                      onChange={(e) => setHelperSearchTerm(e.target.value)}
                      placeholder="Helper.."
                      className="search-input"
                    />{" "}
                  </div>{" "}
                </TableCell>{" "}
                <TableCell
                  sx={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {" "}
                  <div className="table-header-content">
                    {" "}
                    <span>Category</span>{" "}
                    <TextField
                      variant="outlined"
                      size="small"
                      value={categorySearchTerm}
                      onChange={(e) => setCategorySearchTerm(e.target.value)}
                      placeholder="Category.."
                      className="search-input"
                    />{" "}
                  </div>{" "}
                </TableCell>{" "}
                <TableCell
                  sx={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {" "}
                  <div className="table-header-content">
                    {" "}
                    <span>Rating</span>{" "}
                    <TextField
                      variant="outlined"
                      size="small"
                      value={ratingSearchTerm}
                      onChange={(e) => setRatingSearchTerm(e.target.value)}
                      placeholder="Rating.."
                      className="search-input"
                    />{" "}
                  </div>{" "}
                </TableCell>{" "}
                <TableCell
                  sx={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  Actions
                </TableCell>{" "}
              </TableRow>{" "}
            </TableHead>
            <TableBody>
              {paginatedHelperSkills.map((helperSkill) => (
                <TableRow
                  key={helperSkill.id}
                  sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {helperSkill.handyGuy.firstName[0]}
                      </Avatar>
                      {`${helperSkill.handyGuy.firstName} ${helperSkill.handyGuy.lastName}`}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={helperSkill.category}
                      sx={{ backgroundColor: "primary.light" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Rating
                      value={
                        helperSkill.rating && helperSkill.rating.avgRating
                          ? helperSkill.rating.avgRating
                          : 0
                      }
                      readOnly
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenDetails(helperSkill)}
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
            count={filteredHelperSkills.length}
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
              Provider Details
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {selectedSkill && (
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
                      {selectedSkill.handyGuy.firstName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {`${selectedSkill.handyGuy.firstName} ${selectedSkill.handyGuy.lastName}`}
                      </Typography>
                      <Chip label={selectedSkill.category} sx={{ mt: 1 }} />
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
                  <Typography>{selectedSkill.handyGuy.email}</Typography>
                  <Typography>{selectedSkill.handyGuy.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="secondary.main"
                    gutterBottom
                  >
                    Skill Details
                  </Typography>
                  <Typography>{selectedSkill.description}</Typography>
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

export default Helpers;
