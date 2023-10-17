$('button').click(function () {

    // Clear before adding in case the user clicks the button twice
    $('#results').empty();

    // Get the search term and location from the input elements
    const searchTerm = $('input[name=search_term]').val();
    const location = $('input[name=location]').val();

    // This API enables cross-origin requests to anywhere
    // This will probably be very confusing for you to understand as to why we need another url in front of the actual url
    // However, browsers like Chrome prevents non-cross-origin requests, so this is a workaround for that
    // It’s basically a proxy that is used to bypass the CORS restrictions.
    // This site only serves requests after you visit the page below and temporarily unlock by clicking the button on this site.
    // More info: https://github.com/Rob--W/cors-anywhere/issues/301
    const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';

    // You must enter your own API_KEY below
    const API_KEY = "ENTER YOUR API KEY";


    $.ajax({
        url: corsAnywhereURL + 'https://api.yelp.com/v3/businesses/search',
        dataType: 'json',
        data: {'term': searchTerm, 'location': location},
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
        },
        success: function (data) {
            //console.log(data);
            // Grab the results from the API JSON return
            const totalResults = data.total;
            // If our results are greater than 0, continue
            if (totalResults > 0) {
                // Iterate through the JSON array of 'businesses' returned by the API
                $.each(data.businesses, function (i, item) {

                    // Store each business's object in a variable
                    const phone = item.display_phone;
                    const image = item.image_url;
                    const name = item.name;
                    const price = item.price;
                    const address = item.location.address1;
                    const city = item.location.city;
                    const zipcode = item.location.zip_code;
                    const transactions = item.transactions;

                    // Append our result into our page
                    $('#results').append('' +
                        '      <div class="shadow">\n' +
                        '            <div class="card mb-3">\n' +
                        '                        <div class="row g-0 align-items-center">\n' +
                        '                            <div class="col-md-4">\n' +
                        `                                <img src="${image}" class="card-img rounded p-1" alt="business-image">\n` +
                        '                            </div>\n' +
                        '                            <div class="col-md-8">\n' +
                        '                                <div class="card-body">\n' +
                        '                                    <div class="row">\n' +
                        '                                        <div class="col-lg-8">\n' +
                        `                                            <h3 class="card-title">${name}</h3>\n` +
                        '                                        </div>\n' +
                        '                                        <div class="col-lg-4">\n' +
                        `                                            <small class="fs-4 text-success fw-bold">${price}</small>\n` +
                        '                                        </div>\n' +
                        '                                    </div>\n' +
                        `                                    <p class="card-text text-muted">${address} <br>${city}, ${zipcode}</p>\n` +
                        `                                    <p class="card-text text-muted">Phone: ${phone}</p>\n` +
                        `                                      <div id="transaction-${i}"></div>\n` +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div');
                    transactionGenerator(transactions, i);
                });
            } else {
                // If our results are 0; no businesses were returned by the JSON therefore we display on the page no results were found
                $('#results').append('<h5>No results were found!</h5>');
            }

        },
        error: function (xhr, status, error) {
            // This is the error callback function
            // xhr: The XMLHttpRequest object
            // - xhr.status: HTTP status code (e.g., 404 for "Not Found")
            // - xhr.statusText: HTTP status text (e.g., "Not Found")
            // - xhr.responseText: The response text from the server

            // status: A string describing the type of error
            // - "error": General error
            // - "timeout": Request timeout
            // - "parsererror": JSON parsing error

            // error: A textual description of the error

            if (xhr.status === 403) {
                alert("Please read the description carefully!!! Please first enable cross-origin request by visiting https://cors-anywhere.herokuapp.com/ as described in the source code");
            }
        }
    });
});

// A function to generate badge-pill for different transaction information of each business
function transactionGenerator(transactions, index) {
    for (const transaction of transactions) {
        $('#transaction-' + index).append(`<span class="badge rounded-pill bg-primary ms-1">${transaction}</span>`);
    }
}


