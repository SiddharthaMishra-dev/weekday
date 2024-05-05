import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";

const JobCard = ({ job }) => {
  return (
    <Card sx={{ width: 400, borderRadius: "16px", padding: "10px" }}>
      <CardContent sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <img
            src={job.logoUrl}
            className="company-logo"
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span className="job-title">{job.companyName}</span>
            <span className="job-role">{job.jobRole}</span>
            <span className="job-location">{job.location}</span>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold" }}
            fontSize={"1.2rem"}
          >
            Expected Salary:{" "}
          </Typography>
          {job.minJdSalary && job.maxJdSalary ? (
            <span>
              ${job.minJdSalary} - {job.maxJdSalary} LPA
            </span>
          ) : (
            <>
              {job.minJdSalary ? (
                <span>${job.minJdSalary} LPA</span>
              ) : (
                <span>{job.maxJdSalary} LPA</span>
              )}
            </>
          )}
        </Box>

        <Box sx={{ position: "relative" }}>
          <h3>About Company:</h3>
          <h4>About us</h4>
          <p className="job-details">{job.jobDetailsFromCompany}</p>
          <a className="view-job">View job</a>
        </Box>

        <Box>
          <h3>Minimum Experience</h3>
          <span>{job.minExp} years</span>
        </Box>
      </CardContent>

      <Box
        sx={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Button
          fullWidth
          variant="contained"
        >
          Easy Apply
        </Button>
        <Button
          fullWidth
          sx={{
            marginLeft: "0px",
          }}
          variant="contained"
        >
          Unlock Referal
        </Button>
      </Box>
    </Card>
  );
};

export default JobCard;
