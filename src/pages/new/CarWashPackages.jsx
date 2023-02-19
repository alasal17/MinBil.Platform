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
import { Configuration, OpenAIApi } from "openai";
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
  const apiKey = process.env.OPENAI_APIKEY;
  const [response, setResponse] = useState(null);
  const [chatGPTShow, setChatGPTShow ] = useState(true);
  const [dallEShow, setDallEShow ] = useState(false);
  const [priceClassShow, setPriceClassShow ] = useState(true);
  const [loading, setLoading] = useState(false);
  let [obj, setObj] = useState({ choices: [] });
  const [result, setResult] = useState("");
  const [payload, setPayLoad] = useState({
    prompt: "Mario: Hi, how are you?",
    temperature: 0.9,
    n: 1,
    max_tokens: 500,
    model: "text-davinci-003"
  });
  const [promptImage, setPromptImage] = useState("");
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const translate_text = async () =>{
    const res = await openai.translateText({
      prompt: prompt,
      source: "no",
      target: "en",
    });
    console.log(res.data.data.translations[0].text)
    return res.data.data.translations[0].text
   
  }
  const generateImage = async () => {
    translate_text()
    const res = await openai.createImage({
      prompt: '',
      n: 1,
      size: "512x512",
    });

    setResult(res.data.data[0].url);
    console.log(res.data.data[0].url);
  };


  const getRes = () => {

    setLoading(true);
    if(dallEShow === true){
      generateImage()
    }
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

  const handleDallEShowChange = () => {
    setDallEShow(!dallEShow);
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
  const price_name = ["Pris", "Pris liten bil", "Pris vanlig bil", "Pris stor bil"];

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


  const handlePriceClassShowChange = () => {
    setPriceClassShow(!priceClassShow);
  };
  useEffect(() => {
    const formSelected = document.getElementsByName("Pris");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
  
    const currentMonth2 = currentDate.getMonth();
    const dayMonth = currentDate.getDate();

    price_name[0] = "Pris liten bil";

    setCurrentDateFormat(
      new Date(currentMonth2 + "-" + dayMonth + "-" + currentYear)
    );
    
    if (price.length > 1) {
      
    }
  },[]);


  const handleAddPrisClass = () => {

    

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

   
    


  };

  const handleAddDay = (e, index) => {
    setPrice([
      ...price,
      {
        title: "",
        sum: "",
        sum_small_car: "",
        sum_normal_car: "",
        sum_big_car: "",
      }])

   
    


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

          <div className=''>
            <img
              src={
                result || file ? 
                result || URL.createObjectURL(file)
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
                  placeholder='Bilvask'
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

            <div className='row mt-2'>
              <div className='col-md-6' key='estimatedTime'>
                <label className='labels'>Estimert tid (I minutter)</label>
                <input
                  type='number'
                  {...register("estimatedTime", { required: true })}
                  className='form-control'
                  id='estimatedTime'
                  onChange={handleInput}
                  placeholder='60'
                />
                {errors.estimatedTime && (
                  <p style={{ color: "red" }}>
                    Estimert tid: Dette feltet er obligatorisk! Det må være tall
                  </p>
                )}
              </div>

              <div className='col-md-6' key='capacity'>
                <label className='labels'>Kapasitet (Antall plass biler)</label>
                <input
                  type='number'
                  {...register("capacity", { required: true })}
                  className='form-control'
                  id='capacity'
                  onChange={handleInput}
                  placeholder='3'
                />
                {errors.capacity && (
                  <p style={{ color: "red" }}>
                    Kapasitet: Dette feltet er obligatorisk! Det må være tall
                  </p>
                )}
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
                        Bruk AI til å generere tjeneste beskrivelse?
                      </label>
              </div>

              <div className="col-md-6" hidden={chatGPTShow}>
              <input
                        type="checkbox"
                        className="form-check-input "
                        id="performsTrucks"
                        checked={dallEShow}
                        onChange={handleDallEShowChange}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="form-check-label"
                        key="performsTrucks"
                        htmlFor="exampleCheck1"
                      >
                        Bruk AI til å generere tjeneste bilde?
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
              <div className="col-md-4" style={{display: 'flex', justifyContent: 'center'}}>
              <Button disabled={loading} type="submit"  variant='primary' onClick={getRes}>
            {loading ? "Loading... " : "Hent resultat"}
          </Button>
              </div>
              <div className="col-md-4">
              </div>
            </div>


            <div className='row mt-2' style={{paddingTop:'20px'}}>
            
              <div className="col-md-6">
              <input
                        type="checkbox"
                        className="form-check-input "
                        id="priceClassShow"
                        checked={!priceClassShow}
                        onChange={handlePriceClassShowChange}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="form-check-label"
                        key="performsTrucks"
                        htmlFor="exampleCheck1"
                      >
                        Pris klasse basert på størrelse på bilen eller en enkel pris?
                      </label>
              </div>
          
              {price.map((field, index) => (
                    <div className="row mt-2 " hidden={priceClassShow} key={index}>


                    <div className="col-md" w key="price_title">
                    <label className="labels customLabel text-center"></label>
                    <input name={price_name[index]}
                    id={[index]} 
                    value={price.length > 1 ?  price_name[index + 1]  : price_name[index]} 
                    
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
                    }   {price.length - 1 === index && <AddBoxIcon  className=' mx-auto  mt-4' style={{color:'#0068C3'}} onClick={handleAddPrisClass} hidden={addFieldIcon}/>}
                    
                  </div>
                  </div>

      ))}

              {price.map((field, index) => (
                <div className='row mt-2 ' key={index} hidden={!priceClassShow}>
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
                      value={tags_options.value}
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
                Lagre
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}
export default CarWashPackages;
