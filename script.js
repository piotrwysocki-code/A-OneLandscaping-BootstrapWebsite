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

    for(let i = 0; i < 73; i++){
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
    let response = grecaptcha.getResponse();
    let validCaptcha = false;
    console.log(response);
    $.ajax({
        type : 'POST',
        url : 'http://localhost:4000/verify',
        data: JSON.stringify(response),
        dataType : 'json',
        encode: true,
        success: (data) => {
            console.log(data);
        }
    })
/*
    let name;
    let email;
    let phone;
    let service
    let message;

    if($("#name").val()){
        name = $("#name").val();
    }else{
        $(".error").show("fast");
        $("#error-message").text("Please fill out all fields")
        setTimeout(() => {
            $(".error").hide("slow");
        }, 4000)

        $("#name").focus();
        return;
    }
    
    if($("#email").val()){
        email = $("#email").val();

    }else{
        $(".error").show("fast");
        $("#error-message").text("Please fill out all fields")
        setTimeout(() => {
            $(".error").hide("slow");
        }, 4000)

        $("#email").focus();
        return;
    }

    if($("#phone").val()){
        phone = $("#phone").val();

    }else{
        $(".error").show("fast");
        $("#error-message").text("Please fill out all fields")
        setTimeout(() => {
            $(".error").hide("slow");
        }, 4000)

        $("#phone").focus();
        return;
    }

    if($("#service").val()){
        service = $("#service").val();

    }else{
        $(".error").show("fast");
        $("#error-message").text("Please fill out all fields")
        setTimeout(() => {
            $(".error").hide("slow");
        }, 4000)

        $("#service").focus();
        return;     
    }

    if($("#message").val()){
        message = $("#message").val();

    }else{
        $(".error").show("fast");
        $("#error-message").text("Please fill out all fields")
        setTimeout(() => {
            $(".error").hide("slow");
        }, 4000)

        $("#message").focus();
        return;    
    }

    console.log(`response length: `, response.length);

    if(response.length > 0){      
        let formData = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message
        };
    
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
    }else{
        $("#error-message").text("Error, please prove your are not a bot by completing the reCAPTCHA")
        $(".error").show("fast");
        setTimeout(() => {
        $(".error").hide("slow");
        }, 4000)
    }
    */
}

quoteBtnClick = () => {
    setTimeout(()=>{
        $("#quote").collapse("show");
    }, 500);
}