$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/romain',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                    tbodyEl.append('\
                        <tr>\
                            <th class="id" >' + 'Votre numéro est' + '</th>\
                            <td><input type="text" class="name" value="' + response.nbRomain + '"></td>\
                            <tr>\
                    ');
                
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');
        $.ajax({
            url: '/romain',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: response => {
                createInput.val('');
                $('#get-button').click();
            }
        });
    });
});
