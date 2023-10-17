$(document).ready(function(){

    // When the page is loaded, get refreshTime to not remove current slelected time
    getRefreshTime();

    // When not select any, default time is 5 minutes
    let refreshTime = 300000;

    // function to get the chosen refresh time
    function getRefreshTime() {
        $.ajax({
            url: '/director/refresh',
            method: "GET",
            success: function (data) {
                if (data.data) {
                    refreshTime = data.data;
                }
                setTimeout(function () {
                    window.location.reload();
                    console.log("Page is loaded");
                }, refreshTime);
            }
        });
    }

    // Send chosen freshtime to save in db (avoid reloading page will lose it)
    $('.dropdown-refresh-item').on('click', function () {
        var dataId = $(this).find('button').data('id');
        $.ajax({
            url: '/director/refresh',
            method: "POST",
            data: { timeSet: dataId },
            success: function (data)
            {
                refreshTime = data.data;
                // reload to set refreshTime
                window.location.reload();
            }
        });
    });

    // Show shop data
    $('.dropdown-item').on('click', function () {
        var dataId = $(this).find('button').data('id');
        load_shops(dataId);
    });

    function load_shops(shopId) {
        $.ajax({
            url: '/director',
            method: "POST",
            data: { action: 'fetch', shopId: shopId},
            success: function (data)
            {
                var html = '';

                if(data.data.length > 0)
                {
                    for(var count = 0; count < data.data.length; count++)
                    {
                        html += `
                        <<tr class="border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                `+ data.data[count].toyname +`
                            </th>
                            <td class="px-6 py-4 hidden xl:block">
                                `+ data.data[count].description +`
                            </td>
                            <td class="px-6 py-4">
                                `+ data.data[count].price +`
                            </td>
                            <td class="px-6 py-4">
                                `+ data.data[count].origin +`
                            </td>
                            <td class="px-6 py-4">
                                `+ data.data[count].categoryname +`
                            </td>
                        </tr>
                        `;
                    }
                }

                $('#resultData').html(html);

            }
        });
    }
    });