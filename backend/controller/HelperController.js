const helper= {};

module.exports.sendError = (details,message,status,cb) => {
   const data = {
    flag: false,
    data: details,
    message: message,
    status: status
   }
   cb(data);
};

module.exports.sendResponce = (details,message,status,cb) => {
    const data = {
     flag: true,
     data: details,
     message: message,
     status: status
    }
    cb(data);
 };