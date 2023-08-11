module.exports = {
    duration : {
        day : 'day',
        month : 'month',
        year : 'year',
      
    },
    status : {
        activate : 'activate',
        deactivate : 'deactivate'

    },
    priceCalculate : (offer,price) => {
         if(offer==0) return price;
         let offerPrice = (offer/100) * price;
         return Math.floor(price - offerPrice);
    },
    getSubscription : (subscription) => {
        let sr = 1;
        let subs = [];
        subscription.forEach(sub => {
              subs.push({
                serialNumber : sr++,
                planTitle : sub.subscriptionTitle,
                validity : sub.validity.count +' '+sub.validity.duration,
                amount : sub.price,
                adfree : sub.adfree ,
                download : sub.download,
                description : sub.description,
                status : sub.status,

              })
        })
        return subs;
    }
}
