(function () {
   /* var table = document.getElementById('action-btn');
    var selectwrapper = document.createElement('div');
    var select = document.createElement('select');
    select.className = 'dropdown';
    var option = document.createElement('option');
    var option1 = document.createElement('option');
    var option2 = document.createElement('option');
    option.innerText = "Actions";
    option.disabled = true;
    option.selected = true;
    option1.innerText = "View Properties";
    option2.innerText = "Add To Collection";
    select.appendChild(option);
    select.appendChild(option1);
    select.appendChild(option2);
    selectwrapper.appendChild(select);
    selectwrapper.style.visibility = 'hidden';
table.appendChild(selectwrapper);
    var table = $('#table_id').DataTable( {
        language: {
            search: "",
            searchPlaceholder: "Filter – All Pages"
        },
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]],*/
        //data: data,
       /* columns: [
            {
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },
            { data: 'position' },
            { data: 'salary' }
        ]
    } );
     */
table.on( 'select', function ( e, dt, type, indexes ) {
    var count = table.rows( { selected: true } ).count();
    if(count === 0){
        selectwrapper.style.visibility = 'hidden';
    }
    else{
        selectwrapper.style.visibility = 'visible';
    }
   // if ( type === 'row' ) {
      //  var data = table.rows( indexes ).data().pluck( 'id' );
 
        // do something with the ID of the selected items
   // }
} );
table.on( 'deselect', function ( e, dt, type, indexes ) {
    var count = table.rows( { selected: true } ).count();
    if(count === 0){
        selectwrapper.style.visibility = 'hidden';
    }
    else{
        selectwrapper.style.visibility = 'visible';
    }
   // if ( type === 'row' ) {
      //  var data = table.rows( indexes ).data().pluck( 'id' );
 
        // do something with the ID of the selected items
   // }
} );
    /*var tableHeaders = document.getElementsByTagName("th");
    (function () {
         for(var j = 0; j< tableHeaders.length; j++){
             tableHeaders[j].id = tableHeaders[j].innerHTML.toLowerCase().replace(" ", "");
         }
     })();*/
  
     function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById('openbtn').style.visibility = "hidden";
      }
      
      function closeNav() {
          console.log('closenav func called');
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.getElementById('openbtn').style.visibility = "visible";
      }
  

    $(document).ready( function () {
       /* $('#table_id').DataTable();*/
        $( ".closebtn" ).click(function() {
            closeNav();
        });
        $( ".openbtn" ).click(function() {
            openNav();
        });
        $('input.toggle-vis').on( 'click', function (e) {
            //e.preventDefault();
     
            // Get the column API object
            var column = table.column( $(this).attr('data-column') );
     
            // Toggle the visibility
            column.visible( ! column.visible(), false );
        
        } );
    } );
    


})();
