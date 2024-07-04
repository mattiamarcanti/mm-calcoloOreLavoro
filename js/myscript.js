      var varOreLunedi = 8;
      var varOreMartedi = 8;
      var varOreMercoledi = 8;
      var varOreGiovedi = 8;
      var varOreVenerdi = 8;

      var varMinutiLunedi = 0;
      var varMinutiMartedi = 0;
      var varMinutiMercoledi = 0;
      var varMinutiGiovedi = 0;
      var varMinutiVenerdi = 0;

      var varOrePranzoLunedi = 0;
      var varOrePranzoMartedi = 0;
      var varOrePranzoMercoledi = 0;
      var varOrePranzoGiovedi = 0;
      var varOrePranzoVenerdi = 0;

      var varMinutiPranzoLunedi = 0;
      var varMinutiPranzoMartedi = 0;
      var varMinutiPranzoMercoledi = 0;
      var varMinutiPranzoGiovedi = 0;
      var varMinutiPranzoVenerdi = 0;

      var varOreExtraLunedi = 0;
      var varOreExtraMartedi = 0;
      var varOreExtraMercoledi = 0;
      var varOreExtraGiovedi = 0;
      var varOreExtraVenerdi= 0;

      var varMinutiExtraLunedi = 0;
      var varMinutiExtraMartedi = 0;
      var varMinutiExtraMercoledi = 0;
      var varMinutiExtraGiovedi = 0;
      var varMinutiExtraVenerdi= 0;

      var varOrePermessoLunedi = 0;
      var varOrePermessoMartedi = 0;
      var varOrePermessoMercoledi = 0;
      var varOrePermessoGiovedi = 0;
      var varOrePermessoVenerdi= 0;

      var varMinutiPermessoLunedi = 0;
      var varMinutiPermessoMartedi = 0;
      var varMinutiPermessoMercoledi = 0;
      var varMinutiPermessoGiovedi = 0;
      var varMinutiPermessoVenerdi= 0;

      var deltaSettimanaleLunedi = 0;
      var deltaSettimanaleMartedi = 0;
      var deltaSettimanaleMercoledi = 0;
      var deltaSettimanaleGiovedi = 0;
      var deltaSettimanaleVenerdi = 0;

      var oreSettimanaliTotali = 40;
      var minutiSettimanaliTotali = 0;
    
      //***************************************** GLOBALI ******************************************************

      function aggiornaTuttiOrari(){
        aggiornaLunedi();
        aggiornaMartedi();
        aggiornaMercoledi();
        aggiornaGiovedi();
        aggiornaVenerdi();
        aggiornaDelta();
        aggiornaOreTotali();
      }

      function aggiornaDelta(){
         var deltaOreLunedi, deltaOreMartedi, deltaOreMercoledi, deltaOreGiovedi, deltaOreVenerdi;
         var deltaMinutiLunedi, deltaMinutiMartedi, deltaMinutiMercoledi, deltaMinutiGiovedi, deltaMinutiVenerdi;

         var oreLunediString = document.getElementById('oreTotaliLunedi').textContent;
         var oreMartediString = document.getElementById('oreTotaliMartedi').textContent;
         var oreMercolediString = document.getElementById('oreTotaliMercoledi').textContent;
         var oreGiovediString = document.getElementById('oreTotaliGiovedi').textContent;
         var oreVenerdiString = document.getElementById('oreTotaliVenerdi').textContent;

         deltaOreLunedi = parseInt(oreLunediString.split(':')[0]);
         deltaMinutiLunedi = parseInt(oreLunediString.split(':')[1]);
         deltaOreMartedi = parseInt(oreMartediString.split(':')[0]);
         deltaMinutiMartedi = parseInt(oreMartediString.split(':')[1]);
         deltaOreMercoledi = parseInt(oreMercolediString.split(':')[0]);
         deltaMinutiMercoledi = parseInt(oreMercolediString.split(':')[1]);
         deltaOreGiovedi = parseInt(oreGiovediString.split(':')[0]);
         deltaMinutiGiovedi = parseInt(oreGiovediString.split(':')[1]);
         deltaOreVenerdi = parseInt(oreVenerdiString.split(':')[0]);
         deltaMinutiVenerdi = parseInt(oreVenerdiString.split(':')[1]);


         //lun
        document.getElementById('tdDeltaLunedi').classList.remove('orePositive');
        document.getElementById('tdDeltaLunedi').classList.remove('oreNegative');
        if(deltaOreLunedi >= 8){
          document.getElementById('tdDeltaLunedi').classList.add('orePositive');
        } else {
          document.getElementById('tdDeltaLunedi').classList.add('oreNegative');
        }
        var distanzaLunedi = calcolaDistanzaDaNOre(deltaOreLunedi,deltaMinutiLunedi,8);
        var tempoFormattato = distanzaLunedi.ore + ":" + (distanzaLunedi.minuti < 10 ? "0" : "") + distanzaLunedi.minuti;
			  document.getElementById('deltaLunedi').textContent = tempoFormattato;

        
        //delta lun e mar
        deltaOreMartedi = deltaOreLunedi + deltaOreMartedi;
        deltaMinutiMartedi = deltaMinutiLunedi + deltaMinutiMartedi;
        while(deltaMinutiMartedi > 59){
          deltaMinutiMartedi = deltaMinutiMartedi - 60;
          deltaOreMartedi++;
        }
        document.getElementById('tdDeltaMartedi').classList.remove('orePositive');
        document.getElementById('tdDeltaMartedi').classList.remove('oreNegative');
        if(deltaOreMartedi >= 16){
          document.getElementById('tdDeltaMartedi').classList.add('orePositive');
        } else {
          document.getElementById('tdDeltaMartedi').classList.add('oreNegative');
        }
        var distanzaMartedi = calcolaDistanzaDaNOre(deltaOreMartedi,deltaMinutiMartedi,16);
        var tempoFormattato = distanzaMartedi.ore + ":" + (distanzaMartedi.minuti < 10 ? "0" : "") + distanzaMartedi.minuti;
			  document.getElementById('deltaMartedi').textContent = tempoFormattato;


        //delta lun mar e mer
        deltaOreMercoledi = deltaOreMartedi + deltaOreMercoledi;
        deltaMinutiMercoledi = deltaMinutiMartedi + deltaMinutiMercoledi;
        while(deltaMinutiMercoledi > 59){
          deltaMinutiMercoledi = deltaMinutiMercoledi - 60;
          deltaOreMercoledi++;
        }
        document.getElementById('tdDeltaMercoledi').classList.remove('orePositive');
        document.getElementById('tdDeltaMercoledi').classList.remove('oreNegative');
        if(deltaOreMercoledi >= 24){
          document.getElementById('tdDeltaMercoledi').classList.add('orePositive');
        } else {
          document.getElementById('tdDeltaMercoledi').classList.add('oreNegative');
        }
        var distanzaMercoledi = calcolaDistanzaDaNOre(deltaOreMercoledi,deltaMinutiMercoledi,24);
        var tempoFormattato = distanzaMercoledi.ore + ":" + (distanzaMercoledi.minuti < 10 ? "0" : "") + distanzaMercoledi.minuti;
			  document.getElementById('deltaMercoledi').textContent = tempoFormattato;

        //delta lun mar mer e gio
        deltaOreGiovedi = deltaOreMercoledi + deltaOreGiovedi;
        deltaMinutiGiovedi = deltaMinutiMercoledi + deltaMinutiGiovedi;
        while(deltaMinutiGiovedi > 59){
          deltaMinutiGiovedi = deltaMinutiGiovedi - 60;
          deltaOreGiovedi++;
        }
        document.getElementById('tdDeltaGiovedi').classList.remove('orePositive');
        document.getElementById('tdDeltaGiovedi').classList.remove('oreNegative');
        if(deltaOreGiovedi >= 32){
          document.getElementById('tdDeltaGiovedi').classList.add('orePositive');
        } else {
          document.getElementById('tdDeltaGiovedi').classList.add('oreNegative');
        }
        var distanzaGiovedi = calcolaDistanzaDaNOre(deltaOreGiovedi,deltaMinutiGiovedi,32);
        var tempoFormattato = distanzaGiovedi.ore + ":" + (distanzaGiovedi.minuti < 10 ? "0" : "") + distanzaGiovedi.minuti;
			  document.getElementById('deltaGiovedi').textContent = tempoFormattato;


        //delta lun mar mer gio e ven
        deltaOreVenerdi = deltaOreGiovedi + deltaOreVenerdi;
        deltaMinutiVenerdi = deltaMinutiGiovedi + deltaMinutiVenerdi;
        while(deltaMinutiVenerdi > 59){
          deltaMinutiVenerdi = deltaMinutiVenerdi - 60;
          deltaOreVenerdi++;
        }
        document.getElementById('tdDeltaVenerdi').classList.remove('orePositive');
        document.getElementById('tdDeltaVenerdi').classList.remove('oreNegative');
        if(deltaOreVenerdi >= 40){
          document.getElementById('tdDeltaVenerdi').classList.add('orePositive');
        } else {
          document.getElementById('tdDeltaVenerdi').classList.add('oreNegative');
        }
        var distanzaVenerdi = calcolaDistanzaDaNOre(deltaOreVenerdi,deltaMinutiVenerdi,40);
        var tempoFormattato = distanzaVenerdi.ore + ":" + (distanzaVenerdi.minuti < 10 ? "0" : "") + distanzaVenerdi.minuti;
			  document.getElementById('deltaVenerdi').textContent = tempoFormattato;
         
      }

      function aggiornaOreTotali(){

        oreSettimanaliTotali = varOreLunedi + varOreMartedi + varOreMercoledi + varOreGiovedi + varOreVenerdi;
        oreSettimanaliTotali += varOreExtraLunedi + varOreExtraMartedi + varOreExtraMercoledi + varOreExtraGiovedi + varOreExtraVenerdi;
        oreSettimanaliTotali += varOrePermessoLunedi + varOrePermessoMartedi + varOrePermessoMercoledi + varOrePermessoGiovedi + varOrePermessoVenerdi;

        minutiSettimanaliTotali = varMinutiLunedi + varMinutiMartedi + varMinutiMercoledi + varMinutiGiovedi + varMinutiVenerdi;
        minutiSettimanaliTotali += varMinutiExtraLunedi + varMinutiExtraMartedi + varMinutiExtraMercoledi + varMinutiExtraGiovedi + varMinutiExtraVenerdi;
        minutiSettimanaliTotali += varMinutiPermessoLunedi +varMinutiPermessoMartedi + varMinutiPermessoMercoledi + varMinutiPermessoGiovedi + varMinutiPermessoVenerdi;

        while (minutiSettimanaliTotali > 59){
          minutiSettimanaliTotali = minutiSettimanaliTotali - 60;
          oreSettimanaliTotali++;
        }

        document.getElementById('tdOreTotali').classList.remove('orePositive');
        document.getElementById('tdOreTotali').classList.remove('oreNegative');

        if (oreSettimanaliTotali >= 40) {
					document.getElementById('tdOreTotali').classList.add('orePositive');
				  } else {
					document.getElementById('tdOreTotali').classList.add('oreNegative');
				  }			  
			  var tempoFormattato = oreSettimanaliTotali + ":" + (minutiSettimanaliTotali < 10 ? "0" : "") + minutiSettimanaliTotali;
			  document.getElementById('tdOreTotali').textContent = tempoFormattato;

      }

      function calcolaOre(entrata1Ore, entrata1Min, uscita1Ore, uscita1Min, entrata2Ore, entrata2Min, uscita2Ore, uscita2Min) {
        // Convertire ore e minuti in millisecondi
       const MILLISECONDS_PER_MINUTE = 60 * 1000;
        const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
      
        // Calcolare la differenza in millisecondi
        const tempoTrascorso1 = (
          (uscita1Ore * MILLISECONDS_PER_HOUR + uscita1Min * MILLISECONDS_PER_MINUTE) -
          (entrata1Ore * MILLISECONDS_PER_HOUR + entrata1Min * MILLISECONDS_PER_MINUTE)
        );
      
        const tempoTrascorso2 = (
          (uscita2Ore * MILLISECONDS_PER_HOUR + uscita2Min * MILLISECONDS_PER_MINUTE) -
          (entrata2Ore * MILLISECONDS_PER_HOUR + entrata2Min * MILLISECONDS_PER_MINUTE)
        );
      
        // Convertire i millisecondi in ore e minuti
        const oreTrascorse1 = Math.floor(tempoTrascorso1 / MILLISECONDS_PER_HOUR);
        const minutiTrascorsi1 = Math.floor((tempoTrascorso1 % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);
      
        const oreTrascorse2 = Math.floor(tempoTrascorso2 / MILLISECONDS_PER_HOUR);
        const minutiTrascorsi2 = Math.floor((tempoTrascorso2 % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);

        var ore = oreTrascorse1 + oreTrascorse2;
        var minuti = minutiTrascorsi1 + minutiTrascorsi2;
        while(minuti > 59 ){
          minuti = minuti - 60;
          ore++;
        }
      
        // Restituire il tempo trascorso in minuti e ore
        return {
            oreLavorate: ore,
            minutiLavorati: minuti
        };
      }

      function calcolaPranzo(uscita1Ore, uscita1Min, entrata2Ore, entrata2Min) {
        // Convertire ore e minuti in millisecondi
        const MILLISECONDS_PER_MINUTE = 60 * 1000;
        const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
      
        // Calcolare la differenza in millisecondi
        const tempoPranzo = (
          (entrata2Ore * MILLISECONDS_PER_HOUR + entrata2Min * MILLISECONDS_PER_MINUTE) -
          (uscita1Ore * MILLISECONDS_PER_HOUR + uscita1Min * MILLISECONDS_PER_MINUTE)
        );
      
        // Convertire i millisecondi in ore e minuti
        const orePranzo = Math.floor(tempoPranzo / MILLISECONDS_PER_HOUR);
        const minutiPranzo = Math.floor((tempoPranzo % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);
      
        // Restituire il tempo trascorso in minuti e ore
        return {
          ore: orePranzo,
          minuti: minutiPranzo
        };
      }


      function calcolaDistanzaDaNOre(ore, minuti, n) {
        // Convertire ore e minuti in minuti totali
        var minutiTotali = (ore * 60) + minuti;
      
        // Calcolare la differenza in minuti rispetto a n ore
        var differenzaMinuti = Math.abs(minutiTotali - (n * 60));
        
      
      
        // Restituire la differenza in ore e minuti (positivi o negativi)
        var oreDifferenza = 0;
        while(differenzaMinuti > 59){
          differenzaMinuti = differenzaMinuti - 60;
          oreDifferenza++;
        }
        return {
          ore: oreDifferenza,
          minuti: differenzaMinuti
        };
      }





      

      //***************************************** LUNEDI ******************************************************
      function aggiornaLunedi(){
        if (varOreLunedi >= 0 && varOreLunedi < 24 && 
              varMinutiLunedi >= 0 && varMinutiLunedi < 60 &&
                varOreExtraLunedi >= 0 && varOreExtraLunedi < 24 &&
                  varMinutiExtraLunedi >= 0 && varMinutiExtraLunedi < 60 &&
                    varOrePermessoLunedi >= 0 && varOrePermessoLunedi < 24 &&
                      varMinutiPermessoLunedi >= 0 && varMinutiPermessoLunedi < 60) {
				 document.getElementById('tdOreLunedi').classList.remove('orePositive');
				 document.getElementById('tdOreLunedi').classList.remove('oreNegative');
         var totOre = varOreLunedi + varOreExtraLunedi + varOrePermessoLunedi;
         var totMinuti = varMinutiLunedi + varMinutiPermessoLunedi + varMinutiExtraLunedi;
         while(totMinuti > 59){
          totMinuti = totMinuti - 60;
          totOre++;
         }
				 if (totOre >= 8) {
					document.getElementById('tdOreLunedi').classList.add('orePositive');
				  } else {
					document.getElementById('tdOreLunedi').classList.add('oreNegative');
				  }			  
			  var tempoFormattato = totOre + ":" + (totMinuti < 10 ? "0" : "") + totMinuti;
			  document.getElementById('oreTotaliLunedi').textContent = tempoFormattato;

        var pranzoFormattato = varOrePranzoLunedi + ":" + (varMinutiPranzoLunedi < 10 ? "0" : "") + varMinutiPranzoLunedi;
			  document.getElementById('pausaLunedi').textContent = pranzoFormattato;
        } else {
          document.getElementById('oreTotaliLunedi').textContent = "Formato ora non valido";
        }
      }



      //Evento su Ore Lunedi
        document.getElementById('orelunedi').addEventListener('input', function() {
            const elementiTimbratureLunedi = document.querySelectorAll('.timbratureLunedi');
            elementiTimbratureLunedi.forEach(function(elemento) {
            elemento.value = '';
            });
            var oreString = this.value;
            if (oreString.length == 3) {
                varOreLunedi = parseInt(oreString.substring(0, 1));
                varMinutiLunedi = parseInt(oreString.substring(1, 3));
            } else if (oreString.length == 4) {
                varOreLunedi = parseInt(oreString.substring(0, 2));
                varMinutiLunedi = parseInt(oreString.substring(2, 4));
            } else {
                varOreLunedi = 8;
                varMinutiLunedi = 0;
                document.getElementById('oreTotaliLunedi').textContent = "Formato ora non valido";
            }
            aggiornaTuttiOrari();       
		});

    //Evento su Ore Permesso Lunedi
    document.getElementById('orePermessolunedi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOrePermessoLunedi = parseInt(oreString.substring(0, 1));
          varMinutiPermessoLunedi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
            varOrePermessoLunedi = parseInt(oreString.substring(0, 2));
            varMinutiPermessoLunedi = parseInt(oreString.substring(2, 4));
        } else {
          varOrePermessoLunedi = 0;
          varMinutiPermessoLunedi = 0;
      }
      aggiornaTuttiOrari(); 
	});

    //Evento su Ore Extra Lunedi
    document.getElementById('oreExtralunedi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOreExtraLunedi = parseInt(oreString.substring(0, 1));
          varMinutiExtraLunedi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
          varOreExtraLunedi = parseInt(oreString.substring(0, 2));
          varMinutiExtraLunedi = parseInt(oreString.substring(2, 4));
        } else {
          varOreExtraLunedi = 0;
        varMinutiExtraLunedi = 0;
        }
      aggiornaTuttiOrari();   
		});

    //Evento su Entrate/Uscite del Lunedi
    function gestisciTimbratureLunedi(event) {

        var entrataMattinalunediString = document.getElementById('entrataMattinalunedi').value;
        var uscitaMattinalunediString = document.getElementById('uscitaMattinalunedi').value;
        var entrataPomelunediString =  document.getElementById('entrataPomelunedi').value;
        var uscitaPomelunediString = document.getElementById('uscitaPomelunedi').value;

        if(entrataMattinalunediString.length < 3 || uscitaMattinalunediString.length  < 4 
              || entrataPomelunediString.length < 4 || uscitaPomelunediString.length < 4){
          varOreLunedi = 8;
          varMinutiLunedi = 0;
        } else {
          var entr1ore, entr2ore, entr1min, entr2min, usc1ore, usc2ore, usc1min, usc2min;

          if(entrataMattinalunediString.length == 3){
            entr1ore = parseInt(entrataMattinalunediString.substring(0, 1));
            entr1min = parseInt(entrataMattinalunediString.substring(1, 3));
          } else if (entrataMattinalunediString.length == 4){
            entr1ore = parseInt(entrataMattinalunediString.substring(0, 2));
            entr1min = parseInt(entrataMattinalunediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliLunedi').textContent = "Formato ora non valido";
          }

          if (uscitaMattinalunediString.length == 4){
            usc1ore = parseInt(uscitaMattinalunediString.substring(0, 2));
            usc1min = parseInt(uscitaMattinalunediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliLunedi').textContent = "Formato ora non valido";
          }

          if (entrataPomelunediString.length == 4){
            entr2ore = parseInt(entrataPomelunediString.substring(0, 2));
            entr2min = parseInt(entrataPomelunediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliLunedi').textContent = "Formato ora non valido";
          }

          if (uscitaPomelunediString.length == 4){
            usc2ore = parseInt(uscitaPomelunediString.substring(0, 2));
            usc2min = parseInt(uscitaPomelunediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliLunedi').textContent = "Formato ora non valido";
          }
          const risultato = calcolaOre(entr1ore, entr1min, usc1ore, usc1min, entr2ore, entr2min, usc2ore, usc2min);
          
          varOreLunedi = risultato.oreLavorate;
          varMinutiLunedi = risultato.minutiLavorati;

          const pranzo = calcolaPranzo(usc1ore,usc1min,entr2ore,entr2min);
          varOrePranzoLunedi = pranzo.ore;
          varMinutiPranzoLunedi = pranzo.minuti;
          
        }
        aggiornaTuttiOrari();
      }
      
      const inputElementiLunedi = document.querySelectorAll('.timbratureLunedi');
      for (const inputElemento of inputElementiLunedi) {
        inputElemento.addEventListener('input', gestisciTimbratureLunedi);
      }


















      //****************************************** MARTEDI ********************************************** */
      function aggiornaMartedi(){
        if (varOreMartedi >= 0 && varOreMartedi < 24 && 
              varMinutiMartedi >= 0 && varMinutiMartedi < 60 &&
                varOreExtraMartedi >= 0 && varOreExtraMartedi < 24 &&
                  varMinutiExtraMartedi >= 0 && varMinutiExtraMartedi < 60 &&
                    varOrePermessoMartedi >= 0 && varOrePermessoMartedi < 24 &&
                      varMinutiPermessoMartedi >= 0 && varMinutiPermessoMartedi < 60) {
				 document.getElementById('tdOreMartedi').classList.remove('orePositive');
				 document.getElementById('tdOreMartedi').classList.remove('oreNegative');
         var totOre = varOreMartedi + varOreExtraMartedi + varOrePermessoMartedi;
         var totMinuti = varMinutiMartedi + varMinutiExtraMartedi + varMinutiPermessoMartedi;
         while(totMinuti > 59){
          totMinuti = totMinuti - 60;
          totOre++;
         }
				 if (totOre >= 8) {
					document.getElementById('tdOreMartedi').classList.add('orePositive');
				  } else {
					document.getElementById('tdOreMartedi').classList.add('oreNegative');
				  }			  
			  var tempoFormattato = totOre + ":" + (totMinuti < 10 ? "0" : "") + totMinuti;
			  document.getElementById('oreTotaliMartedi').textContent = tempoFormattato;

        var pranzoFormattato = varOrePranzoMartedi + ":" + (varMinutiPranzoMartedi < 10 ? "0" : "") + varMinutiPranzoMartedi;
			  document.getElementById('pausaMartedi').textContent = pranzoFormattato;
        } else {
          document.getElementById('oreTotaliMartedi').textContent = "Formato ora non valido";
        }
      }



      //Evento su Ore Martedi
        document.getElementById('oremartedi').addEventListener('input', function() {
            const elementiTimbratureMartedi = document.querySelectorAll('.timbratureMartedi');
            elementiTimbratureMartedi.forEach(function(elemento) {
            elemento.value = '';
            });
            var oreString = this.value;
            if (oreString.length == 3) {
                varOreMartedi = parseInt(oreString.substring(0, 1));
                varMinutiMartedi = parseInt(oreString.substring(1, 3));
            } else if (oreString.length == 4) {
                varOreMartedi = parseInt(oreString.substring(0, 2));
                varMinutiMartedi = parseInt(oreString.substring(2, 4));
            } else {
                varOreMartedi = 8;
                varMinutiMartedi = 0;
                document.getElementById('oreTotaliMartedi').textContent = "Formato ora non valido";
            }
            aggiornaTuttiOrari();       
		});

    //Evento su Ore Permesso Martedi
    document.getElementById('orePermessomartedi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOrePermessoMartedi = parseInt(oreString.substring(0, 1));
          varMinutiPermessoMartedi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
            varOrePermessoMartedi = parseInt(oreString.substring(0, 2));
            varMinutiPermessoMartedi = parseInt(oreString.substring(2, 4));
        } else {
          varOrePermessoMartedi = 0;
          varMinutiPermessoMartedi = 0;
      }
      aggiornaTuttiOrari(); 
	});

    //Evento su Ore Extra Martedi
    document.getElementById('oreExtramartedi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOreExtraMartedi = parseInt(oreString.substring(0, 1));
          varMinutiExtraMartedi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
          varOreExtraMartedi = parseInt(oreString.substring(0, 2));
          varMinutiExtraMartedi = parseInt(oreString.substring(2, 4));
        } else {
          varOreExtraMartedi = 0;
          varMinutiExtraMartedi = 0;
        }
      aggiornaTuttiOrari();   
		});

    //Evento su Entrate/Uscite del Martedi
    function gestisciTimbratureMartedi(event) {

        var entrataMattinamartediString = document.getElementById('entrataMattinamartedi').value;
        var uscitaMattinamartediString = document.getElementById('uscitaMattinamartedi').value;
        var entrataPomemartediString =  document.getElementById('entrataPomemartedi').value;
        var uscitaPomemartediString = document.getElementById('uscitaPomemartedi').value;

        if(entrataMattinamartediString.length < 3 || uscitaMattinamartediString.length  < 4 
              || entrataPomemartediString.length < 4 || uscitaPomemartediString.length < 4){
          varOreMartedi = 8;
          varMinutiMartedi = 0;
        } else {
          var entr1ore, entr2ore, entr1min, entr2min, usc1ore, usc2ore, usc1min, usc2min;

          if(entrataMattinamartediString.length == 3){
            entr1ore = parseInt(entrataMattinamartediString.substring(0, 1));
            entr1min = parseInt(entrataMattinamartediString.substring(1, 3));
          } else if (entrataMattinamartediString.length == 4){
            entr1ore = parseInt(entrataMattinamartediString.substring(0, 2));
            entr1min = parseInt(entrataMattinamartediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMartedi').textContent = "Formato ora non valido";
          }

          if (uscitaMattinamartediString.length == 4){
            usc1ore = parseInt(uscitaMattinamartediString.substring(0, 2));
            usc1min = parseInt(uscitaMattinamartediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMartedi').textContent = "Formato ora non valido";
          }

          if (entrataPomemartediString.length == 4){
            entr2ore = parseInt(entrataPomemartediString.substring(0, 2));
            entr2min = parseInt(entrataPomemartediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMartedi').textContent = "Formato ora non valido";
          }

          if (uscitaPomemartediString.length == 4){
            usc2ore = parseInt(uscitaPomemartediString.substring(0, 2));
            usc2min = parseInt(uscitaPomemartediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMartedi').textContent = "Formato ora non valido";
          }
          const risultato = calcolaOre(entr1ore, entr1min, usc1ore, usc1min, entr2ore, entr2min, usc2ore, usc2min);
          
          varOreMartedi = risultato.oreLavorate;
          varMinutiMartedi = risultato.minutiLavorati;

          const pranzo = calcolaPranzo(usc1ore,usc1min,entr2ore,entr2min);
          varOrePranzoMartedi = pranzo.ore;
          varMinutiPranzoMartedi = pranzo.minuti;
          
        }
        aggiornaTuttiOrari();
      }
      
      const inputElementiMartedi = document.querySelectorAll('.timbratureMartedi');
      for (const inputElemento of inputElementiMartedi) {
        inputElemento.addEventListener('input', gestisciTimbratureMartedi);
      }





















      //****************************************** MERCOLEDI ********************************************** */
      function aggiornaMercoledi(){
        if (varOreMercoledi >= 0 && varOreMercoledi < 24 && 
              varMinutiMercoledi >= 0 && varMinutiMercoledi < 60 &&
                varOreExtraMercoledi >= 0 && varOreExtraMercoledi < 24 &&
                  varMinutiExtraMercoledi >= 0 && varMinutiExtraMercoledi < 60 &&
                    varOrePermessoMercoledi >= 0 && varOrePermessoMercoledi < 24 &&
                      varMinutiPermessoMercoledi >= 0 && varMinutiPermessoMercoledi < 60) {
				 document.getElementById('tdOreMercoledi').classList.remove('orePositive');
				 document.getElementById('tdOreMercoledi').classList.remove('oreNegative');
         var totOre = varOreMercoledi + varOreExtraMercoledi + varOrePermessoMercoledi;
         var totMinuti = varMinutiMercoledi + varMinutiExtraMercoledi + varMinutiPermessoMercoledi;
         while(totMinuti > 59){
          totMinuti = totMinuti - 60;
          totOre++;
         }
				 if (totOre >= 8) {
					document.getElementById('tdOreMercoledi').classList.add('orePositive');
				  } else {
					document.getElementById('tdOreMercoledi').classList.add('oreNegative');
				  }			  
			  var tempoFormattato = totOre + ":" + (totMinuti < 10 ? "0" : "") + totMinuti;
			  document.getElementById('oreTotaliMercoledi').textContent = tempoFormattato;

        var pranzoFormattato = varOrePranzoMercoledi + ":" + (varMinutiPranzoMercoledi < 10 ? "0" : "") + varMinutiPranzoMercoledi;
			  document.getElementById('pausaMercoledi').textContent = pranzoFormattato;
        } else {
          document.getElementById('oreTotaliMercoledi').textContent = "Formato ora non valido";
        }
      }



      //Evento su Ore Mercoledi
        document.getElementById('oremercoledi').addEventListener('input', function() {
            const elementiTimbratureMercoledi = document.querySelectorAll('.timbratureMercoledi');
            elementiTimbratureMercoledi.forEach(function(elemento) {
            elemento.value = '';
            });
            var oreString = this.value;
            if (oreString.length == 3) {
                varOreMercoledi = parseInt(oreString.substring(0, 1));
                varMinutiMercoledi = parseInt(oreString.substring(1, 3));
            } else if (oreString.length == 4) {
                varOreMercoledi = parseInt(oreString.substring(0, 2));
                varMinutiMercoledi = parseInt(oreString.substring(2, 4));
            } else {
                varOreMercoledi = 8;
                varMinutiMercoledi = 0;
                document.getElementById('oreTotaliMercoledi').textContent = "Formato ora non valido";
            }
            aggiornaTuttiOrari();       
		});

    //Evento su Ore Permesso Mercoledi
    document.getElementById('orePermessomercoledi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOrePermessoMercoledi = parseInt(oreString.substring(0, 1));
          varMinutiPermessoMercoledi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
            varOrePermessoMercoledi = parseInt(oreString.substring(0, 2));
            varMinutiPermessoMercoledi = parseInt(oreString.substring(2, 4));
        } else {
          varOrePermessoMercoledi = 0;
          varMinutiPermessoMercoledi = 0;
      }
      aggiornaTuttiOrari(); 
	});

    //Evento su Ore Extra Mercoledi
    document.getElementById('oreExtramercoledi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOreExtraMercoledi = parseInt(oreString.substring(0, 1));
          varMinutiExtraMercoledi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
          varOreExtraMercoledi = parseInt(oreString.substring(0, 2));
          varMinutiExtraMercoledi = parseInt(oreString.substring(2, 4));
        } else {
          varOreExtraMercoledi = 0;
          varMinutiExtraMercoledi = 0;
        }
      aggiornaTuttiOrari();   
		});

    //Evento su Entrate/Uscite del Mercoledi
    function gestisciTimbratureMercoledi(event) {

        var entrataMattinamercolediString = document.getElementById('entrataMattinamercoledi').value;
        var uscitaMattinamercolediString = document.getElementById('uscitaMattinamercoledi').value;
        var entrataPomemercolediString =  document.getElementById('entrataPomemercoledi').value;
        var uscitaPomemercolediString = document.getElementById('uscitaPomemercoledi').value;

        if(entrataMattinamercolediString.length < 3 || uscitaMattinamercolediString.length  < 4 
              || entrataPomemercolediString.length < 4 || uscitaPomemercolediString.length < 4){
          varOreMercoledi = 8;
          varMinutiMercoledi = 0;
        } else {
          var entr1ore, entr2ore, entr1min, entr2min, usc1ore, usc2ore, usc1min, usc2min;

          if(entrataMattinamercolediString.length == 3){
            entr1ore = parseInt(entrataMattinamercolediString.substring(0, 1));
            entr1min = parseInt(entrataMattinamercolediString.substring(1, 3));
          } else if (entrataMattinamercolediString.length == 4){
            entr1ore = parseInt(entrataMattinamercolediString.substring(0, 2));
            entr1min = parseInt(entrataMattinamercolediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMercoledi').textContent = "Formato ora non valido";
          }

          if (uscitaMattinamercolediString.length == 4){
            usc1ore = parseInt(uscitaMattinamercolediString.substring(0, 2));
            usc1min = parseInt(uscitaMattinamercolediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMercoledi').textContent = "Formato ora non valido";
          }

          if (entrataPomemercolediString.length == 4){
            entr2ore = parseInt(entrataPomemercolediString.substring(0, 2));
            entr2min = parseInt(entrataPomemercolediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMercoledi').textContent = "Formato ora non valido";
          }

          if (uscitaPomemercolediString.length == 4){
            usc2ore = parseInt(uscitaPomemercolediString.substring(0, 2));
            usc2min = parseInt(uscitaPomemercolediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliMercoledi').textContent = "Formato ora non valido";
          }
          const risultato = calcolaOre(entr1ore, entr1min, usc1ore, usc1min, entr2ore, entr2min, usc2ore, usc2min);
          
          varOreMercoledi = risultato.oreLavorate;
          varMinutiMercoledi = risultato.minutiLavorati;

          const pranzo = calcolaPranzo(usc1ore,usc1min,entr2ore,entr2min);
          varOrePranzoMercoledi = pranzo.ore;
          varMinutiPranzoMercoledi = pranzo.minuti;
          
        }
        aggiornaTuttiOrari();
      }
      
      const inputElementiMercoledi = document.querySelectorAll('.timbratureMercoledi');
      for (const inputElemento of inputElementiMercoledi) {
        inputElemento.addEventListener('input', gestisciTimbratureMercoledi);
      }







      //****************************************** GIOVEDI ********************************************** */
      function aggiornaGiovedi(){
        if (varOreGiovedi >= 0 && varOreGiovedi < 24 && 
              varMinutiGiovedi >= 0 && varMinutiGiovedi < 60 &&
                varOreExtraGiovedi >= 0 && varOreExtraGiovedi < 24 &&
                  varMinutiExtraGiovedi >= 0 && varMinutiExtraGiovedi < 60 &&
                    varOrePermessoGiovedi >= 0 && varOrePermessoGiovedi < 24 &&
                      varMinutiPermessoGiovedi >= 0 && varMinutiPermessoGiovedi < 60) {
				 document.getElementById('tdOreGiovedi').classList.remove('orePositive');
				 document.getElementById('tdOreGiovedi').classList.remove('oreNegative');
         var totOre = varOreGiovedi + varOreExtraGiovedi + varOrePermessoGiovedi;
         var totMinuti = varMinutiGiovedi + varMinutiExtraGiovedi + varMinutiPermessoGiovedi;
         while(totMinuti > 59){
          totMinuti = totMinuti - 60;
          totOre++;
         }
				 if (totOre >= 8) {
					document.getElementById('tdOreGiovedi').classList.add('orePositive');
				  } else {
					document.getElementById('tdOreGiovedi').classList.add('oreNegative');
				  }			  
			  var tempoFormattato = totOre + ":" + (totMinuti < 10 ? "0" : "") + totMinuti;
			  document.getElementById('oreTotaliGiovedi').textContent = tempoFormattato;

        var pranzoFormattato = varOrePranzoGiovedi + ":" + (varMinutiPranzoGiovedi < 10 ? "0" : "") + varMinutiPranzoGiovedi;
			  document.getElementById('pausaGiovedi').textContent = pranzoFormattato;
        } else {
          document.getElementById('oreTotaliGiovedi').textContent = "Formato ora non valido";
        }
      }



      //Evento su Ore Giovedi
        document.getElementById('oregiovedi').addEventListener('input', function() {
            const elementiTimbratureGiovedi = document.querySelectorAll('.timbratureGiovedi');
            elementiTimbratureGiovedi.forEach(function(elemento) {
            elemento.value = '';
            });
            var oreString = this.value;
            if (oreString.length == 3) {
                varOreGiovedi = parseInt(oreString.substring(0, 1));
                varMinutiGiovedi = parseInt(oreString.substring(1, 3));
            } else if (oreString.length == 4) {
                varOreGiovedi = parseInt(oreString.substring(0, 2));
                varMinutiGiovedi = parseInt(oreString.substring(2, 4));
            } else {
                varOreGiovedi = 8;
                varMinutiGiovedi = 0;
                document.getElementById('oreTotaliGiovedi').textContent = "Formato ora non valido";
            }
            aggiornaTuttiOrari();       
		});

    //Evento su Ore Permesso Giovedi
    document.getElementById('orePermessogiovedi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOrePermessoGiovedi = parseInt(oreString.substring(0, 1));
          varMinutiPermessoGiovedi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
            varOrePermessoGiovedi = parseInt(oreString.substring(0, 2));
            varMinutiPermessoGiovedi = parseInt(oreString.substring(2, 4));
        } else {
          varOrePermessoGiovedi = 0;
          varMinutiPermessoGiovedi = 0;
      }
      aggiornaTuttiOrari(); 
	});

    //Evento su Ore Extra Giovedi
    document.getElementById('oreExtragiovedi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOreExtraGiovedi = parseInt(oreString.substring(0, 1));
          varMinutiExtraGiovedi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
          varOreExtraGiovedi = parseInt(oreString.substring(0, 2));
          varMinutiExtraGiovedi = parseInt(oreString.substring(2, 4));
        } else {
          varOreExtraGiovedi = 0;
          varMinutiExtraGiovedi = 0;
        }
      aggiornaTuttiOrari();   
		});

    //Evento su Entrate/Uscite del Giovedi
    function gestisciTimbratureGiovedi(event) {

        var entrataMattinagiovediString = document.getElementById('entrataMattinagiovedi').value;
        var uscitaMattinagiovediString = document.getElementById('uscitaMattinagiovedi').value;
        var entrataPomegiovediString =  document.getElementById('entrataPomegiovedi').value;
        var uscitaPomegiovediString = document.getElementById('uscitaPomegiovedi').value;

        if(entrataMattinagiovediString.length < 3 || uscitaMattinagiovediString.length  < 4 
              || entrataPomegiovediString.length < 4 || uscitaPomegiovediString.length < 4){
          varOreGiovedi = 8;
          varMinutiGiovedi = 0;
        } else {
          var entr1ore, entr2ore, entr1min, entr2min, usc1ore, usc2ore, usc1min, usc2min;

          if(entrataMattinagiovediString.length == 3){
            entr1ore = parseInt(entrataMattinagiovediString.substring(0, 1));
            entr1min = parseInt(entrataMattinagiovediString.substring(1, 3));
          } else if (entrataMattinagiovediString.length == 4){
            entr1ore = parseInt(entrataMattinagiovediString.substring(0, 2));
            entr1min = parseInt(entrataMattinagiovediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliGiovedi').textContent = "Formato ora non valido";
          }

          if (uscitaMattinagiovediString.length == 4){
            usc1ore = parseInt(uscitaMattinagiovediString.substring(0, 2));
            usc1min = parseInt(uscitaMattinagiovediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliGiovedi').textContent = "Formato ora non valido";
          }

          if (entrataPomegiovediString.length == 4){
            entr2ore = parseInt(entrataPomegiovediString.substring(0, 2));
            entr2min = parseInt(entrataPomegiovediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliGiovedi').textContent = "Formato ora non valido";
          }

          if (uscitaPomegiovediString.length == 4){
            usc2ore = parseInt(uscitaPomegiovediString.substring(0, 2));
            usc2min = parseInt(uscitaPomegiovediString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliGiovedi').textContent = "Formato ora non valido";
          }
          const risultato = calcolaOre(entr1ore, entr1min, usc1ore, usc1min, entr2ore, entr2min, usc2ore, usc2min);
          
          varOreGiovedi = risultato.oreLavorate;
          varMinutiGiovedi = risultato.minutiLavorati;

          const pranzo = calcolaPranzo(usc1ore,usc1min,entr2ore,entr2min);
          varOrePranzoGiovedi = pranzo.ore;
          varMinutiPranzoGiovedi = pranzo.minuti;
          
        }
        aggiornaTuttiOrari();
      }
      
      const inputElementiGiovedi = document.querySelectorAll('.timbratureGiovedi');
      for (const inputElemento of inputElementiGiovedi) {
        inputElemento.addEventListener('input', gestisciTimbratureGiovedi);
      }      














      //****************************************** VENERDI ********************************************** */
      function aggiornaVenerdi(){
        if (varOreVenerdi >= 0 && varOreVenerdi < 24 && 
              varMinutiVenerdi >= 0 && varMinutiVenerdi < 60 &&
                varOreExtraVenerdi >= 0 && varOreExtraVenerdi < 24 &&
                  varMinutiExtraVenerdi >= 0 && varMinutiExtraVenerdi < 60 &&
                    varOrePermessoVenerdi >= 0 && varOrePermessoVenerdi < 24 &&
                      varMinutiPermessoVenerdi >= 0 && varMinutiPermessoVenerdi < 60) {
				 document.getElementById('tdOreVenerdi').classList.remove('orePositive');
				 document.getElementById('tdOreVenerdi').classList.remove('oreNegative');
         var totOre = varOreVenerdi + varOreExtraVenerdi + varOrePermessoVenerdi;
         var totMinuti = varMinutiVenerdi + varMinutiExtraVenerdi + varMinutiPermessoVenerdi;
         while(totMinuti > 59){
          totMinuti = totMinuti - 60;
          totOre++;
         }
				 if (totOre >= 8) {
					document.getElementById('tdOreVenerdi').classList.add('orePositive');
				  } else {
					document.getElementById('tdOreVenerdi').classList.add('oreNegative');
				  }			  
			  var tempoFormattato = totOre + ":" + (totMinuti < 10 ? "0" : "") + totMinuti;
			  document.getElementById('oreTotaliVenerdi').textContent = tempoFormattato;

        var pranzoFormattato = varOrePranzoVenerdi + ":" + (varMinutiPranzoVenerdi < 10 ? "0" : "") + varMinutiPranzoVenerdi;
			  document.getElementById('pausaVenerdi').textContent = pranzoFormattato;
        } else {
          document.getElementById('oreTotaliVenerdi').textContent = "Formato ora non valido";
        }
      }



      //Evento su Ore Venerdi
        document.getElementById('orevenerdi').addEventListener('input', function() {
            const elementiTimbratureVenerdi = document.querySelectorAll('.timbratureVenerdi');
            elementiTimbratureVenerdi.forEach(function(elemento) {
            elemento.value = '';
            });
            var oreString = this.value;
            if (oreString.length == 3) {
                varOreVenerdi = parseInt(oreString.substring(0, 1));
                varMinutiVenerdi = parseInt(oreString.substring(1, 3));
            } else if (oreString.length == 4) {
                varOreVenerdi = parseInt(oreString.substring(0, 2));
                varMinutiVenerdi = parseInt(oreString.substring(2, 4));
            } else {
                varOreVenerdi = 8;
                varMinutiVenerdi = 0;
                document.getElementById('oreTotaliVenerdi').textContent = "Formato ora non valido";
            }
            aggiornaTuttiOrari();       
		});

    //Evento su Ore Permesso Venerdi
    document.getElementById('orePermessovenerdi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOrePermessoVenerdi = parseInt(oreString.substring(0, 1));
          varMinutiPermessoVenerdi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
            varOrePermessoVenerdi = parseInt(oreString.substring(0, 2));
            varMinutiPermessoVenerdi = parseInt(oreString.substring(2, 4));
        } else {
          varOrePermessoVenerdi = 0;
          varMinutiPermessoVenerdi = 0;
      }
      aggiornaTuttiOrari(); 
	});

    //Evento su Ore Extra Venerdi
    document.getElementById('oreExtravenerdi').addEventListener('input', function() {
        var oreString = this.value;
        if (oreString.length == 3) {
          varOreExtraVenerdi = parseInt(oreString.substring(0, 1));
          varMinutiExtraVenerdi = parseInt(oreString.substring(1, 3));
        } else if (oreString.length == 4) {
          varOreExtraVenerdi = parseInt(oreString.substring(0, 2));
          varMinutiExtraVenerdi = parseInt(oreString.substring(2, 4));
        } else {
          varOreExtraVenerdi = 0;
          varMinutiExtraVenerdi = 0;
        }
      aggiornaTuttiOrari();   
		});

    //Evento su Entrate/Uscite del Venerdi
    function gestisciTimbratureVenerdi(event) {

        var entrataMattinavenerdiString = document.getElementById('entrataMattinavenerdi').value;
        var uscitaMattinavenerdiString = document.getElementById('uscitaMattinavenerdi').value;
        var entrataPomevenerdiString =  document.getElementById('entrataPomevenerdi').value;
        var uscitaPomevenerdiString = document.getElementById('uscitaPomevenerdi').value;

        if(entrataMattinavenerdiString.length < 3 || uscitaMattinavenerdiString.length  < 4 
              || entrataPomevenerdiString.length < 4 || uscitaPomevenerdiString.length < 4){
          varOreVenerdi = 8;
          varMinutiVenerdi = 0;
        } else {
          var entr1ore, entr2ore, entr1min, entr2min, usc1ore, usc2ore, usc1min, usc2min;

          if(entrataMattinavenerdiString.length == 3){
            entr1ore = parseInt(entrataMattinavenerdiString.substring(0, 1));
            entr1min = parseInt(entrataMattinavenerdiString.substring(1, 3));
          } else if (entrataMattinavenerdiString.length == 4){
            entr1ore = parseInt(entrataMattinavenerdiString.substring(0, 2));
            entr1min = parseInt(entrataMattinavenerdiString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliVenerdi').textContent = "Formato ora non valido";
          }

          if (uscitaMattinavenerdiString.length == 4){
            usc1ore = parseInt(uscitaMattinavenerdiString.substring(0, 2));
            usc1min = parseInt(uscitaMattinavenerdiString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliVenerdi').textContent = "Formato ora non valido";
          }

          if (entrataPomevenerdiString.length == 4){
            entr2ore = parseInt(entrataPomevenerdiString.substring(0, 2));
            entr2min = parseInt(entrataPomevenerdiString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliVenerdi').textContent = "Formato ora non valido";
          }

          if (uscitaPomevenerdiString.length == 4){
            usc2ore = parseInt(uscitaPomevenerdiString.substring(0, 2));
            usc2min = parseInt(uscitaPomevenerdiString.substring(2, 4));
          } else {
            document.getElementById('oreTotaliVenerdi').textContent = "Formato ora non valido";
          }
          const risultato = calcolaOre(entr1ore, entr1min, usc1ore, usc1min, entr2ore, entr2min, usc2ore, usc2min);
          
          varOreVenerdi = risultato.oreLavorate;
          varMinutiVenerdi = risultato.minutiLavorati;

          const pranzo = calcolaPranzo(usc1ore,usc1min,entr2ore,entr2min);
          varOrePranzoVenerdi = pranzo.ore;
          varMinutiPranzoVenerdi = pranzo.minuti;
          
        }
        aggiornaTuttiOrari();
      }
      
      const inputElementiVenerdi = document.querySelectorAll('.timbratureVenerdi');
      for (const inputElemento of inputElementiVenerdi) {
        inputElemento.addEventListener('input', gestisciTimbratureVenerdi);
      }