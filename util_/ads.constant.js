module.exports = {
    adsType : {
        image : 'image',
        video : 'video'
    },
    
    status : {
        active : 'active',
        deactive : 'deactive'
    },
    field : {
        advertiseVideo : 'advertiseVideo',
        advertiseImage : 'advertiseImage',
        advertiseAs : 'advertiseAs'
    },
    adsGenerator : (ads) => {
        let result = [];
        let srNO = 1;
        ads.forEach((ad)=> {
            result.push({
                srNO : srNO++,
                Title : ad.adsTitle,
                Link : ad.redirectLink,
                Advertise : ad.advertiseImage.fileName ? ad.advertiseImage.fileAddress: ad.advertiseVideo.fileAddress,
                Status : ad.status,
        
            })
        })
        return result;
    }
}