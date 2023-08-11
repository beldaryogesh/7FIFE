const constant = require('../util /ads.constant');
const Ads = require('../models/Ads.model')

const create = async (req, res) => {
   
    try {
       
        const fileName = req.files[0].filename ; 
        const path = req.files[0].path ;
        
        console.log(fileName,path);
        let obj = {
            adsTitle: req.body.adsTitle ? req.body.adsTitle : undefined,
            redirectLink: req.body.redirectLink ? req.body.redirectLink : undefined,
            advertiseAs: req.body.advertiseAs ? req.body.advertiseAs : undefined,
            status: req.body.status ? req.body.status : undefined
        }

        if (req.body.advertiseAs == constant.adsType.image) {
            obj[constant.field.advertiseImage] = {
                fileName: fileName,
                fileAddress: path,
            },
            obj[constant.field.advertiseVideo] = {
                fileName: ' ',
                fileAddress: ' '
            }
        }
        else {
            obj[constant.field.advertiseVideo] = {
                fileName: fileName,
                fileAddress: path
            },
            obj[constant.field.advertiseImage] = {
                fileName: ' ',
                fileAddress: ' ',
            }
        }


        const ad = await Ads.create(obj);
        return res.status(201).send({
            message: `Ad with ${req.body.advertiseAs} got created`
        })



    } catch (err) {
        console.log('Error inside create of Ads Controller', err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const getad = async(req,res) => {
    try{
        let obj = {}
        const ads = await Ads.find(obj);
        return res.status(200).send(constant.adsGenerator(ads));

    }catch(err){
        console.log('Error inside getad Controller',err);
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const updateAds = async(req,res) => {
    try{
        const ad = await Ads.findById(req.params.id);
        let obj = {
            adsTitle: req.body.adsTitle ? req.body.adsTitle : undefined,
            redirectLink: req.body.redirectLink ? req.body.redirectLink : undefined,
            status: req.body.status ? req.body.status : undefined
        }
        if(req.body.advertiseAs)
        {
            const fileName = req.files[0].filename ; 
            const path = req.files[0].path ;
            let value = req.body.advertiseAs;
            if(value == constant.adsType.image){
                obj[constant.field.advertiseAs] = req.body.advertiseAs ;
                obj[constant.field.advertiseImage] = {
                    fileName: fileName,
                    fileAddress: path,
                }
                
            }
            else{
                obj[constant.field.advertiseAs] = req.body.advertiseAs ;
                obj[constant.field.advertiseVideo] = {
                    fileName : fileName,
                    fileAddress : path
                }
            }

        }
        await ad.updateOne(obj);
        console.log('ad got updated');
        res.status(201).send({
            message : 'Ads got updated'
        })


    }catch(err){
        console.log('Error inside updateAds Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}
const deletead = async(req,res) => {
    try{
        let id = req.params.id;
        await Ads.deleteOne({_id :id});
       return  res.status(201).send({
            message : 'ads got deleted'
        })

    }catch(err){
        console.log('Error Occured inside deletead of ads Controller',err);
         return res.status(500).send({
            message : 'Internal Server Error'
         })
    }
}

module.exports = {
    create,
    getad,
    updateAds,
    deletead
}