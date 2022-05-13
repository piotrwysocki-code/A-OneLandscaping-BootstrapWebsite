class QuoteRequest {
    constructor(name, email, phone, service, message){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.message = message;
    }
}

onloadCaptcha = () => {
    grecaptcha.render(
        "g-recaptcha-v2",
        {"sitekey": "6LeB9uEfAAAAALODOEe0Bh3nq1oVgNby0c5udARl"},
    )
}

$(()=>{

    var $root = $('html, body');

    $('.image-container').html('');

    for(let i = 0; i < 72; i++){
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

submitQuoteRequest = (e)=> {
    e.preventDefault();

    let validCaptcha = false;
    
    if($("#name").val()){
        name = $("#name").val();
    }else{
        showFieldsError();
        $("#name").focus();

        return;
    }
    
    if($("#email").val()){
        email = $("#email").val();

    }else{
        showFieldsError();  
        $("#email").focus();

        return;
    }

    if($("#phone").val()){
        phone = $("#phone").val();

    }else{
        showFieldsError();
        $("#phone").focus();

        return;
    }

    if($("#service").val()){
        service = $("#service").val();

    }else{
        showFieldsError();
        $("#service").focus();

        return;     
    }

    if($("#message").val()){
        message = $("#message").val();

    }else{
        showFieldsError();
        $("#message").focus();

        return;    
    }

    if(grecaptcha.getResponse().length > 0){  
        console.log(grecaptcha.getResponse().length);

        let formData = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message
        };

        validCaptcha = verifyCaptcha();
        console.log(`1. ${validCaptcha}`);

        if(validCaptcha){
            console.log(`2. ${validCaptcha}`);
            $.ajax({
                type : 'POST',
                url : 'http://localhost:4000',
                data: formData,
                dataType : 'json',
                encode: true,
                beforeSend: () => {
                    $(".loading").show(1000);
                },
                success: (data) => {
                    $(".success").show("fast");
                    setTimeout(() => {
                        $(".success").hide("slow");
                    }, 4000)
                },
                error: () => {
                    $(".loading").hide();
                    $(".error").show("fast");
                    $(".error-message").text("A server error has occurred, please try again later")
    
                    setTimeout(() => {
                    $(".error").hide("slow");
                    }, 4000)
                },
                complete: () => {
                    $(".loading").hide();
                }
            })
        } else {

        }
    } else {
        $("#error-message").text("Error, please prove your are not a bot by completing the reCAPTCHA")
        $(".error").show("fast");
        setTimeout(() => {
        $(".error").hide("slow");
        }, 4000)
    }
    
}

quoteBtnClick = () => {
    setTimeout(()=>{
        $("#quote").collapse("show");
    }, 500);
}

showFieldsError = () => {
    $(".error").show("fast");
    $("#error-message").text("Please fill out all fields")
    setTimeout(() => {
        $(".error").hide("slow");
    }, 4000)
}

verifyCaptcha = () => {
    let result = false;
    $.ajax({
        type : 'POST',
        url : 'http://localhost:4000/verify',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        data: JSON.stringify({captcha: grecaptcha.getResponse()}),
        dataType : 'json',
        encode: true,
        success: (data) => {
            console.log(data.success);
            return data.success;
        },
        error: () => {
            return false;
        }
    })
}