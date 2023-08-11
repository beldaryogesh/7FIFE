const TermsandCondition = require('../models/TermsCondition.model')



const createTermsCondition = async function (req, res) {
    try {
     let obj = {
      termsandCondition : req.body.termsandCondition ? req.body.termsandCondition : undefined
     }
   
      await TermsandCondition.create(obj);
      return res.status(201).send({
        message: "Terms and Condition added successfully..!",
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: error,
      });
    }
  };

  const updateTermsCondition = async function (req, res) {
    try {
      let id = req.params.id;
  
      let obj  = {
          termsandCondition : req.body.termsandCondition ? req.body.termsandCondition : undefined
      }
      await TermsandCondition.findByIdAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      return res.status(201).send({
        message: "Terms and Condition update successfully..!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error,
      });
    }
  };


module.exports = {
    createTermsCondition,
    updateTermsCondition
}