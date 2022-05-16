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

submitQuoteRequest = async (e)=> {
    e.preventDefault();
    let timer; 
    let validCaptcha = false;
    
    if($("#name").val()){
        name = $("#name").val();
    }else{
        clearTimeout(timer);
        timer = showFieldsError();
        $("#name").focus();

        return;
    }
    
    if($("#email").val()){
        email = $("#email").val();

    }else{
        clearTimeout(timer);
        timer = showFieldsError();  
        $("#email").focus();

        return;
    }

    if($("#phone").val()){
        phone = $("#phone").val();

    }else{
        clearTimeout(timer);
        timer = showFieldsError();
        $("#phone").focus();

        return;
    }

    if($("#service").val()){
        service = $("#service").val();

    }else{
        clearTimeout(timer);
        timer = showFieldsError();
        $("#service").focus();

        return;     
    }

    if($("#message").val()){
        message = $("#message").val();

    }else{
        clearTimeout(timer);
        timer = showFieldsError();
        $("#message").focus();

        return;    
    }

    if(grecaptcha.getResponse().length > 0){  
        console.log(grecaptcha.getResponse().length);
        $(".loading").toggle(true);

        let formData = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message
        };

        try{
            const captchaResponse = await $.ajax({
                type : 'POST',
                url : 'https://us-central1-a-onelandscaping-server.cloudfunctions.net/app/verify',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                data: JSON.stringify({captcha: grecaptcha.getResponse()}),
                dataType : 'json',
                encode: true,
                success: (data) => {
                    console.log(data);
                }
            })
            validCaptcha = captchaResponse.success;
        }catch(error){
            console.log(error);
        }

        if(validCaptcha){
            $.ajax({
                type : 'POST',
                url : 'https://us-central1-a-onelandscaping-server.cloudfunctions.net/app/send',
                data: formData,
                dataType : 'json',
                encode: true,
                beforeSend: () => {
                },
                success: (data) => {
                    $(".loading").hide();
                    $(".error").hide();

                    $(".success").toggle(true);

                    setTimeout(() => {
                        $(".success").hide("slow");
                    }, 5000)
                },
                error: () => {
                    clearTimeout(timer);

                    $(".loading").hide();
                    $(".error").toggle(true);
    
                    $(".error-message").text("A server error has occurred, please try again later");
                    timer = setTimeout(() => {
                    $(".error").hide("slow");
                    }, 5000)

                    grecaptcha.reset();
                },
                complete: () => {
                    $(".loading").hide();
                    grecaptcha.reset();
                }
            })
        } else {
            clearTimeout(timer);

            $(".loading").hide();
            $(".error").toggle(true);

            $("#error-message").text("Error, invalid reCAPTCHA")

            timer = setTimeout(() => {
            $(".error").hide("slow");
            }, 5000)

            grecaptcha.reset();
        }
    } else {
        clearTimeout(timer);

        $(".loading").hide();
        $(".error").toggle(true);

        $("#error-message").text("Error, please prove your are not a bot by completing the reCAPTCHA")

        timer = setTimeout(() => {
        $(".error").hide("slow");
        }, 5000)
    }
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


