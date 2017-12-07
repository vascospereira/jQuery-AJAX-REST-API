$(function() {
    // GET
    $('#get').on('click', function() {
        $.ajax({
            url: 'api/players',
            contentType: 'application/json',
            success: function(response) {
                const tbodyElement = $('tbody');
                tbodyElement.html('');
                response.players.forEach(function(player) {
                    tbodyElement.append('\
                        <tr>\
                            <td class="id">' + player.id + '</td>\
                            <td><input type="text" class="name" value="' + player.name + '"></td>\
                            <td>\
                                <button class="update">Update</button>\
                                <button class="delete">Delete</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // Create-POST
    $('#create').on('submit', function(event) {
        event.preventDefault();
        const createInput = $('#create-input');
        $.ajax({
            url: 'api/players',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                // cleans user input
                createInput.val('');
                // triggers get method to refresh the browser with the new data inserted
                $('#get').click();
            }
        });
    });

    // Update-PUT
    $('table').on('click', '.update', function() {
        const rowElement = $(this).closest('tr');
        const id = rowElement.find('.id').text();
        const newName = rowElement.find('.name').val();

        $.ajax({
            url: 'api/players/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get').click();
            }
        });
    });

    // Delete-DELETE
    $('table').on('click', '.delete', function() {
        const rowElement = $(this).closest('tr');
        const id = rowElement.find('.id').text();

        $.ajax({
            url: 'api/players/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get').click();
            }
        });
    });
});
