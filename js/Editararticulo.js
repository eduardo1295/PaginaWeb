$(document).on('ready',function() {
    AJAXCallUpdate();
});

function AJAXCallUpdate() {
    $('#addUser').off('click');
    $('th > i.fa-edit').on('click', function(){
        var Articulo = $(this).parent().siblings();
        $.confirm({
            title: 'Editar Artículo',
            icon: 'fa fa-edit',
            theme: 'supervan',
            columnClass: 'col-md-10 col-md-offset-1',
            content: '',
            buttons: {
                formSubmit: {
                    btnClass: 'btn btn-green btn-green',
                    text: 'Guardar',
                    action: function(){ 

                    }
                },
                cancel: {
                    text: 'Cancelar',
                    btnClass: 'btn-red'
                }
            }
        });
    });
    $('th > i.fa-trash').on('click', function(){
        var Articulo = $(this).parent().siblings();
        $.confirm({
            title: 'AVISO',
            content: '¿Esta seguro que desea eliminar este artículo?',
            type: 'red',
            icon: 'fa fa-window-close',
            theme: 'modern',
            buttons: {
                Eliminar: {
                    text: 'ELIMINAR',
                    btnClass: 'btn-red',
                    action: function() {
                        
                    }
                },
                cancel: {
                    text: 'Cancelar'
                }
            }
        });
    });
    
    $('#addUser').on('click', function() {
        $.confirm({
            title: 'Agregar Artículo',
            theme: 'supervan',
            content: Registrar(),
            columnClass: 'col-md-10 col-md-offset-1',
            icon: 'fa fa-user-plus',
            buttons: {
                submit: {
                    text: 'Registrar',
                    btnClass: 'btn-green',
                    action: {
                        
                    }
                },
                cancel: {
                    text: 'Cancelar',
                    btnClass: 'btn-red'
                }
            }
        });
    });
}

function ActualizarTabla(Sending) {
    console.log(Sending);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status==200) {
            if (this.responseText.substr(0,5) != "ERROR") {
                $('#Tabla').html(this.responseText);
                AJAXCallUpdate();
                $.alert({
                    title: 'Hurra!!!',
                    icon: 'fa fa-check',
                    theme: 'modern',
                    type: 'green',
                    escapeKey: true,
                    content: 'Base de datos actualizada con éxito'
                });
            } else {
                $.alert({
                    title: 'ERROR :(',
                    icon: 'fa fa-window-close',
                    theme: 'modern',
                    type: 'red',
                    content: 'Hubo algún error, por favor intente más tarde.'
                });
            }
        }
    }
    xhttp.open("POST", "php/AJAXArticulo.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(Sending);
}

function Registrar() {
    return ''+
    '<form class="colorlib-form" style="color:black;">'+
        '<div class="row">'+
            '<div class="form-group">'+
                //Nombre Artículo
                '<div class="col-md-6">'+
                    '<label>Nombre</label>'+
                    '<input type="text" class="form-control" name="Nombre" id="Nombre" placeholder="Nombre" required>'+
                '</div>'+
                //Precio
                '<div class="col-md-3">'+
                    '<label>Precio</label>'+
                    '<input type="number" step="any" min="0" name="Precio" id="Precio" placeholder="Precio" class="form-control" required>'+
                '</div>'+
                //Stock
                '<div class="col-md-3">'+
                    '<label>Stock</label>'+
                    '<input type="number" step="1" min="0" max="9999" name="Stock" id="Stock" placeholder="Stock" class="form-control" required>'+
                '</div>'+
            '</div>'+
            '<div class="form-group">'+
                //Características
                '<div class="col-md-6">'+
                    '<label>Características</label>'+
                    '<textarea class="form-control" name="Caracteristicas" id="Caracteristicas" placeholder="Características"></textarea>'+
                '</div>'+
                //Descripcion
                '<div class="col-md-6">'+
                    '<label>Descripción</label>'+
                    '<textarea class="form-control" name="Descripcion" id="Descripcion" placeholder="Descripción"></textarea>'+
                '</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<input id="files" name="files" type="file" required style="margin: 0 auto;" multiple onchange="readURL(this);">'+
                '<div id="img" style="overflow:auto;border:1px dashed black;width:80%;'+
                'min-height:100px;margin:10px auto;" ondrop="drop(event);" ondragover="allowDrop(event);">'+
                    '<img id="Message4" src="#" alt="Arrastre aquí para subir archivos\nMáximo 4 imágenes" style="max-width:100%;padding:10px">'+
                    '<img id="U1" src="" alt="" style="Display:none;">'+
                    '<img id="U2" src="" alt="" style="Display:none;">'+
                    '<img id="U3" src="" alt="" style="Display:none;">'+
                    '<img id="U4" src="" alt="" style="Display:none;">'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</form>';
}

function readURL(input) {
    if (input.files) {
        setImage(input.files);
    }
}

function setImage(Files) {
    $('#U1, #U2, #U3, #U4').css('display', 'none');
    $('#U1, #U2, #U3, #U4').css('float', 'left');
    if (Files.length > 4) {
        $.alert({
            title: 'ERROR:',
            content: 'No se pueden subir más de 4 archivos',
            icon: 'fa fa-window-close',
            theme: 'supervan'
        });
        $('#files').val('');
        $('#Message4').css('display', 'block');
    } else {
        if (Files.length > 0) {
            $('#Message4').css('display', 'none');
            for (let i = 0; i < Files.length; i++) {
                var r = new FileReader();
                $('#U1, #U2, #U3, #U4').css('width', (100/Files.length)+'%');
                r.onload = function(e) {
                    var $img = $('#U'+(i+1));
                    $img.attr('src', e.target.result);
                    $img.css('display', 'block');
                }
                r.readAsDataURL(Files[i]);   
            }
        }
    }
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.files)
        setImage(ev.dataTransfer.files);
}