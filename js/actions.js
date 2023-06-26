const Cookies = document.cookie;
const createCookie = (name, value, hours) => {
  if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
  }
  else var expires = "";               
  document.cookie = name + "=" + value + expires + "; path=/";
}
const readCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
const removeAllCookie = () => {
  var ca = document.cookie.split(';');
  console.log(ca);
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      var expires = "; expires=Thu, 01-Jan-70 00:00:01 GMT";
      var name = c.split('=');
      createCookie(name[0].trim(), '', 0);
    }
    location.reload();
};
const refreshCaptcha = (id) => {
  $("#"+id).attr('src','captcha_code.php');
}
const validateCouponCode = (params, callback) => {
  $.ajax({
    type: "POST",
    url: "./controller/index.php?task=validateCouponCode",
    data: {...params},
    success: function(result){
      callback(result);
    }
  });
}
const getBranchNames = (callback) => {
  $.ajax({
    type: "POST",
    url: "./controller/index.php?task=getBranchNames",
    success: function(result){
      callback(result);
    }
  });
}
const getBrandNames = (callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getCarBrands",
      success: function(result){
        callback(result);
      }
    });
  }

  const getModelNames = (id, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getCarModels",
      data:{brandId: id},
      success: function(result){
        callback(result);
      }
    });
  }
  const getPrices = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getPrices",
      data: {modelId: params.modelId},
      success: function(result){
        callback(result);
      }
    });
  }
  const getCarDetails = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getCarDetails",
      data: {modelId: params.modelId, brandId: params.brandId},
      success: function(result){
        callback(result);
      }
    });
  }
  const verifyCaptcha = (captcha, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=verifyCaptcha",
      data: {captcha: captcha},
      success: function(result){
        callback(result);
      }
    });
  }
  const saveBooking = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=saveBooking",
      data: {...params},
      success: function(result){
        callback(result);
      }
    });
  }
  const saveSourceBooking = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=saveSourceBooking",
      data: {...params},
      success: function(result){
        callback(result);
      }
    });
  }
  const newPendingEntry = (params, callback = () => {}) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=newPendingEntry",
      data: {...params},
      success: function(result){
        callback(result);
      }
    });
  }
  const saveServiceQuery = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=saveServiceQuery",
      data: {...params},
      success: function(result){
        sendWhatsappEnquiryMessage(params, response => {});
        callback(result);
      }
    });
  }
  const saveEnrollEnquiry = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=saveEnrollEnquiry",
      data: {...params},
      success: function(result){
        // sendWhatsappEnquiryMessage(params, response => {});
        callback(result);
      }
    });
  }
  const getEnrollCode = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getEnrollCode",
      data: {...params},
      success: function(result){
        // sendWhatsappEnquiryMessage(params, response => {});
        callback(result);
      }
    });
  }
  const otpVerification = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=otpVerification",
      data: {...params},
      success: function(result){
        callback(result);
      }
    });
  }
  const sendWhatsappEnquiryMessage = (params, callback) => {
    params.mobile = params.mobile.replace(/ /g,'');
    params.mobile = params.mobile.substr(params.mobile.length - 10, 10);
    const dataParams = {
      "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDU5NDkzYzg1ZGUzMWI5NjM0NjM3NSIsIm5hbWUiOiJWZWhpY2xlQ2FyZSIsImFwcE5hbWUiOiJWZWhpY2xlQ2FyZSIsImNsaWVudElkIjoiNjE0NTk0OGFjODVkZTMxYjk2MzQ2Mzc0IiwiYWN0aXZlUGxhbiI6IkxJVEUiLCJpYXQiOjE2MzI1NTkxNzJ9.R9n--aZNCmsEjzMrs3ye6LhToMkHXV-vS_bM1i7EmXI",
      "campaignName": "Landing Page Sign Up",
      "destination": "+91"+params.mobile,
      "userName": params.mobile,
      "media": {
        "url": "https://vehiclecare.in/blaze/wp-content/uploads/2021/09/features-ss.png",
        "filename": "test"
      }
    };
    $.ajax({
      type: "POST",
      url: "https://backend.aisensy.com/campaign/t1/api",
      data: {...dataParams},
      success: function(result){
        callback(result);
      }
    });
  }
  const createBooking = (params, callback) => {
    verifyCaptcha(params.captcha, (captchaResponse) => {
      if (captchaResponse === 'false'){
        callback(false);
        return false;
      }
      saveBooking(params, (response) => {
        callback(response);
      });
    });
    
  }
  
  const createSourceBooking = (params, callback) => {
    verifyCaptcha(params.captcha, (captchaResponse) => {
      if (captchaResponse === 'false'){
        callback(false);
        return false;
      }
      saveSourceBooking(params, (response) => {
        sendInformationToCustomer(params, result => {
        });
        callback(response);
      });
    });
    
  }

  const sendInformationToCustomer = (data, callback) => {
    console.log(data);
    let params = {};
    getCarDetails({brandId: data.carBrand, modelId: data.carModel}, response => {
      response = JSON.parse(response);
      params.mobile = data.mobile.replace(/ /g,'');
      params.mobile = params.mobile.substr(params.mobile.length - 10, 10);
      params.model = `${response.brand} ${response.model}`;
      params.carReg = data.carReg;
      var dataParams = data.date.split('(');
      params.actionDate = dataParams[0];
      params.actionTime = dataParams[1]?dataParams[1].split(')')[0]:'NA';
      sendEmail(params, (mailRes) => {
        sendMessage(params, (messageRes) => {
          callback(true);
        });
      });
    });
  }
  
  const sendMessage = (params, callback) => {
    if(params.mobile){
      $.ajax({
        type: "POST",
        url: `https://api.authkey.io/request?authkey=a9d737536478b780&mobile=${params.mobile}&country_code=91&sid=1345&modelno=${params.model}&regno=${params.carReg}&date=${params.actionDate}&time=${params.actionTime}`,
        success: function(result){
          callback(true);
        }
      });
    }else{
      callback(true);
    }
  }
  const sendEmail = (params, callback) => {
    // if(params.email){
    //   $.ajax({
    //     type: "GET",
    //     url: `https://api.authkey.io/request?authkey=a9d737536478b780&email=${params.email}&mid=48&insured_name=${params.name}&vehicle_details=${params.vehicle}&status_description=${params.message}&action_date=${params.actionDate}`,
    //     success: function(result){
    //       callback(true);
    //     }
    //   });
    // }else{
      callback(true);
    // }
  }

  const runCron = (callback) => {
    $.ajax({
      type: "GET",
      url: 'http://13.233.238.35/crons/hourly_crons.php',
      success: function(result){
        callback(true);
      }
    });
  }
  
  const createServiceQuery = (params, callback) => {
    verifyCaptcha(params.captcha, (captchaResponse) => {
      if (captchaResponse === 'false'){
        callback('false');
        return false;
      }
      saveServiceQuery(params, (response) => {
        callback(response);
      });
    });
  }

  const getFaqsNames = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getFaqsNames",
      data: {id: JSON.stringify(params), table: 'faqs', key: 'city_id'},
      success: function(result){
        callback(result);
      }
    });
  }
  
  const getModelFaqsNames = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "./controller/index.php?task=getFaqsNames",
      data: {id: JSON.stringify(params), table: 'model_faqs', key: 'model_id'},
      success: function(result){
        callback(result);
      }
    });
  }
  
  const primeSignup = (params, callback) => {
    $.ajax({
      type: "POST",
      url: "../controller/index.php?task=primeSignup",
      data: {username: params.username, email: params.email, mobile: params.mobile, password: params.password},
      success: function(result){
        callback(result);
      }
    });
  }

  const createCustomLSQParams = (params) => {
    const customParams = [{"Attribute": "mx_Country","Value": "India"},{"Attribute": "SearchBy","Value": "Phone"}];
    if(params.firstName) customParams.push({"Attribute": "FirstName", "Value": params.firstName});
    if(params.lastName) customParams.push({"Attribute": "LastName", "Value": params.lastName});
    if(params.email) customParams.push({"Attribute": "EmailAddress", "Value": params.email});
    if(params.phone) customParams.push({"Attribute": "Phone", "Value": params.phone});
    if(params.city) customParams.push({"Attribute": "mx_City", "Value": params.city});
    if(params.state) customParams.push({"Attribute": "mx_State", "Value": params.state});
    if(params.serviceType) customParams.push({"Attribute": "mx_Service_Type", "Value": params.serviceType});
    if(params.brand) customParams.push({"Attribute": "mx_Car_Brand", "Value": params.brand});
    if(params.model) customParams.push({"Attribute": "mx_Car_Model", "Value": params.model});
    if(params.variant) customParams.push({"Attribute": "mx_Variant", "Value": params.variant});
    if(params.odometer) customParams.push({"Attribute": "mx_Odometer_Value", "Value": params.odometer});
    if(params.date) customParams.push({"Attribute": "mx_Booking_Date_And_Time", "Value": params.date});
    if(params.discount) customParams.push({"Attribute": "mx_Discount", "Value": params.discount});
    if(params.regNo) customParams.push({"Attribute": "mx_Registration_Number", "Value": params.regNo});
    if(params.source) customParams.push({"Attribute": "mx_Source", "Value": params.source});
    if(params.campaign) customParams.push({"Attribute": "mx_UTM_Campaign_Name", "Value": params.campaign});
    if(params.ownerId) customParams.push({"Attribute": "OwnerId", "Value": params.ownerId});
    return customParams;
  }
  
  const createNewLead = (params) => {
    $.ajax({
      type: "POST",
      url: "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$r11c882bb4e63e05f5ffd0287508f5c2f&secretKey=0241ee0af5c571260bc9a6e73c925a26be6eeccd",
      headers: {"content-type": "application/json"},
      data: JSON.stringify(params),
      success: function(result){
        console.log(result);
      }
    });
  }

  const createFaqCells = (key, item) => {
    const card = `
      <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link ${key !== 0 && 'collapsed'}" data-toggle="collapse" data-target="#collapse${item.id}" aria-expanded="${key === 0}" aria-controls="collapse${item.id}">
                ${item.title} <i class="fa fa-chevron-down"></i>
              </button>
            </h5>
          </div>
          <div id="collapse${item.id}" class="collapse ${key === 0 && 'show'}" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              ${item.summary}
            </div>
          </div>
      </div>`;
    return card;
  }
  const updateCityName = (name) => {
    $('.citySelect.selectedCity').html(name);
  }
  const createCityViewCells = (item) => {
    const cell = `
      <div class="col-md-2 col-3 cityCells" data-city="${item.id}" data-name="${item.city}">
        <a>
          <img src="images/city/${item.image}" class="cityImg">
        </a>
        <h6>${item.city}</h6>
      </div>
    `;
    return cell;
  }
  const createPopularSearches = (item) => {
    const cell = `
      <li class="mr-4">

        <a class="" href="#">Car Repairing In ${item.city} </a>
      </li>
    `;
    return cell;
  }

  const createPopularSearchesService = (item) => {
    const cell = `
       <li class="mr-4">
        
        <a class="" href="#">Car Service In ${item.city} </a>
      </li>
    `;
    return cell;
    
  }
