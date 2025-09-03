// Configurazione giorni
const GIORNI = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi'];

// Struttura dati centralizzata
const datiGiornalieri = {};

// Inizializzazione
GIORNI.forEach(giorno => {
    datiGiornalieri[giorno] = {
        ore: 8,
        minuti: 0,
        orePranzo: 0,
        minutiPranzo: 0,
        oreExtra: 0,
        minutiExtra: 0,
        orePermesso: 0,
        minutiPermesso: 0
    };
});

// Variabili globali per ore totali
let oreSettimanaliTotali = 40;
let minutiSettimanaliTotali = 0;

// ========== DARK MODE ==========

function updateLogo(theme) {
    const logo = document.querySelector('.col-sm img');
    if (logo) {
        if (theme === 'dark') {
            logo.src = './image/Logo-GF-dark.png';
        } else {
            logo.src = './image/Logo-GF.png';
        }
    }
}

function initializeDarkMode() {
    // Carica il tema salvato o usa il tema di sistema
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateLogo(currentTheme);
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateLogo(newTheme);
}

function setupLogoClickHandler() {
    const logo = document.querySelector('.col-sm img');
    if (logo) {
        logo.addEventListener('click', toggleDarkMode);
        // Aggiungi un tooltip per indicare la funzionalità
        logo.setAttribute('title', 'Clicca per attivare/disattivare la modalità scura');
    }
}

// ========== FUNZIONI UTILITY ==========

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseOraInput(oreString) {
    if (oreString.length === 3) {
        return {
            ore: parseInt(oreString.substring(0, 1)),
            minuti: parseInt(oreString.substring(1, 3))
        };
    } else if (oreString.length === 4) {
        return {
            ore: parseInt(oreString.substring(0, 2)),
            minuti: parseInt(oreString.substring(2, 4))
        };
    }
    return null;
}

function formatTempo(ore, minuti) {
    return ore + ":" + (minuti < 10 ? "0" : "") + minuti;
}

function validaDatiGiorno(dati) {
    return dati.ore >= 0 && dati.ore < 24 &&
        dati.minuti >= 0 && dati.minuti < 60 &&
        dati.oreExtra >= 0 && dati.oreExtra < 24 &&
        dati.minutiExtra >= 0 && dati.minutiExtra < 60 &&
        dati.orePermesso >= 0 && dati.orePermesso < 24 &&
        dati.minutiPermesso >= 0 && dati.minutiPermesso < 60;
}

function calcolaOre(entrata1Ore, entrata1Min, uscita1Ore, uscita1Min, entrata2Ore, entrata2Min, uscita2Ore, uscita2Min) {
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

    const tempoTrascorso1 = (
        (uscita1Ore * MILLISECONDS_PER_HOUR + uscita1Min * MILLISECONDS_PER_MINUTE) -
        (entrata1Ore * MILLISECONDS_PER_HOUR + entrata1Min * MILLISECONDS_PER_MINUTE)
    );

    const tempoTrascorso2 = (
        (uscita2Ore * MILLISECONDS_PER_HOUR + uscita2Min * MILLISECONDS_PER_MINUTE) -
        (entrata2Ore * MILLISECONDS_PER_HOUR + entrata2Min * MILLISECONDS_PER_MINUTE)
    );

    let tempoTotale = tempoTrascorso1 + tempoTrascorso2;

    const tempoPranzo = calcolaPranzoInMS(uscita1Ore, uscita1Min, entrata2Ore, entrata2Min);
    if (tempoPranzo < 30 * MILLISECONDS_PER_MINUTE) {
        tempoTotale -= 30 * MILLISECONDS_PER_MINUTE - tempoPranzo;
    }

    const oreTrascorse = Math.floor(tempoTotale / MILLISECONDS_PER_HOUR);
    const minutiTrascorsi = Math.floor((tempoTotale % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);

    return {
        oreLavorate: oreTrascorse,
        minutiLavorati: minutiTrascorsi
    };
}

function calcolaPranzoInMS(uscita1Ore, uscita1Min, entrata2Ore, entrata2Min) {
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

    return (
        (entrata2Ore * MILLISECONDS_PER_HOUR + entrata2Min * MILLISECONDS_PER_MINUTE) -
        (uscita1Ore * MILLISECONDS_PER_HOUR + uscita1Min * MILLISECONDS_PER_MINUTE)
    );
}

function calcolaPranzo(uscita1Ore, uscita1Min, entrata2Ore, entrata2Min) {
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

    let tempoPranzo = (
        (entrata2Ore * MILLISECONDS_PER_HOUR + entrata2Min * MILLISECONDS_PER_MINUTE) -
        (uscita1Ore * MILLISECONDS_PER_HOUR + uscita1Min * MILLISECONDS_PER_MINUTE)
    );

    if (tempoPranzo < 30 * MILLISECONDS_PER_MINUTE) {
        tempoPranzo = 30 * MILLISECONDS_PER_MINUTE;
    }

    const orePranzo = Math.floor(tempoPranzo / MILLISECONDS_PER_HOUR);
    const minutiPranzo = Math.floor((tempoPranzo % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);

    return {
        ore: orePranzo,
        minuti: minutiPranzo
    };
}

function calcolaDistanzaDaNOre(ore, minuti, n) {
    const minutiTotali = (ore * 60) + minuti;
    const differenzaMinuti = Math.abs(minutiTotali - (n * 60));

    const oreDifferenza = Math.floor(differenzaMinuti / 60);
    const minutiDifferenza = differenzaMinuti % 60;

    return {
        ore: oreDifferenza,
        minuti: minutiDifferenza
    };
}

// ========== FUNZIONI PRINCIPALI ==========

function aggiornaTuttiOrari() {
    GIORNI.forEach(aggiornaGiorno);
    aggiornaDelta();
    aggiornaOreTotali();
}

function aggiornaGiorno(giorno) {
    const dati = datiGiornalieri[giorno];
    const giornoCapitalized = capitalize(giorno);

    if (validaDatiGiorno(dati)) {
        const tdOre = document.getElementById(`tdOre${giornoCapitalized}`);
        tdOre.classList.remove('orePositive', 'oreNegative');

        let totOre = dati.ore + dati.oreExtra + dati.orePermesso;
        let totMinuti = dati.minuti + dati.minutiExtra + dati.minutiPermesso;

        while (totMinuti > 59) {
            totMinuti -= 60;
            totOre++;
        }

        if (totOre >= 8) {
            tdOre.classList.add('orePositive');
        } else {
            tdOre.classList.add('oreNegative');
        }

        const tempoFormattato = formatTempo(totOre, totMinuti);
        document.getElementById(`oreTotali${giornoCapitalized}`).textContent = tempoFormattato;

        const pranzoFormattato = formatTempo(dati.orePranzo, dati.minutiPranzo);
        document.getElementById(`pausa${giornoCapitalized}`).textContent = pranzoFormattato;
    } else {
        document.getElementById(`oreTotali${giornoCapitalized}`).textContent = "Formato ora non valido";
    }
}

function aggiornaDelta() {
    let deltaProgressivo = { ore: 0, minuti: 0 };

    GIORNI.forEach((giorno, index) => {
        const giornoCapitalized = capitalize(giorno);
        const oreGiornoString = document.getElementById(`oreTotali${giornoCapitalized}`).textContent;

        if (oreGiornoString !== "Formato ora non valido") {
            const [ore, minuti] = oreGiornoString.split(':').map(Number);

            deltaProgressivo.ore += ore;
            deltaProgressivo.minuti += minuti;

            while (deltaProgressivo.minuti > 59) {
                deltaProgressivo.minuti -= 60;
                deltaProgressivo.ore++;
            }

            const oreAttese = (index + 1) * 8;
            const tdDelta = document.getElementById(`tdDelta${giornoCapitalized}`);

            tdDelta.classList.remove('orePositive', 'oreNegative');
            if (deltaProgressivo.ore >= oreAttese) {
                tdDelta.classList.add('orePositive');
            } else {
                tdDelta.classList.add('oreNegative');
            }

            const distanza = calcolaDistanzaDaNOre(deltaProgressivo.ore, deltaProgressivo.minuti, oreAttese);
            const tempoFormattato = formatTempo(distanza.ore, distanza.minuti);
            document.getElementById(`delta${giornoCapitalized}`).textContent = tempoFormattato;
        }
    });
}

function aggiornaOreTotali() {
    oreSettimanaliTotali = 0;
    minutiSettimanaliTotali = 0;

    GIORNI.forEach(giorno => {
        const dati = datiGiornalieri[giorno];
        oreSettimanaliTotali += dati.ore + dati.oreExtra + dati.orePermesso;
        minutiSettimanaliTotali += dati.minuti + dati.minutiExtra + dati.minutiPermesso;
    });

    while (minutiSettimanaliTotali > 59) {
        minutiSettimanaliTotali -= 60;
        oreSettimanaliTotali++;
    }

    const tdOreTotali = document.getElementById('tdOreTotali');
    tdOreTotali.classList.remove('orePositive', 'oreNegative');

    if (oreSettimanaliTotali >= 40) {
        tdOreTotali.classList.add('orePositive');
    } else {
        tdOreTotali.classList.add('oreNegative');
    }

    const tempoFormattato = formatTempo(oreSettimanaliTotali, minutiSettimanaliTotali);
    document.getElementById('oreTotali').textContent = tempoFormattato;
}

// ========== GESTIONE INPUT ==========

function gestisciInputOre(giorno, valore) {
    const dati = parseOraInput(valore);
    if (dati) {
        datiGiornalieri[giorno].ore = dati.ore;
        datiGiornalieri[giorno].minuti = dati.minuti;
    } else {
        datiGiornalieri[giorno].ore = 8;
        datiGiornalieri[giorno].minuti = 0;
    }
    aggiornaTuttiOrari();
}

function gestisciInputOreExtra(giorno, valore) {
    const dati = parseOraInput(valore);
    if (dati) {
        datiGiornalieri[giorno].oreExtra = dati.ore;
        datiGiornalieri[giorno].minutiExtra = dati.minuti;
    } else {
        datiGiornalieri[giorno].oreExtra = 0;
        datiGiornalieri[giorno].minutiExtra = 0;
    }
    aggiornaTuttiOrari();
}

function gestisciInputOrePermesso(giorno, valore) {
    const dati = parseOraInput(valore);
    if (dati) {
        datiGiornalieri[giorno].orePermesso = dati.ore;
        datiGiornalieri[giorno].minutiPermesso = dati.minuti;
    } else {
        datiGiornalieri[giorno].orePermesso = 0;
        datiGiornalieri[giorno].minutiPermesso = 0;
    }
    aggiornaTuttiOrari();
}

function pulisciTimbrature(giorno) {
    const giornoCapitalized = capitalize(giorno);
    const elementiTimbrature = document.querySelectorAll(`.timbrature${giornoCapitalized}`);
    elementiTimbrature.forEach(elemento => elemento.value = '');
}

function parseTimbratura(timeString) {
    if (timeString.length === 3) {
        return {
            ore: parseInt(timeString.substring(0, 1)),
            min: parseInt(timeString.substring(1, 3))
        };
    } else if (timeString.length === 4) {
        return {
            ore: parseInt(timeString.substring(0, 2)),
            min: parseInt(timeString.substring(2, 4))
        };
    }
    return null;
}

function gestisciTimbrature(giorno) {
    const entrataMattina = document.getElementById(`entrataMattina${giorno}`).value;
    const uscitaMattina = document.getElementById(`uscitaMattina${giorno}`).value;
    const entrataPome = document.getElementById(`entrataPome${giorno}`).value;
    const uscitaPome = document.getElementById(`uscitaPome${giorno}`).value;

    if (entrataMattina.length < 3 || uscitaMattina.length < 4 ||
        entrataPome.length < 4 || uscitaPome.length < 4) {
        datiGiornalieri[giorno].ore = 8;
        datiGiornalieri[giorno].minuti = 0;
        datiGiornalieri[giorno].orePranzo = 0;
        datiGiornalieri[giorno].minutiPranzo = 0;
    } else {
        const entr1 = parseTimbratura(entrataMattina);
        const usc1 = parseTimbratura(uscitaMattina);
        const entr2 = parseTimbratura(entrataPome);
        const usc2 = parseTimbratura(uscitaPome);

        if (entr1 && usc1 && entr2 && usc2) {
            const risultato = calcolaOre(
                entr1.ore, entr1.min, usc1.ore, usc1.min,
                entr2.ore, entr2.min, usc2.ore, usc2.min
            );

            datiGiornalieri[giorno].ore = risultato.oreLavorate;
            datiGiornalieri[giorno].minuti = risultato.minutiLavorati;

            const pranzo = calcolaPranzo(usc1.ore, usc1.min, entr2.ore, entr2.min);
            datiGiornalieri[giorno].orePranzo = pranzo.ore;
            datiGiornalieri[giorno].minutiPranzo = pranzo.minuti;
        }
    }
    aggiornaTuttiOrari();
}

// ========== INIZIALIZZAZIONE EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', function() {
    // Inizializza la dark mode
    initializeDarkMode();
    setupLogoClickHandler();

    GIORNI.forEach(giorno => {
        const giornoCapitalized = capitalize(giorno);

        // Event listener per ore lavorate
        document.getElementById(`ore${giorno}`).addEventListener('input', function() {
            pulisciTimbrature(giorno);
            gestisciInputOre(giorno, this.value);
        });

        // Event listener per ore extra
        document.getElementById(`oreExtra${giorno}`).addEventListener('input', function() {
            gestisciInputOreExtra(giorno, this.value);
        });

        // Event listener per ore permesso
        document.getElementById(`orePermesso${giorno}`).addEventListener('input', function() {
            gestisciInputOrePermesso(giorno, this.value);
        });

        // Event listener per timbrature
        const elementiTimbrature = document.querySelectorAll(`.timbrature${giornoCapitalized}`);
        elementiTimbrature.forEach(elemento => {
            elemento.addEventListener('input', () => gestisciTimbrature(giorno));
        });
    });

    // Aggiorna tutto all'inizio
    aggiornaTuttiOrari();
});