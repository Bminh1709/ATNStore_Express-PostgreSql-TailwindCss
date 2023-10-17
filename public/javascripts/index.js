$(document).ready(function(){

    let categoryId;
    load_data('');

    // Filter Form
    $('#formFilter').submit(function (e) {
        e.preventDefault(); 
        var filter = $('#inputFilter').val(); 
        var category = categoryId;
        load_data(filter, category);
    });

    $('.btnCategory').click(function(){
        $('.btnCategory').removeClass('active');
        $(this).addClass('active');


        var tmpId = $(this).data("id");
        var filter = $('#inputFilter').val();
        categoryId = tmpId;
        load_data(filter,tmpId);
    });

    $('#btnDeleteFilter').click(function(){
        $('#inputFilter').val('');
    });

    function load_data(filter, category) {
        $.ajax({
            url: '/',
            method: "POST",
            data: { action: 'fetch', filter: filter, category: category},
            dataType: "JSON",
            success: function (data)
            {
                var html = '';

                if(data.data.length > 0)
                {
                    for(var count = 0; count < data.data.length; count++)
                    {
                        html += `
                        <div class="bg-MyBlack border border-MyPaleGray rounded p-6 text-left flex flex-col justify-between gap-5">
                            <div class="flex flex-col justify-between h-full">
                                <div>
                                    <p class="font-semibold text-MyYellow mb-1">`+ data.data[count].toyname +`</p>
                                    <p class="text-sm">`+ data.data[count].description +`</p>
                                </div>
                                <div>
                                    <img src="/images/toy/`+ data.data[count].image +`" alt="" class="rounded mt-4 object-cover w-full h-[220px]">
                                </div>
                            </div>
                            <div class="w-full h-0.5 bg-white opacity-10"></div>
                            <div class="flex justify-between">
                                <div class="text-sm">
                                    <p class="">Price:<span class="text-MyYellow ml-2">$`+ data.data[count].price +`</span></p>
                                    <p class="">Origin:<span class="text-MyYellow ml-2">`+ data.data[count].origin +`</span></p>
                                </div>
                                <div>
                                    <button class="border border-MyYellow p-3 text-xs hover:bg-MyYellow hover:text-MyBlack">`+ data.data[count].categoryname +`</button>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                }

                $('#resultData').html(html);

            }
        });
    }

});