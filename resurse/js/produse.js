window.addEventListener("load", function(){

    document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }


    // document.getElementById("filtrare").addEventListener("click", function(){ })
    document.getElementById("filtrare").onclick= function(){
        var inpNume= document.getElementById("inp-nume").value.toLowerCase().trim();

        var radioViteza=document.getElementsByName("gr_rad")
        let inpViteza;
        for (let rad of radioViteza){
            if (rad.checked){
                inpViteza=rad.value;
                break;
            }
        }
        let minViteza, maxViteza
        if (inpViteza!="toate"){
            vCal=inpViteza.split(":")
            minViteza=parseInt(vCal[0])
            maxViteza=parseInt(vCal[1])
        }


        var inpPret= parseInt(document.getElementById("inp-pret").value);

        var inpCateg=document.getElementById("inp-categorie").value.toLowerCase().trim()


        var produse=document.getElementsByClassName("produs");
        for (let produs of produse){

            let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim()

            let cond1= valNume.startsWith(inpNume)


            let valViteza = parseInt(produs.getElementsByClassName("val-viteza")[0].innerHTML)

            let cond2=(inpViteza=="toate" || (minViteza<= valViteza && valViteza < maxViteza));

            let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
            let cond3=(valPret>inpPret)


            let valCategorie = produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase().trim()
            let cond4 =(inpCateg==valCategorie || inpCateg=="toate")

            if (cond1 && cond2 && cond3 && cond4){
                produs.style.display="block";
            }
            else{
                
                produs.style.display="none";
            }


        }



    }

    document.getElementById("resetare").onclick= function(){
                
        document.getElementById("inp-nume").value="";
        
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value="toate";
        document.getElementById("i_rad4").checked=true;
        var produse=document.getElementsByClassName("produs");
        document.getElementById("infoRange").innerHTML="(0)";
        for (let prod of produse){
            prod.style.display="block";
        }
    }



    function sorteaza (semn){
        var produse=document.getElementsByClassName("produs");
        let v_produse=Array.from(produse)
        v_produse.sort(function(a,b){
            let pret_a=parseInt(a.getElementsByClassName("val-pret")[0].innerHTML)
            let pret_b=parseInt(b.getElementsByClassName("val-pret")[0].innerHTML)
            if (pret_a==pret_b){
                let nume_a=a.getElementsByClassName("val-nume")[0].innerHTML
                let nume_b=b.getElementsByClassName("val-nume")[0].innerHTML
                return semn*nume_a.localeCompare(nume_b);
            }
            return semn*(pret_a-pret_b);
        })
        console.log(v_produse)
        for (let prod of v_produse){
            prod.parentNode.appendChild(prod)
        }

    }
    
    document.getElementById("sortCrescNume").onclick= function(){
        sorteaza(1)
    }
    document.getElementById("sortDescrescNume").onclick= function(){
        sorteaza(-1)
    }



    window.onkeydown=function(e){
        if (e.key=="c" && e.altKey){
            var suma=0;
            var produse=document.getElementsByClassName("produs");
            for (let produs of produse){
                var stil=getComputedStyle(produs)
                if (stil.display!="none"){
                    suma+=parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
                }
            }
            if (!document.getElementById("par_suma")){
                let p= document.createElement("p")
                p.innerHTML=suma;
                p.id="par_suma";
                container=document.getElementById("produse")
                container.insertBefore(p,container.children[0])
                setTimeout(function(){
                    var pgf=document.getElementById("par_suma")
                    if(pgf)
                        pgf.remove()
                }, 2000)
            }

        }
    }


})