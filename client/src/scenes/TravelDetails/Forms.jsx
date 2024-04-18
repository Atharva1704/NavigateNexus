import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import TravelList from "../TravelList/TravelList";


const travelSchema = yup.object().shape({
    commuteName: yup.string().required("required"),
    commuteCode: yup.string().required("required"),
    departureDateTime: yup.date().typeError("invalid date").required("required"),
    arrivalDateTime: yup.date().typeError("invalid date").required("required"),
    
});

const initialValuesTravel = {
    commuteName:"",
    commuteCode:"",
    departureDateTime:null, 
    arrivalDateTime:null,
  };

const Forms = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [code, setCode] = useState("");
  const [depart, setDepart] = useState("");
  const [arrival, setArrival] = useState("");
  // const [depart, setDepart] = useState("");
  const [ travels, setTravels ] = useState([]);
  const { id } = useParams();

  // const token = useSelector((state) => state.token);

//   useEffect(()=>{
//     axios.get(`http://localhost:3001/findTravelMate/${id}`)
//     .then((response)=>{
//         setTravels(response.data)
//         console.log(travels);
//         // response.json(travels);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
//  },[id]);

  // const fetchTravelDetails = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/findTravelMate`, {
  //       params: {
  //         code: code,
  //         depart: depart,
  //         arrival: arrival
  //       }
  //     });
  //     console.log(response.data);
  //     setTravelDetails(response.data); // Set the array of travel details
  //   } catch (error) {
  //     console.error("Error fetching travel details:", error);
  //   }
  // };


  const travelRecord = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`http://localhost:3001/travel` ,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    onSubmitProps.resetForm();

    if (loggedIn) {
      console.log(loggedIn._id);
      navigate(`/travel-list/${loggedIn._id}`);
    }
  };



  const handleFormSubmit = async (values, onSubmitProps) => {
    travelRecord(values, onSubmitProps);
    // fetchTravelDetails();
    // getone
  };

  return (
    <Box>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesTravel }
      validationSchema={travelSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            
            {/* commuteName commuteCode departureDateTime arrivalDateTime */}

            <TextField
              label="Train Name"
              onBlur={handleBlur}
              onChange={
                handleChange
              
              }
              value={values.commuteName}
              name="commuteName"
              error={Boolean(touched.commuteName) && Boolean(errors.commuteName)}
              helperText={touched.commuteName && errors.commuteName}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Train Number"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setCode(e.target.value); // Update commuteCode state
              }}
              value={values.commuteCode}
              name="commuteCode"
              error={Boolean(touched.commuteCode) && Boolean(errors.commuteCode)}
              helperText={touched.commuteCode && errors.commuteCode}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
            label="Departure Date and Time"
            type="datetime-local"
            onBlur={handleBlur}
            onChange={(e)=>{
              handleChange(e);
              setDepart(e.target.value);
            }}
            value={values.departureDateTime}
            name="departureDateTime"
            error={Boolean(touched.departureDateTime) && Boolean(errors.departureDateTime)}
            helperText={touched.departureDateTime && errors.departureDateTime}
            sx={{ gridColumn: "span 4" }}
            InputLabelProps={{
                shrink: true,
            }}
            />

            <TextField
            label="Arrival Date and Time"
            type="datetime-local"
            onBlur={handleBlur}
            onChange={(e)=>{
              handleChange(e);
              setArrival(e.target.value);
            }}
            value={values.arrivalDateTime}
            name="arrivalDateTime"
            error={Boolean(touched.arrivalDateTime) && Boolean(errors.arrivalDateTime)}
            helperText={touched.arrivalDateTime && errors.arrivalDateTime}
            sx={{ gridColumn: "span 4" }}
            InputLabelProps={{
                shrink: true,
            }}
            />

            {/* <TextField
              label="departureDateTime"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.departureDateTime}
              name="departureDateTime"
              error={Boolean(touched.departureDateTime) && Boolean(errors.departureDateTime)}
              helperText={touched.departureDateTime && errors.departureDateTime}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="arrivalDateTime"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.arrivalDateTime}
              name="arrivalDateTime"
              error={Boolean(touched.arrivalDateTime) && Boolean(errors.arrivalDateTime)}
              helperText={touched.arrivalDateTime && errors.arrivalDateTime}
              sx={{ gridColumn: "span 4" }}
            /> */}
            
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Send Details
            </Button>
            
          </Box>
        </form>
      )}
    </Formik>
    {/* <TravelList commuteCode={code} depart={depart} arrival={arrival} /> */}
    </Box>

  );
};

export default Forms;