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
        console.log('clicked');
        submitQuoteRequest();
    });
    
    $('.navbar-nav>li>a').on('click', ()=> {
        $('.navbar-collapse').collapse('hide');
    });

    var $root = $('html, body');

    for(let i = 1; i < 9; i++){
        $('.image-container').append(`
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="thumbnail">
                <img loading="lazy" src="img/gallery/s${i}.jpg" />
                </div>
            </div>
        `);
    }

    for(let i = 0; i < 64; i++){
        $('.image-container').append(`
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="thumbnail">
                <img loading="lazy" src="img/gallery/m${i}.jpg" />
                </div>
            </div>
        `);
    }

    $('.nav .navbar-nav li a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});

submitQuoteRequest = () => {
    console.log('hello');

    window.event.preventDefault;
    let connectObj = validateForm();
    console.log(connectObj);

    if(connectObj){
        $(".loader").html(`
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `);
        console.log('hello2');
        $.ajax({
            type : 'POST',
            url : 'https://us-central1-staging-a-onelandscaping.cloudfunctions.net/app/send',
            data: connectObj,
            dataType : 'json',
            encode: true
        }).done((results) => {
            if(results.Success){
                grecaptcha.reset();
                console.log("success!");
              /*  $("#name, #email, #subject, #message").val('').removeClass('is-valid is-invalid');
                $("#success-message").html(`Your message has been successfully delivered, a confirmation email has been sent to ${connectObj.email}`).fadeIn("slow");
                setTimeout(()=>{
                    $("#success-message").fadeOut("slow").html('');
                }, 15000)
                $("#submitConnectForm").html(`Send`);*/
            }else{
                grecaptcha.reset();
                /*$("#captcha-failed").fadeIn("slow");
                setTimeout(()=>{
                    $("#captcha-failed").fadeOut("fast");
                }, 30000);
                $("#submitConnectForm").html(`Send`);*/
            }
        });
    }
}


 validateForm = () =>{
    let connectObj = new QuoteRequest(
        $("#name").val() || '',
        $("#email").val() || '',
        $("#phone").val() || '',
        $("#service").val() || '',
        $("#message").val() || '',
        grecaptcha.getResponse() || '');

    let validFields = [];

    console.log(connectObj);

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

    if(connectObj.subject != ''){
        $("#phone").addClass('is-valid');
        validFields.push(true);
    }else{
        $("#phone").addClass('is-invalid');
        validFields.push(false);
    }

    if(connectObj.service != '' && connectObj.service != 4){
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
/*
    if(connectObj.captcha != ''){
        validFields.push(true);
    }else{
        $("#captcha-info").fadeIn('slow');
        validFields.push(false);
    }*/

    if(validFields.includes(false)){
        connectObj = null;
    }

    return connectObj;
}

quoteBtnClick = () => {
    setTimeout(()=>{
        $("#quote").collapse("show");
    }, 500);
}

showFieldsError = () => {
    $(".error").toggle(true);
    $("#error-message").text("Please fill out all fields")
    return setTimeout(() => {
        $(".error").hide("slow");
    }, 5000)
}


