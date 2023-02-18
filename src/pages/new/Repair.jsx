
import ProgressBar from "react-bootstrap/ProgressBar";
import { useForm, Controller } from "react-hook-form";

import { Modal, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import MuiPhoneInput from "material-ui-phone-number";
import Select from "react-select";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function Repair({ buttonName }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const [page, setPage] = useState(1);

      const [file, setFile] = useState("");
      const [firstFormValidated, setFirstFormValidated] = useState(false);


        // ------------- HADNLE FOR NEXT PAGE : WRONG ---> setSocialMedia -----------------
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;



  };
  const handlePrevPage = () => setPage(page - 1);
    return (
        <div>
<Modal.Header >
<Modal.Title className="formMainLable">Reparasjon</Modal.Title>
</Modal.Header>
<form onSubmit={handleSubmit(handleNextPage)}>
<Modal.Body>
  <ProgressBar
    now={40}
    variant="success"
    style={{ margin: "10px" }}
    label={`40%`}
  />
  <div className="">
    <img
      src={
        file
          ? URL.createObjectURL(file)
          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      }
      alt=""
      className="rounded companyLogo mx-auto d-block rounded-circle mt-5"
      width="150px"
    />

    {/* <span className="font-weight-bold">Bedriftslogo</span><span> </span> */}
    <div
      className="col text-center"
      style={{ paddingBottom: "20px" }}
    >
      <label htmlFor="file" style={{ paddingTop: "20px" }}>
       <CloudUploadOutlinedIcon className="icon upload-image" />
      </label>

      <input
        type="file"
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>

    <div className="row mt-2">

    <div className="col-md-6" key="Title">
        <label className="labels">Tjeneste tittel</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="form-control"
          id="title"
          onChange={handleInput}
        />
        {errors.title && (
          <p style={{ color: "red" }}>
            Tjeneste tittel: Dette feltet er obligatorisk!
          </p>
        )}
      </div>

      <div className="col-md-6" key="description">
        <label className="labels">Tjeneste beskrivelse</label>
        <input
          type="text" 
          {...register("description", { required: true })}
          className="form-control"
          id="description"
          name="description"
          onChange={handleInput}
        />
        {errors.description && (
          <p style={{ color: "red" }}>
            Tjeneste beskrivelse: Dette feltet er obligatorisk!
          </p>
        )}
      </div>
    </div>


    <div className="row mt-2">
      <div className="col-md-6" key="streetAddress">
        <label className="labels">Gate adresse</label>
        <input
          type="text"
          id="streetAddress"
          {...register("streetAddress", {
            required: "required",
          })}
          className="form-control"
          placeholder="Oslo Gate 33"
          onChange={handleInput}
        />
        {errors.companyName && (
          <p style={{ color: "red" }}>
            Gate adresse: Dette feltet er obligatorisk!
          </p>
        )}
      </div>

      <div className="col-md-3" key="city">
        <label className="labels">Sted</label>
        <input
          type="text"
          id="region"
          {...register("region", {
            required: "required",
          })}
          className="form-control"
          placeholder="Oslo"
          onChange={handleInput}
        />
        {errors.companyName && (
          <p style={{ color: "red" }}>
            Sted: Dette feltet er obligatorisk!
          </p>
        )}
      </div>

      <div className="col-md-3" key="zipCode">
        <label className="labels">Postnummer</label>
        <input
          type="text"
          id="zipCode"
          className="form-control"
          placeholder="1069"
          {...register("zipCode", {
            required: "required",
          })}
          onChange={handleInput}
        />
        {errors.companyName && (
          <p style={{ color: "red" }}>
            Postnummer: Dette feltet er obligatorisk!
          </p>
        )}
      </div>
    </div>




    {/*<button type="submit"  className="btn btn-primary profile-button">Save data</button> */}
  </div>
</Modal.Body>
<Modal.Footer className="modalFotterCompanyForm">
  <div className="row ">
    <div className="col">
      <Button variant="secondary" onClick={handlePrevPage}>Tilbake</Button>
    </div>
    <div className="col">
      <Button
        variant="primary"
        style={{ height: "auto", width: "100px" }}
        disabled={firstFormValidated}
        type={"submit"}
      >
        Gå videre
      </Button>
    </div>
  </div>
</Modal.Footer>
</form>
</div>

);
}
export default Repair;