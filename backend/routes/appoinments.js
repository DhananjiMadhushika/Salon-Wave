const router = require("express").Router(); 
let Appoinment = require("../models/appoinment");  

// Create a new appointment

router.route("/addAppoinment").post((req,res) =>{
  const Client_Name = req.body.Client_Name;
  const Client_TelNo = req.body.Client_TelNo;
  const Category = req.body.Category;
  const Service_name = req.body.Service_name;
  const Branch = req.body.Branch;
  const Date = req.body.Date;
  const Time = req.body.Time;
  const Service_Level = req.body.Service_Level;
  
    

    const newAppoinment = new Appoinment ({              // Service model
        Client_Name,
        Client_TelNo,
        Category,
        Service_name,
        Branch,
        Date,
        Time,
        Service_Level,
       
    })

    newAppoinment.save().then(() =>{     // success
        res.json("Appoinment added")  
      }).catch((err) =>{             // not success
           console.log(err);
      })

})

///// view appoinment

router.route("/viewAppoinment").get((req,res) =>{
    Appoinment.find().then((appoinments) =>{
        res.json(appoinments)
    }).catch((err)=>{
        console.log(err)
    })


})


  /////////// cancel appoinment///////////

  router.route("/cancelAppoinment/:id").delete(async(req, res) =>{
    let appoinmentID = req.params.id;
  
    await Appoinment.findByIdAndDelete(appoinmentID)
    .then(() =>{
      res.status(200).send({status : "appoinment delete"})
    }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "error with delete table" });
    })
  })


  //////////// find client///////

  router.route("/get/:id").get(async (req, res) =>{
    let client_ID = req.params.id;
    let client;
    client = await Appoinment.findById(client_ID)
    .then((client) => {
        res.status(200).send({status : "client fetched" , view_client_information : client})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with get client" , error: err.message})
    })
  })

  module.exports = router;
  
