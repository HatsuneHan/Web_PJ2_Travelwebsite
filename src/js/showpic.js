function showPreview(source, imgId) {
    var file = source.files[0];
    if(window.FileReader) {

        try {
            var fr = new FileReader();
            fr.onloadend = function(e)
            {
                document.getElementById(imgId).src = e.target.result;
            };
            fr.readAsDataURL(file);
            document.getElementById("nopic").style.display="none";
        }catch(err){
            document.getElementById(imgId).src = "";
            document.getElementById("nopic").style.display="block";
        }

    }
}