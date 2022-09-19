window.captchaComplete = captchaComplete;
window.captchaError = captchaError;
window.captchaExpired = captchaExpired;

class QuoteRequest {
    constructor(name, email, phone, service, message, captcha){
        this.name = name;
        this.email = email;
        this.service = service;
        this.phone = phone;
        this.message = message;
        this.captcha = captcha
    }
}

onloadCaptcha = () => {
    grecaptcha.render(
        "g-recaptcha-v2",
        {"sitekey": "6LeB9uEfAAAAALODOEe0Bh3nq1oVgNby0c5udARl"},
    )
}

$(()=>{

    $("#submitQuoteRequestBtn").on('click', ()=> {
        submitQuoteRequest();
    });
    
    $('.navbar-nav>li>a').on('click', ()=> {
        $('.navbar-collapse').collapse('hide');
    });

    var $root = $('html, body');

    for(let i = 1; i < 9; i++){
        $('.image-container').append(`
        <div class="col-xxl-3 col-xl-4 col-md-6 img-fluid img-card">
                <img loading="lazy" src="img/gallery/s${i}.jpg" class="w-100 shadow-1-strong rounded mb-4"
                />
            </div>
        `);
    }

    for(let i = 0; i < 64; i++){
        $('.image-container').append(`
        <div class="col-xxl-3 col-xl-4 col-md-6 img-fluid img-card">
        <img loading="lazy" src="img/gallery/m${i}.jpg" class="w-100 shadow-1-strong rounded mb-4"
            />
        </div>
        `);
    }

    $('.nav .navbar-nav li a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});

submitQuoteRequest = () => {
    let connectObj = validateForm();

    if(connectObj){
        $("#submitQuoteRequestBtn").html(`
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `);

        $.ajax({
            type : 'POST',
            url : 'https://us-central1-staging-a-onelandscaping.cloudfunctions.net/app/send',
            data: connectObj,
            dataType : 'json',
            encode: true
        }).done((results) => {
            console.log(results);
            if(results.Success){
                grecaptcha.reset();
                console.log("success!");
                $("#name, #email, #phone, #service, #message").val('').removeClass('is-valid is-invalid');
                $("#success-message").html(`Your message has been successfully delivered, a confirmation email has been sent to ${connectObj.email}`).fadeIn("slow");
                setTimeout(()=>{
                    $("#success-message").fadeOut("slow").html('');
                }, 15000)
                $("#submitQuoteRequestBtn").html(`Send`);
            }else{
                grecaptcha.reset();
                console.log("fail!");

                $("#captcha-failed").fadeIn("slow");
                setTimeout(()=>{
                    $("#captcha-failed").fadeOut("fast");
                }, 30000);
                $("#submitConnectForm").html(`Send`);
            }

        })

    }
}


 validateForm = () =>{
    $("#name, #email, #phone, #service, #message").removeClass('is-valid is-invalid');

    let connectObj = new QuoteRequest(
        $("#name").val() || '',
        $("#email").val() || '',
        $("#phone").val() || '',
        $("#service").val() || '',
        $("#message").val() || '',
        grecaptcha.getResponse() || '');

    let validFields = [];

    if(connectObj.name != ''){
        $("#name").addClass('is-valid');
        validFields.push(true);
    }else{
        $("#name").addClass('is-invalid');
        validFields.push(false);
    }

    if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(connectObj.email)){
        $("#email").addClass('is-valid');
        validFields.push(true);
    }else{
        $("#email").addClass('is-invalid');
        validFields.push(false);
    }

    if(connectObj.phone != '' && (/\d/).test(connectObj.phone)){
        $("#phone").addClass('is-valid');
        validFields.push(true);
    }else{
        $("#phone").addClass('is-invalid');
        validFields.push(false);
    }

    if(connectObj.service != '' && connectObj.service != 0){
        $("#service").addClass('is-valid');
        validFields.push(true);
    }else{
        $("#service").addClass('is-invalid');
        validFields.push(false);
    }

    if(connectObj.message != ''){
        $("#message").addClass('is-valid');
        validFields.push(true);
    }else{
        $("#message").addClass('is-invalid');
        validFields.push(false);
    }

    if(connectObj.captcha != ''){
        validFields.push(true);
    }else{
        $("#captcha-info").fadeIn('slow');
        validFields.push(false);
    }

    if(validFields.includes(false)){
        connectObj = null;
    }

    return connectObj;
}

function captchaError(){
    $("#captcha-info, #captcha-error, #captcha-expired, #captcha-failed, #success-message").hide();
    console.log('captcha network error');
    setTimeout(()=>{
        grecaptcha.reset();
        $("#captcha-error").fadeIn('slow');
    }, 30000)
}

function captchaExpired(){
    $("#captcha-info, #captcha-error, #captcha-expired, #captcha-failed, #success-message").hide();
    console.log('captcha expired');
    grecaptcha.reset();
    $("#captcha-expired").fadeIn('slow');
}

function captchaComplete(){
    console.log('captcha complete');
    $("#captcha-info, #captcha-error, #captcha-expired, #captcha-failed, #success-message").fadeOut('fast');
}



