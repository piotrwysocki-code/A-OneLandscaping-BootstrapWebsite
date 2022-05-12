class QuoteRequest {
    constructor(name, email, phone, service, message){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.message = message;
    }
}

onSubmit = (token) => {
    document.getElementById("quote-form").submit();
}

onloadCaptcha = () => {
    grecaptcha.render(
        "g-recaptcha-v2",
        {"sitekey": "6LeB9uEfAAAAALODOEe0Bh3nq1oVgNby0c5udARl"}
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

    console.log(grecaptcha.getResponse("g-recaptcha-v2"));

    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let service = $("#service").val();
    let message = $("#message").val();

    let formData = {
        name: name,
        email: email,
        phone: phone,
        service: service,
        message: message
    };

    $.ajax({
        type : 'POST',
        url : 'http://localhost:4000/send',
        data: formData,
        dataType : 'json',
        encode: true
    }).done((results) => {
            console.log(results);
    });

}

quoteBtnClick = () => {
    setTimeout(()=>{
        $("#quote").collapse("show");
    }, 500);
}