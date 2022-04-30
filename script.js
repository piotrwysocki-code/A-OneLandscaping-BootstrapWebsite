class QuoteRequest {
    constructor(name, email, phone, service, message){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.message = message;
    }
}

$(()=>{
    var $root = $('html, body');

$('a[href^="#"]').click(function () {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);

    return false;
});
});

submitQuoteRequest = (e)=> {
    e.preventDefault();

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