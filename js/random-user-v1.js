$('#get-one-user-button').click(getOneRandomUserData);

function getOneRandomUserData() {

    // Display the div that is initially hidden
    $('#single-user-container').show();

    // Make a AJAX request
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            //console.log(data);

            // Parse the json data coming from the API
            const result = data.results[0];
            const firstName = result.name['first'];
            const lastName = result.name.last;
            const email = result.email;
            const phone = result.phone;
            const picture = result.picture.large;

            console.log(firstName, lastName, email, picture);

            // Update the page with the information received from the API
            $('#name').text(firstName + ' ' + lastName);
            $('#email').text(email);
            $('#phone').text(phone);
            $('#profile-img').attr('src', picture);

        }
    });
}
