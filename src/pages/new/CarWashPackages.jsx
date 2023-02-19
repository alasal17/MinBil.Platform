/** @format */

import ProgressBar from "react-bootstrap/ProgressBar";
import { useForm, Controller } from "react-hook-form";

import { Modal, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import MuiPhoneInput from "material-ui-phone-number";
import Select from "react-select";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import axios from "axios";



function CarWashPackages({ buttonName }) {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([
    {
      title: "",
      sum: "",
      sum_small_car: "",
      sum_normal_car: "",
      sum_big_car: "",
    },
  ]);
  const [file, setFile] = useState("");
  const [firstFormValidated, setFirstFormValidated] = useState(false);
  const [addFieldIcon, setAddFieldIcon] = useState(false);
  const [tagsData, setTags] = useState([]);
  const [currentDateFormat, setCurrentDateFormat] = useState(new Date());
  const [prompt, setPrompt] = useState("");
  const  organization = "org-KcC5XEDCZrFwkYAqj6pFUWHI";
  const apiKey = "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";
  const [response, setResponse] = useState(null);
  const [chatGPTShow, setChatGPTShow ] = useState(true);
  const [loading, setLoading] = useState(false);
  let [obj, setObj] = useState({ choices: [] });

  const [payload, setPayLoad] = useState({
    prompt: "Mario: Hi, how are you?",
    temperature: 0.9,
    n: 1,
    max_tokens: 500,
    model: "text-davinci-003"
  });
  

  const getRes = () => {

    setLoading(true);
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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"
      }
    })
      .then((res) => {
        console.log(res);
        responseHandler(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message, e);
      });
  };


  
  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };


  const handleChatGTPShowChange = () => {
    setChatGPTShow(!chatGPTShow);
  };


  // ------------- HADNLE FOR NEXT PAGE : WRONG ---> setSocialMedia -----------------
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
  };

  const tags_options = [
    { value: "Innvending/utvendig vask", label: "Innvending/utvendig vask" },
    {
      value: "Innvendig/utvendig vask med polering og motorvask",
      label: "Innvendig/utvendig vask med polering og motorvask",
    },
    { value: "Utvendig vask", label: "Utvendig vask" },
    {
      value: "Utvendig vask med polering",
      label: "Utvendig vask med polering",
    },
    { value: "Innvendig vask", label: "Innvendig vask" },
    { value: "Motorvask", label: "Motorvask" },
    { value: "Innvendig rens", label: "Innvendig rens" },
    { value: "Skinnbehandling", label: "Skinnbehandling" },
    { value: "Avfoliering", label: "Avfoliering" },
    { value: "Utvendig vask", label: "Utvendig vask" },
    { value: "Ozonbehandling", label: "Ozonbehandling" },
    { value: "Glassforsegling", label: "Glassforsegling" },
    { value: "Keramisk lakkforsegling", label: "Keramisk lakkforsegling" },
    { value: "Lakkrens", label: "Lakkrens" },
    { value: "Rens av matter, gummi etc", label: "Rens av matter, gummi etc" },
    { value: "Lakk korrigering", label: "Lakk korrigering" },
  ];
  const price_name = ["Pris", "Pris vanlig bil", "Pris stor bil"];

  const handleChangeBusnissHours = (e, index) => {
    const updatedPrice = [...price];
    updatedPrice[index][e.target.name] = e.target.value ?? "";
    setPrice(updatedPrice);
    console.log(updatedPrice);
    price.map((e) => {});
  };

  const getCurrentDateInput = () => {
    const dateObj = new Date();

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  useEffect(() => {
    const formSelected = document.getElementsByName("Pris");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleDateString("default", {
      month: "long",
    });
    const currentMonth2 = currentDate.getMonth();
    const dayMonth = currentDate.getDate();

    console.log(currentYear);
    console.log(currentMonth);
    console.log(dayMonth);

    setCurrentDateFormat(
      new Date(currentMonth2 + "-" + dayMonth + "-" + currentYear)
    );

    if (price.length > 1) {
      formSelected[0].value = "Pris liten bil";
    }
  }, []);

  const handleAddDay = (e, index) => {
    if (price.length < 3) {
      setPrice([
        ...price,
        {
          title: "",
          sum: "",
          sum_small_car: "",
          sum_normal_car: "",
          sum_big_car: "",
        },
      ]);

      if (price.length === 3) {
        setAddFieldIcon(true);
      }
    } else {
      setAddFieldIcon(true);
    }

    console.log(price);
  };

  const handleRemoveClick = (index) => {
    const list = [...price];
    list.splice(index, 1);
    setPrice(list);
  };

  const handlePrevPage = () => setPage(page - 1);


  const handlePropInputChange =(e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setPayLoad({
        ...payload,
           prompt:  "fungere som ekspert. Gi meg beskrivelsen som en tjeneste eller et produkt jeg selger. det skal fungere som en reklame " + value  
         });
  }
  return (
    <div>
      <Modal.Header>
        <Modal.Title className='formMainLable'>Bilvask</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleNextPage)}>
        <Modal.Body>
          <ProgressBar
            now={40}
            variant='success'
            style={{ margin: "10px" }}
            label={`40%`}
          />
          <div className=''>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=''
              className='rounded companyLogo mx-auto d-block rounded-circle mt-5'
              width='150px'
            />

            {/* <span className="font-weight-bold">Bedriftslogo</span><span> </span> */}
            <div className='col text-center' style={{ paddingBottom: "20px" }}>
              <label htmlFor='file' style={{ paddingTop: "20px" }}>
                <CloudUploadOutlinedIcon className='icon upload-image' />
              </label>

              <input
                type='file'
                id='file'
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            <div className='row mt-2'>
              <div className='col-md-6' key='Title'>
                <label className='labels'>Tjeneste tittel</label>
                <input
                  type='text'
                  {...register("title", { required: true })}
                  className='form-control'
                  id='title'
                  onChange={handleInput}
                />
                {errors.title && (
                  <p style={{ color: "red" }}>
                    Tjeneste tittel: Dette feltet er obligatorisk!
                  </p>
                )}
              </div>

              <div className='col-md-6'>
                <label>Aktiv fra dato</label>
                <input
                  type='date'
                  className='form-control'
                  defaultValue={getCurrentDateInput()}
                />
              </div>
            </div>
            <div className="row mt-2" style={{paddingTop:'10px'}}>
              <div className="col-md-6">
              <input
                        type="checkbox"
                        className="form-check-input "
                        id="performsTrucks"
                        checked={!chatGPTShow}
                        onChange={handleChatGTPShowChange}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="form-check-label"
                        key="performsTrucks"
                        htmlFor="exampleCheck1"
                      >
                        Bruk AI til tjeneste beskrivelse?
                      </label>
              </div>

              <div className="col-md-6">
              <input
                        type="checkbox"
                        className="form-check-input "
                        id="performsTrucks"
                        checked={!chatGPTShow}
                        onChange={handleChatGTPShowChange}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="form-check-label"
                        key="performsTrucks"
                        htmlFor="exampleCheck1"
                      >
                        Bruk AI til tjeneste bilde?
                      </label>
              </div>
              
              </div>

            <div className='row mt-2 'hidden={!chatGPTShow} >
              <div className='col-md-12' key='description'>
                <label className='labels'>Tjeneste beskrivelse</label>
                <textarea
                  type='textarea'
                  {...register("description", { required: true })}
                  className='form-control'
                  id='description'
                  name='description'
                  as='textarea'
                  style={{height:'150px'}}
                  
                  rows={3}
               
                />
                {errors.description && (
                  <p style={{ color: "red" }}>
                    Tjeneste beskrivelse: Dette feltet er obligatorisk!
                  </p>
                )}
              </div>
            </div>

           


            <div className="row mt-2" hidden={chatGPTShow}>
              <div className="col-md-6">
              <label className='labels'>Søk etter tjeneste beskrivelse her</label>
              <textarea
               type='textarea'
               {...register("description", { required: true })}
               className='form-control'
               id='description'
               name='description'
               style={{height:'150px'}}
               as='textarea'
               rows={3}
               placeholder='Gi meg en beksrivelse av dekkskift.'
             onChange={handlePropInputChange}
             value={payload.prompt.replace("fungere som ekspert. Gi meg beskrivelsen som en tjeneste eller et produkt jeg selger. det skal fungere som en reklame ", '')}
               // onChange={(e) => {
              //   
              // }}
            />

              </div>
             
              <div className="col-md-6">
              <label className='labels'>Resultat</label>
              <textarea
              style={{height:'150px'}}
              className='form-control'
               type='textarea'
              value={obj.choices.map((v, i) => v.text || '')}/>
</div>
              </div>


            <div className="row mt-2" hidden={chatGPTShow}>
            <div className="col-md-4">
              </div>
              <div className="col-md-3">
              <Button disabled={loading} type="submit"  variant='primary' onClick={getRes}>
            {loading ? "Loading... " : "Hent resultat"}
          </Button>
              </div>
              <div className="col-md-5">
              </div>
            </div>


            <div className='row mt-2'>
              <h6 style={{ paddingTop: "20px", paddingBottom: "10px" }}>
                Legg til pakkenavn og pris
              </h6>
              {/* {price.map((field, index) => (
                    <div className="row mt-2 " key={index}>


                    <div className="col-md" w key="price_title">
                    <label className="labels customLabel text-center"></label>
                    <input name={price_name[index]}
                    id={[index]} 
                    value={price_name[index]} 
                    readOnly
                    ref={[index]}
                    className="form-control priceCol text-center fromControlCompanyForm"  
                    onChange={e => handleChangeBusnissHours(e, index)}/>
                      
                    </div>

                    <div className="col-md " >
                    <label className="labels customLabel text-center">Sum</label>
                    <input name={price_name[index]} className="form-control priceCol" 
                    placeholder="1000"/>
                    </div>

                  


                  <div className="col-md-1">
                    {price.length !== 1 && 
                  <DeleteIcon onClick={handleRemoveClick} style={{color:'#ae0000'}} className=' mx-auto  mt-4'/>
                    }   {price.length - 1 === index && <AddBoxIcon  className=' mx-auto  mt-4' style={{color:'#0068C3'}} onClick={handleAddDay} hidden={addFieldIcon}/>}
                    
                  </div>
                  </div>

      ))} */}

              {price.map((field, index) => (
                <div className='row mt-2 ' key={index}>
                  <div className='col-md' w key='price_title'>
                    <label className='labels customLabel text-center'>
                      Pakke navn
                    </label>
                    <input
                      name='packagename'
                      id={[index]}
                      ref={[index]}
                      className='form-control priceCol text-center fromControlCompanyForm'
                      onChange={(e) => handleChangeBusnissHours(e, index)}
                    />
                  </div>

                  <div className='col-md '>
                    <label className='labels customLabel text-center'>
                      Beløp
                    </label>
                    <input
                      name={price_name[index]}
                      className='form-control priceCol'
                      placeholder='1000'
                    />
                  </div>

                  <div className='col-md'>
                    <label>Tags</label>
                    <Select
                      placeholder='Tags...'
                      defaultValue={tags_options.value}
                      onChange={(value) =>
                        setTags({ tags: value.map((c) => c.value) })
                      }
                      options={tags_options}
                      isMulti
                      name='tags'
                    />
                  </div>

                  <div className='col-md-1'>
                    {price.length !== 1 && (
                      <DeleteIcon
                        onClick={handleRemoveClick}
                        style={{ color: "#ae0000" }}
                        className=' mx-auto  mt-4'
                      />
                    )}{" "}
                    {price.length - 1 === index && (
                      <AddBoxIcon
                        className=' mx-auto  mt-4'
                        style={{ color: "#0068C3" }}
                        onClick={handleAddDay}
                        hidden={addFieldIcon}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer className='modalFotterCompanyForm'>
          <div className='row '>
            <div className='col'>
              <Button variant='secondary' onClick={handlePrevPage}>
                Tilbake
              </Button>
            </div>
            <div className='col'>
              <Button
                variant='primary'
                style={{ height: "auto", width: "100px" }}
                disabled={firstFormValidated}
                type={"submit"}>
                Gå videre
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}
export default CarWashPackages;
